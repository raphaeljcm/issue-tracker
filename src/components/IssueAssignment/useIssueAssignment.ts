import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Issue } from '../../@types/types';
import { fetchWithErrors } from '../../utils/fetchWithErrors';

interface UpdateAssigneeProps {
  assignee: string | null;
  number: string;
}

function updateAssignee({ assignee, number }: UpdateAssigneeProps) {
  const aborter = new AbortController();
  const signal = aborter.signal;

  const data = fetchWithErrors<Issue>(`/api/issues/${number}`, {
    signal,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assignee }),
  });

  return data;
}

export function useIssueAssignment({ issueNumber }: { issueNumber: string }) {
  const queryClient = useQueryClient();

  return useMutation(updateAssignee, {
    onMutate: ({ assignee }) => {
      const oldAssignee = queryClient.getQueryData<Issue>([
        'issues',
        issueNumber,
      ])?.assignee;

      queryClient.setQueryData<Issue>(
        ['issues', issueNumber],
        oldStatusObj =>
          oldStatusObj && {
            ...oldStatusObj,
            assignee,
          },
      );

      // rollback
      return () => {
        queryClient.setQueryData<Issue>(
          ['issues', issueNumber],
          data =>
            data && {
              ...data,
              assignee: oldAssignee!,
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
