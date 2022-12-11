import { IssueComment } from '../../@types/types';
import { relativeDate } from '../../helpers/relativeData';
import { useUserData } from '../../hooks/useUserData';
import * as S from './styles';

export function Comment({ comment, createdBy, createdDate }: IssueComment) {
  const userQuery = useUserData(createdBy);

  if (userQuery.isLoading)
    return (
      <S.CommentContainer>
        <div>
          <S.CommentHeader>Loading...</S.CommentHeader>
        </div>
      </S.CommentContainer>
    );

  return (
    <S.CommentContainer>
      <img src={userQuery.data?.profilePictureUrl} alt="Commenter Avatar" />
      <div>
        <S.CommentHeader>
          <span>{userQuery.data?.name}</span> commented{' '}
          <span>{relativeDate(createdDate)}</span>
        </S.CommentHeader>
        <S.CommentBody>{comment}</S.CommentBody>
      </div>
    </S.CommentContainer>
  );
}
