import { useQueryClient } from '@tanstack/react-query';
import { GoComment, GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { Link } from 'react-router-dom';

import { relativeDate } from '../../helpers/relativeData';
import { useUserData } from '../../hooks/useUserData';
import { fetchWithErrors } from '../../utils/fetchWithErrors';
import { Label } from '../Label/index';
import * as S from './styles';

type IssueItemProps = {
  title: string;
  number: number;
  assignee: string | null;
  commentCount: number;
  createdBy: string;
  createdDate: Date;
  labels: string[];
  status: 'backlog' | 'todo' | 'inProgress' | 'done' | 'cancelled';
};

export function IssueItem({
  title,
  number,
  assignee,
  commentCount,
  createdBy,
  createdDate,
  labels,
  status,
}: IssueItemProps) {
  const assigneeUser = useUserData(assignee);
  const createdByUser = useUserData(createdBy);
  const queryClient = useQueryClient();

  function handlePrefetchingIssue() {
    queryClient.prefetchQuery(['issues', String(number)], () =>
      fetchWithErrors(`/api/issues/${number} `),
    );
    queryClient.prefetchQuery(['issues', String(number), 'comments'], () =>
      fetchWithErrors(`/api/issues/${number}/comments `),
    );
  }

  return (
    <li onMouseEnter={handlePrefetchingIssue}>
      <div>
        {status === 'done' || status === 'cancelled' ? (
          <GoIssueClosed style={{ color: 'red' }} />
        ) : (
          <GoIssueOpened style={{ color: 'green' }} />
        )}
      </div>
      <S.IssueContent>
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map(label => (
            <Label key={label} label={label} />
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)}{' '}
          {createdByUser.isSuccess
            ? `by ${createdByUser.data?.name}`
            : 'Loading user...'}
        </small>
      </S.IssueContent>
      {assignee && (
        <S.AssignedTo
          src={
            assigneeUser.isSuccess ? assigneeUser.data?.profilePictureUrl : ''
          }
          alt="assignee avatar"
        />
      )}
      <S.CommentCount>
        {commentCount > 0 && (
          <>
            <GoComment />
            {commentCount}
          </>
        )}
      </S.CommentCount>
    </li>
  );
}
