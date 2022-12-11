import { GoComment, GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { Link } from 'react-router-dom';

import { relativeDate } from '../../helpers/relativeData';
import { useUserData } from '../../hooks/useUserData';
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
  status: string;
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

  return (
    <li>
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
