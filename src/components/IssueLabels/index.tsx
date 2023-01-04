import { useState } from 'react';
import { GoGear } from 'react-icons/go';

import { useLabelsData } from '../../hooks/useLabelsData';
import * as S from './styles';
import { useIssueLabels } from './useIssueLabels';

interface IssueLabelsProps {
  labels: string[];
  issueNumber: string;
}

export function IssueLabels({ labels, issueNumber }: IssueLabelsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const labelsQuery = useLabelsData();
  const labelsMutation = useIssueLabels({ issueNumber });

  function handleUpdateLabels(labelId: string) {
    const isLabelIncludes = labels.includes(labelId);
    let newLabels;

    if (isLabelIncludes) {
      newLabels = labels.filter(currentLabel => currentLabel !== labelId);
    } else {
      newLabels = [...labels, labelId];
    }

    labelsMutation.mutate({ labels: newLabels, number: issueNumber });
  }

  return (
    <S.IssueOption>
      <div>
        <span>Labels</span>
        {labelsQuery.isLoading
          ? null
          : labels.map(label => {
              const labelObj = labelsQuery.data?.find(
                queryLabel => queryLabel.id === label,
              );

              return (
                <span key={label} className={`label ${labelObj?.color}`}>
                  {labelObj?.name}
                </span>
              );
            })}
      </div>
      <GoGear
        onClick={() => !labelsQuery.isLoading && setMenuOpen(open => !open)}
      />

      {menuOpen && (
        <S.PickerMenu>
          {labelsQuery.data?.map(label => {
            const selected = labels.includes(label.id);

            return (
              <S.LabelLi
                key={label.id}
                isSelected={selected}
                onClick={() => handleUpdateLabels(label.id)}
              >
                <S.CircleSpan circleColor={label.color} />
                {label.name}
              </S.LabelLi>
            );
          })}
        </S.PickerMenu>
      )}
    </S.IssueOption>
  );
}
