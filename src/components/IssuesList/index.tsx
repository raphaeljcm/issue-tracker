import { useQuery } from '@tanstack/react-query';

import { Issue } from '../../@types/types';
import { IssueItem } from '../IssueItem';
import * as S from './styles';

async function getIssues(): Promise<Issue[]> {
  const response = await fetch('/api/issues');
  const data = await response.json();
  return data;
}

export function IssuesList() {
  const issuesQuery = useQuery(['issues'], getIssues);

  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
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
