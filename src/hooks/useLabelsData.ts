import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { Label } from '../@types/types';
import { defaultLabels } from '../helpers/defaultData';
import { fetchWithErrors } from '../utils/fetchWithErrors';

export function useLabelsData() {
  function getLabels({ signal }: QueryFunctionContext): Promise<Label[]> {
    return fetchWithErrors('/api/labels', { signal });
  }

  return useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60, // 60 minutes
    placeholderData: defaultLabels,
  });
}
