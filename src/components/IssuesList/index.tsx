import {
  QueryClient,
  QueryFunctionContext,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { FormEvent, useState } from 'react';

import { Issue, Status } from '../../@types/types';
import { fetchWithErrors } from '../../utils/fetchWithErrors';
import { Button } from '../Button';
import { IssueItem } from '../IssueItem';
import { Loader } from '../Loader';
import * as S from './styles';

interface IssuesListProps {
  labels: string[];
  status: '' | Status;
  currentPage: number;
  onChangeCurrentPage: (increaseOrDecreaseOne: 'increase' | 'decrease') => void;
}

interface SearchQueryResponse {
  count: number;
  items: Issue[];
}

async function getIssues(
  queryClient: QueryClient,
  filterObj: { labels: string[]; status: string; currentPage: number },
): Promise<Issue[]> {
  const controller = new AbortController();
  const signal = controller.signal;
  const { labels, status, currentPage } = filterObj;

  const labelsString = labels.map(label => `labels[]=${label}`).join('&');
  const statusString = status ? `&status=${status}` : '';
  const paginationString = currentPage ? `&page=${currentPage}` : '';

  const result = await fetchWithErrors<Issue[]>(
    `/api/issues?${labelsString}${statusString}${paginationString}`,
    {
      signal,
    },
  );

  // prefetching issue data that is used on IssueDetails component
  result.forEach(issue => {
    queryClient.setQueryData(['issues', String(issue.number)], issue);
  });

  return result;
}

function getSearchedIssues({
  queryKey,
  signal,
}: QueryFunctionContext): Promise<SearchQueryResponse> {
  const searchValue = queryKey[2];
  return fetchWithErrors(`/api/search/issues?q=${searchValue}`, { signal });
}

export function IssuesList({
  labels,
  status,
  currentPage,
  onChangeCurrentPage,
}: IssuesListProps) {
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState('');

  const issuesQuery = useQuery(
    ['issues', { labels, status, currentPage }],
    () => getIssues(queryClient, { labels, status, currentPage }),
    {
      keepPreviousData: true,
    },
  );

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
      <h2>Issues List {issuesQuery.isFetching && <Loader />}</h2>
      {issuesQuery.isLoading ? (
        <p>Loading Issues...</p>
      ) : issuesQuery.isError && issuesQuery.error instanceof Error ? (
        <p>{issuesQuery.error.message}</p>
      ) : searchQuery.fetchStatus === 'idle' && searchQuery.isLoading ? (
        <>
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

          <S.PaginationContainer>
            <Button
              type="button"
              onClick={() => onChangeCurrentPage('decrease')}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <p>
              Page {currentPage} {issuesQuery.isFetching && '...'}
            </p>
            <Button
              type="button"
              onClick={() => onChangeCurrentPage('increase')}
              disabled={
                !issuesQuery.data ||
                issuesQuery.data.length === 0 ||
                issuesQuery.isPreviousData
              }
            >
              Next
            </Button>
          </S.PaginationContainer>
        </>
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
