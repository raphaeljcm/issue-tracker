import { StatusSelect } from '../StatusSelect';
import * as S from './styles';
import { useIssueStatus } from './useIssueStatus';

interface IssueStatusProps {
  status: 'backlog' | 'todo' | 'inProgress' | 'done' | 'cancelled';
  issueNumber: string;
}

export function IssueStatus({ status, issueNumber }: IssueStatusProps) {
  const setStatusMutation = useIssueStatus({ issueNumber });

  return (
    <S.IssueStatusContainer>
      <div>
        <span>Status</span>
        <StatusSelect
          value={status as unknown as string}
          onChange={event =>
            setStatusMutation.mutate({
              status: event.target.value,
              number: issueNumber,
            })
          }
          noEmptyOption
        />
      </div>
    </S.IssueStatusContainer>
  );
}
