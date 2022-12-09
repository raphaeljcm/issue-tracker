import { useQuery } from '@tanstack/react-query';

export function useUserData(userId: string | null) {
  async function getUser() {
    if (!userId) {
      return null;
    }

    const response = await fetch(`/api/users/${userId}`);
    const data = response.json();
    return data;
  }

  return useQuery(['user', userId], getUser);
}
