import { useQuery } from '@tanstack/react-query';

import { User } from '../@types/types';

export function useUserData(userId: string | null) {
  async function getUser(): Promise<User | null> {
    if (!userId) {
      return null;
    }

    const response = await fetch(`/api/users/${userId}`);
    const data = response.json();
    return data;
  }

  return useQuery(['user', userId], getUser);
}
