import { useLabelsData } from '../../hooks/useLabelsData';
import { Button } from '../Button';
import * as S from './styles';

interface LabelListProps {
  selected: string[];
  onToggle: (labelId: string) => void;
}

export function LabelList({ selected, onToggle }: LabelListProps) {
  const labelsQuery = useLabelsData();

  return (
    <div>
      <h3>Labels</h3>
      {labelsQuery.isLoading ? (
        <p>Loading labels...</p>
      ) : (
        <S.LabelsContainer>
          {labelsQuery.data?.map(label => (
            <li key={label.id}>
              <Button
                className={`${selected.includes(label.id) ? 'selected' : ''} ${
                  label.color
                }`}
                onClick={() => onToggle(label.id)}
              >
                {label.name}
              </Button>
            </li>
          ))}
        </S.LabelsContainer>
      )}
    </div>
  );
}
