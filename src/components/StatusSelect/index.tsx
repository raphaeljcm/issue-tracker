import { ChangeEvent } from 'react';

import { possibleStatus } from '../../helpers/defaultData';
import * as S from './styles';

interface StatusSelectProps {
  value: string;
  noEmptyOption?: boolean;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export function StatusSelect({
  value,
  noEmptyOption = false,
  onChange,
}: StatusSelectProps) {
  return (
    <S.StyledStatusSelect value={value} onChange={onChange}>
      {noEmptyOption ? null : (
        <option value="">Select a status to filter</option>
      )}
      {possibleStatus.map(status => (
        <option key={status.id} value={status.id}>
          {status.label}
        </option>
      ))}
    </S.StyledStatusSelect>
  );
}
