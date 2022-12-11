import { GoIssueClosed, GoIssueOpened } from 'react-icons/go';

import { Issue } from '../../@types/types';
import { possibleStatus } from '../../helpers/defaultData';
import { relativeDate } from '../../helpers/relativeData';
import { useUserData } from '../../hooks/useUserData';
import * as S from './styles';

export function IssueHeader({
  title,
  number,
  status = 'todo',
  createdBy,
  createdDate,
  comments,
}: Issue) {
  const statusObj = possibleStatus.find(psStatus => psStatus.id === status);
  const createdUser = useUserData(createdBy);

  return (
    <S.IssueHeaderContainer>
      <h2>
        {title} <span>#{number}</span>
      </h2>
      <div>
        <S.StatusSpan
          status={
            status === 'done' || status === 'cancelled' ? 'closed' : 'open'
          }
        >
          {status === 'done' || status === 'cancelled' ? (
            <GoIssueClosed />
          ) : (
            <GoIssueOpened />
          )}
          {statusObj?.label}
        </S.StatusSpan>
        <span>{createdUser.isLoading ? '...' : createdUser.data?.name}</span>{' '}
        opened this issue {relativeDate(createdDate)} · {comments.length}{' '}
        comments
      </div>
    </S.IssueHeaderContainer>
  );
}
