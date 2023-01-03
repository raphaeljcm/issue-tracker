import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { GoGear } from 'react-icons/go';

import { User } from '../../@types/types';
import { useUserData } from '../../hooks/useUserData';
import { fetchWithErrors } from '../../utils/fetchWithErrors';
import * as S from './styles';
import { useIssueAssignment } from './useIssueAssignment';

interface IssueAssignmentProps {
  assignee: string | null;
  issueNumber: string;
}

function getUsers({ signal }: QueryFunctionContext) {
  const data = fetchWithErrors<User[]>('/api/users', { signal });

  return data;
}

export function IssueAssignment({
  assignee,
  issueNumber,
}: IssueAssignmentProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useUserData(assignee);
  const usersQuery = useQuery(['users'], getUsers);
  const setAssignmentMutation = useIssueAssignment({ issueNumber });

  return (
    <S.IssueAssignmentContainer>
      <div>
        <span>Assignment</span>
        {user.isSuccess && (
          <div>
            <img src={user.data?.profilePictureUrl} alt="user profile" />
            {user.data?.name}
          </div>
        )}
      </div>

      <GoGear
        onClick={() =>
          !usersQuery.isLoading && setMenuOpen(oldState => !oldState)
        }
      />

      {menuOpen && (
        <S.PickerMenu role="menu" tabIndex={-1}>
          {usersQuery.data?.map(user => (
            <li
              key={user.id}
              role="menuitem"
              tabIndex={-1}
              onClick={() =>
                setAssignmentMutation.mutate({
                  assignee: user.id,
                  number: issueNumber,
                })
              }
              onKeyDown={() =>
                setAssignmentMutation.mutate({
                  assignee: user.id,
                  number: issueNumber,
                })
              }
            >
              <img src={user.profilePictureUrl} alt="user profile" />
              {user.name}
            </li>
          ))}
        </S.PickerMenu>
      )}
    </S.IssueAssignmentContainer>
  );
}
