import { QueryFunctionContext, useQueries } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { IssueComment } from '../../@types/types';
import { fetchWithErrors } from '../../utils/fetchWithErrors';
import { Comment } from '../Comment';
import { IssueHeader } from '../IssueHeader';
import * as S from './styles';

function getIssue({ queryKey }: QueryFunctionContext) {
  const issueNumber = queryKey[1];

  return fetchWithErrors(`/api/issues/${issueNumber}`);
}

function getIssueComments({
  queryKey,
}: QueryFunctionContext): Promise<IssueComment[]> {
  const issueNumber = queryKey[1];

  return fetchWithErrors(`/api/issues/${issueNumber}/comments`);
}

export function IssueDetails() {
  const { number } = useParams();
  const [issueQuery, issueCommentsQuery] = useQueries({
    queries: [
      { queryKey: ['issues', number], queryFn: getIssue },
      { queryKey: ['issues', number, 'comments'], queryFn: getIssueComments },
    ],
  });

  return (
    <S.IssueDetailsContainer>
      {issueQuery.isLoading ? (
        <p>Loading issue...</p>
      ) : (
        <>
          <IssueHeader {...issueQuery.data} />
          <main>
            <section>
              {issueCommentsQuery.isLoading ? (
                <p>Loading comments...</p>
              ) : (
                issueCommentsQuery.data?.map(comment => (
                  <Comment key={comment.id} {...comment} />
                ))
              )}
            </section>
            <aside></aside>
          </main>
        </>
      )}
    </S.IssueDetailsContainer>
  );
}
