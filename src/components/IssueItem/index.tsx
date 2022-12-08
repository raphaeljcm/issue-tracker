import { GoComment, GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { Link } from 'react-router-dom';

import { relativeDate } from '../../helpers/relativeData';
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
            <span key={label} className="red">
              {label}
            </span>
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)} by {createdBy}
        </small>
      </S.IssueContent>
      {assignee && <S.AssignedTo>{assignee}</S.AssignedTo>}
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
