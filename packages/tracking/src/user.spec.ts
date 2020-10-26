import fetch from 'jest-fetch-mock';
import { fetchUser } from './user';

const apiBaseUrl = 'https://www.codecademy.com';
const authUser = {
  foo: 'bar',
};

beforeAll(() => fetch.enableMocks());
afterEach(() => fetch.resetMocks());

describe('fetchUser', () => {
  test('retrieves a user', async () => {
    fetch.once(JSON.stringify(authUser));
    const user = await fetchUser(apiBaseUrl);

    expect(user).toEqual(authUser);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toBe(`${apiBaseUrl}/users/web`);
    expect(fetch.mock.calls[0][1]!.method).toBe('GET');
    expect(fetch.mock.calls[0][1]!.credentials).toBe('include');
  });
});
