import { useQuery } from 'react-query';

import { api } from '../api';
import { User } from '../mirage';

type GetUsersResponse = {
  users: User[];
  totalCount: number;
};

export async function getUsers(
  page: number
): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('users', {
    params: {
      page
    }
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map((user: User) => {
    const { id, name, email, created_at } = user;

    return {
      id,
      name,
      email,
      created_at: new Date(created_at).toLocaleDateString('pt-br', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  });

  return { users, totalCount };
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 5 // five seconds
  });
}
