import { User } from './types';

export const fetchUser = async (apiBaseUrl: string): Promise<User> => {
  const response = await fetch(`${apiBaseUrl}/users/web`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
  });
  return response.json();
};
