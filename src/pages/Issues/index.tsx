import { useCallback, useState } from 'react';

import { IssuesList } from '../../components/IssuesList';
import { LabelList } from '../../components/LabelList';
import * as S from './styles';

export function Issues() {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

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
          <h1>Issues</h1>
          <IssuesList labels={selectedLabels} />
        </S.SectionContainer>
        <S.AsideContainer>
          <LabelList
            selected={selectedLabels}
            onToggle={handleToggleSelectedLabel}
          />
        </S.AsideContainer>
      </S.MainContainer>
    </div>
  );
}
