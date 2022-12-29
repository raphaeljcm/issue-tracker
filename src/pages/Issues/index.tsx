import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../components/Button';
import { IssuesList } from '../../components/IssuesList';
import { LabelList } from '../../components/LabelList';
import { StatusSelect } from '../../components/StatusSelect';
import * as S from './styles';

export function Issues() {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleToggleSelectedLabel = useCallback((labelId: string) => {
    setSelectedLabels(prevLabels =>
      prevLabels.includes(labelId)
        ? prevLabels.filter(currentLabel => currentLabel !== labelId)
        : prevLabels.concat(labelId),
    );
  }, []);

  return (
    <div>
      <S.MainContainer>
        <S.SectionContainer>
          <IssuesList labels={selectedLabels} status={selectedStatus} />
        </S.SectionContainer>
        <S.AsideContainer>
          <LabelList
            selected={selectedLabels}
            onToggle={handleToggleSelectedLabel}
          />
          <h3>Status</h3>
          <StatusSelect
            value={selectedStatus}
            onChange={event => setSelectedStatus(event.target.value)}
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
