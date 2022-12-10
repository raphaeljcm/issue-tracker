import { useLabelsData } from '../../hooks/useLabelsData';

export function Label({ label }: { label: string }) {
  const labelsQuery = useLabelsData();

  if (labelsQuery.isLoading) return null;

  const labelObj = labelsQuery.data?.find(
    queryLabel => queryLabel.id === label,
  );

  if (!labelObj) return null;

  return <span className={`${labelObj.color}`}>{labelObj.name}</span>;
}
