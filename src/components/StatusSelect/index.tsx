import { ChangeEvent } from 'react';

import * as S from './styles';

interface StatusSelectProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const possibleStatus = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'todo', label: 'To-do' },
  { id: 'inProgress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
  { id: 'cancelled', label: 'Cancelled' },
];

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <S.StyledStatusSelect value={value} onChange={onChange}>
      <option value="">Select a status to filter</option>
      {possibleStatus.map(status => (
        <option key={status.id} value={status.id}>
          {status.label}
        </option>
      ))}
    </S.StyledStatusSelect>
  );
}
