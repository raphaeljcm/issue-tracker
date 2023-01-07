import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Issue, IssueComment } from '../../@types/types';
import { useScrollToBottom } from '../../hooks/useScrollToBottom';
import { fetchWithErrors } from '../../utils/fetchWithErrors';
import { Comment } from '../Comment';
import { IssueAssignment } from '../IssueAssignment';
import { IssueHeader } from '../IssueHeader';
import { IssueLabels } from '../IssueLabels';
import { IssueStatus } from '../IssueStatus';
import { Loader } from '../Loader';
import * as S from './styles';

function getIssue({ queryKey, signal }: QueryFunctionContext): Promise<Issue> {
  const issueNumber = queryKey[1];

  return fetchWithErrors(`/api/issues/${issueNumber}`, { signal });
}

function getIssueComments({
  queryKey,
  pageParam = 1,
  signal,
}: QueryFunctionContext): Promise<IssueComment[]> {
  const issueNumber = queryKey[1];

  return fetchWithErrors(
    `/api/issues/${issueNumber}/comments?page=${pageParam}`,
    { signal },
  );
}

export function IssueDetails() {
  const { number } = useParams();
  const issueQuery = useQuery(['issues', number], getIssue);
  const infiniteCommentQuery = useInfiniteQuery(
    ['issues', number, 'comments'],
    getIssueComments,
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) return;
        return allPages.length + 1;
      },
    },
  );

  useScrollToBottom(document, infiniteCommentQuery.fetchNextPage, 100);

  return (
    <S.IssueDetailsContainer>
      {issueQuery.isError && issueQuery.error instanceof Error && (
        <p>{issueQuery.error.message}</p>
      )}
      {issueQuery.isLoading ? (
        <p>Loading issue...</p>
      ) : (
        <>
          <IssueHeader {...issueQuery.data!} />
          <main>
            <section>
              {infiniteCommentQuery.isLoading ? (
                <p>Loading comments...</p>
              ) : (
                infiniteCommentQuery.data?.pages?.map(commentPage =>
                  commentPage.map(comment => (
                    <Comment key={comment.id} {...comment} />
                  )),
                )
              )}
              {infiniteCommentQuery.isFetchingNextPage && <Loader />}
            </section>
            <aside>
              {!!issueQuery.data && (
                <>
                  <IssueStatus
                    status={issueQuery.data.status}
                    issueNumber={issueQuery.data.number.toString()}
                  />
                  <IssueAssignment
                    assignee={issueQuery.data.assignee}
                    issueNumber={issueQuery.data.number.toString()}
                  />
                  <IssueLabels
                    labels={issueQuery.data.labels}
                    issueNumber={issueQuery.data.number.toString()}
                  />
                </>
              )}
            </aside>
          </main>
        </>
      )}
    </S.IssueDetailsContainer>
  );
}
