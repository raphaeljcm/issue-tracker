import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Issue } from '../../@types/types';
import { fetchWithErrors } from '../../utils/fetchWithErrors';

interface UpdateLabelsProps {
  labels: string[];
  number: string;
}

function updateLabels({ labels, number }: UpdateLabelsProps) {
  const aborter = new AbortController();
  const signal = aborter.signal;

  const data = fetchWithErrors<Issue>(`/api/issues/${number}`, {
    signal,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ labels }),
  });

  return data;
}

export function useIssueLabels({ issueNumber }: { issueNumber: string }) {
  const queryClient = useQueryClient();

  return useMutation(updateLabels, {
    onMutate: ({ labels }) => {
      const oldLabels = queryClient.getQueryData<Issue>([
        'issues',
        issueNumber,
      ])?.labels;

      queryClient.setQueryData<Issue>(
        ['issues', issueNumber],
        oldStatusObj =>
          oldStatusObj && {
            ...oldStatusObj,
            labels,
          },
      );

      // rollback
      return () => {
        queryClient.setQueryData<Issue>(
          ['issues', issueNumber],
          data =>
            data && {
              ...data,
              labels: oldLabels!,
            },
        );
      };
    },
    onError: (error, variables, rollback) => {
      !!rollback && rollback();
    },
    onSettled: () => {
      queryClient.invalidateQueries(['issues', issueNumber], { exact: true });
    },
  });
}
