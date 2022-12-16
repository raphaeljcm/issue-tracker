import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';

import { Issue } from '../../@types/types';
import { fetchWithErrors } from '../../utils/fetchWithErrors';
import { IssueItem } from '../IssueItem';
import * as S from './styles';

interface IssuesListProps {
  labels: string[];
  status: string;
}

interface SearchQueryResponse {
  count: number;
  items: Issue[];
}

function getIssues({ queryKey }: QueryFunctionContext): Promise<Issue[]> {
  const { labels, status } = queryKey[1] as IssuesListProps;

  const labelsString = labels.map(label => `labels[]=${label}`).join('&');
  const statusString = status ? `&status=${status}` : '';

  return fetchWithErrors(`/api/issues?${labelsString}${statusString}`);
}

function getSearchedIssues({
  queryKey,
}: QueryFunctionContext): Promise<SearchQueryResponse> {
  const searchValue = queryKey[2];
  return fetchWithErrors(`/api/search/issues?q=${searchValue}`);
}

export function IssuesList({ labels, status }: IssuesListProps) {
  const [searchValue, setSearchValue] = useState('');
  const issuesQuery = useQuery(['issues', { labels, status }], getIssues);

  const searchQuery = useQuery(
    ['issues', 'search', searchValue],
    getSearchedIssues,
    {
      enabled: !!searchValue,
    },
  );

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const search = target.elements.namedItem('search') as HTMLInputElement;
    setSearchValue(search.value);
  }

  return (
    <div>
      <S.SearchFormContainer onSubmit={handleFormSubmit}>
        <label htmlFor="search">Search Issues</label>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          onChange={event =>
            event.target.value.length === 0 && setSearchValue('')
          }
        />
      </S.SearchFormContainer>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading Issues...</p>
      ) : issuesQuery.isError && issuesQuery.error instanceof Error ? (
        <p>{issuesQuery.error.message}</p>
      ) : searchQuery.fetchStatus === 'idle' && searchQuery.isLoading ? (
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
      ) : (
        <>
          <h2>Search Results</h2>
          {searchQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>{searchQuery.data?.count} results</p>
              <S.IssuesListContainer>
                {searchQuery.data?.items.map(issue => (
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
            </>
          )}
        </>
      )}
    </div>
  );
}
