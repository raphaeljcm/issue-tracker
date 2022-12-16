import { useQuery } from '@tanstack/react-query';

import { Label } from '../@types/types';

export function useLabelsData() {
  async function getLabels(): Promise<Label[]> {
    const response = await fetch('/api/labels');
    const data = await response.json();
    return data;
  }

  return useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
}
