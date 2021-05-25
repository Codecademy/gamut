import fetch from 'fetch-mock';

import { fetchUser } from '../user';

const apiBaseUrl = 'https://www.codecademy.com';
const authUser = {
  foo: 'bar',
};

describe('fetchUser', () => {
  afterEach(() => fetch.restore());

  test('retrieves a user', async () => {
    fetch.getOnce('*', JSON.stringify(authUser));
    const user = await fetchUser(apiBaseUrl);

    expect(user).toEqual(authUser);
    expect(fetch.calls().length).toEqual(1);
    expect(fetch.calls()[0][0]).toBe(`${apiBaseUrl}/users/web`);
    expect(fetch.calls()[0][1]!.method).toBe('GET');
    expect(fetch.calls()[0][1]!.credentials).toBe('include');
  });
});
