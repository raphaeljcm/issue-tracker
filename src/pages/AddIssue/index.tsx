import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Issue } from '../../@types/types';
import { Button } from '../../components/Button';
import { fetchWithErrors } from '../../utils/fetchWithErrors';
import * as S from './styles';

type AddIssue = {
  title: string;
  comment: string;
};

function addNewIssue(issueObj: AddIssue) {
  const abortController = new AbortController();
  const signal = abortController.signal;

  const data = fetchWithErrors<Issue>('/api/issues', {
    signal,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(issueObj),
  });

  return data;
}

export function AddIssue() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addIssueMutation = useMutation(addNewIssue, {
    onSuccess: data => {
      queryClient.setQueryData(['issues', data.number.toString()], data);
      // I won't need to invalidate any queries in this case
      // 'cause issues query is not even mounted, so it's innactive

      navigate(`/issue/${data.number}`);
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (addIssueMutation.isLoading) return;

    const target = event.target as HTMLFormElement;
    const title = target.elements.namedItem('title') as HTMLInputElement;
    const comment = target.elements.namedItem('comment') as HTMLTextAreaElement;

    addIssueMutation.mutate({
      title: title.value,
      comment: comment.value,
    });
  }

  return (
    <S.AddIssueContainer>
      <h2>Add Issue</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" placeholder="Title" />
        <label htmlFor="comment">Comment</label>
        <textarea id="comment" name="comment" placeholder="Comment"></textarea>
        <Button type="submit" disabled={addIssueMutation.isLoading}>
          {addIssueMutation.isLoading ? 'Adding issue...' : 'Add Issue'}
        </Button>
        {addIssueMutation.isError &&
          addIssueMutation.error instanceof Error && (
            <p>{addIssueMutation.error.message}</p>
          )}
      </form>
    </S.AddIssueContainer>
  );
}
