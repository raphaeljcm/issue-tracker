import { ChangeEvent, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { Status } from '../../@types/types';
import { Button } from '../../components/Button';
import { IssuesList } from '../../components/IssuesList';
import { LabelList } from '../../components/LabelList';
import { StatusSelect } from '../../components/StatusSelect';
import * as S from './styles';

type StatusState = '' | Status;

export function Issues() {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('' as StatusState);
  const [currentPage, setCurrentPage] = useState(1);

  function handleChangeStatus(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedStatus(event.target.value as StatusState);
    setCurrentPage(1);
  }

  const handleToggleSelectedLabel = useCallback((labelId: string) => {
    setSelectedLabels(prevLabels =>
      prevLabels.includes(labelId)
        ? prevLabels.filter(currentLabel => currentLabel !== labelId)
        : prevLabels.concat(labelId),
    );
    setCurrentPage(1);
  }, []);

  const handleChangeCurrentPage = useCallback(
    (increaseOrDecreaseOne: 'increase' | 'decrease') => {
      setCurrentPage(oldPage =>
        increaseOrDecreaseOne === 'increase' ? oldPage + 1 : oldPage - 1,
      );
    },
    [],
  );

  return (
    <div>
      <S.MainContainer>
        <S.SectionContainer>
          <IssuesList
            labels={selectedLabels}
            status={selectedStatus}
            currentPage={currentPage}
            onChangeCurrentPage={handleChangeCurrentPage}
          />
        </S.SectionContainer>
        <S.AsideContainer>
          <LabelList
            selected={selectedLabels}
            onToggle={handleToggleSelectedLabel}
          />
          <h3>Status</h3>
          <StatusSelect
            value={selectedStatus}
            onChange={event => handleChangeStatus(event)}
          />
          <hr />
          <Button>
            <Link to="/add">Add Issue</Link>
          </Button>
        </S.AsideContainer>
      </S.MainContainer>
    </div>
  );
}
