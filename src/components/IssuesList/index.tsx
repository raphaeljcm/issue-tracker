import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { Issue } from '../../@types/types';
import { IssueItem } from '../IssueItem';
import * as S from './styles';

interface IssuesListProps {
  labels: string[];
}

async function getIssues({ queryKey }: QueryFunctionContext): Promise<Issue[]> {
  const issuesObj = queryKey[1] as IssuesListProps;
  const labelsString = issuesObj.labels
    .map(label => `labels[]=${label}`)
    .join('&');

  const response = await fetch(`/api/issues?${labelsString}`);
  const data = await response.json();
  return data;
}

export function IssuesList({ labels }: IssuesListProps) {
  const issuesQuery = useQuery(['issues', { labels }], getIssues);

  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading Issues...</p>
      ) : issuesQuery.isError && issuesQuery.error instanceof Error ? (
        <p>{issuesQuery.error.message}</p>
      ) : (
        <S.IssuesListContainer>
          {issuesQuery.data?.map(issue => (
            <IssueItem
              key={issue.id}
              title={issue.title}
              number={issue.number}
              assignee={issue.assignee}
              commentCount={issue.comments.length}
              createdBy={issue.createdBy}
              createdDate={issue.createdDate}
              labels={issue.labels}
              status={issue.status}
            />
          ))}
        </S.IssuesListContainer>
      )}
    </div>
  );
}
