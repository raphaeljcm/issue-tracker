import { useQuery } from '@tanstack/react-query';

import { Label } from '../@types/types';
import { fetchWithErrors } from '../utils/fetchWithErrors';

export function useLabelsData() {
  function getLabels(): Promise<Label[]> {
    return fetchWithErrors('/api/labels');
  }

  return useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
}
