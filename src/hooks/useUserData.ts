import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { User } from '../@types/types';
import { fetchWithErrors } from '../utils/fetchWithErrors';

export function useUserData(userId: string | null) {
  async function getUser({
    signal,
  }: QueryFunctionContext): Promise<User | null> {
    if (!userId) {
      return null;
    }

    return fetchWithErrors(`/api/users/${userId}`, { signal });
  }

  return useQuery(['user', userId], getUser, {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
