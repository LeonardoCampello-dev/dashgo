import { useQuery } from 'react-query'

import { api } from '../api'
import { User } from '../mirage'

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get('users')

  const users = data.users.map((user: User) => {
    const { id, name, email, created_at } = user

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
    }
  })

  return users
}

export function useUsers() {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 5 // five seconds
  })
}
