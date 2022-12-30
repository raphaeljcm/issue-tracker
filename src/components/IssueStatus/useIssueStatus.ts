import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Issue, Status } from '../../@types/types';
import { fetchWithErrors } from '../../utils/fetchWithErrors';

interface UpdateStatusProps {
  status: string;
  number: string;
}

function updateStatus({ status, number }: UpdateStatusProps) {
  const aborter = new AbortController();
  const signal = aborter.signal;

  const data = fetchWithErrors(`/api/issues/${number}`, {
    signal,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  return data;
}

export function useIssueStatus({ issueNumber }: { issueNumber: string }) {
  const queryClient = useQueryClient();

  return useMutation(updateStatus, {
    onMutate: ({ status }) => {
      const newStatus = status as unknown as Status;
      const oldStatus = queryClient.getQueryData<Issue>([
        'issues',
        issueNumber,
      ])?.status;

      queryClient.setQueryData<Issue>(
        ['issues', issueNumber],
        oldStatusObj =>
          oldStatusObj && {
            ...oldStatusObj,
            status: newStatus,
          },
      );

      // rollback
      return () => {
        queryClient.setQueryData<Issue>(
          ['issues', issueNumber],
          data =>
            data && {
              ...data,
              status: oldStatus!,
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
