import { formatUrlWithRedirect } from '../urlHelpers';

const loginPath = '/login';
const signupPath = '/register';

describe('formatUrlWithRedirect', () => {
  it('returns the url parameter if no redirect param provided', () => {
    const response = formatUrlWithRedirect(loginPath);
    expect(response).toBe(loginPath);
  });

  it('returns a url with the query parameter if a redirect url is provided', () => {
    const redirectUrl = window.location + '/catalog';
    const response = formatUrlWithRedirect(signupPath, redirectUrl);
    const uri = new URL(response);
    expect(uri.searchParams.get('redirect')).toBe(redirectUrl);
  });

  it('maintains the initial redirect parameter if the redirect url included a redirect parameter of its own', () => {
    const initialRedirectParam = 'google';
    const redirectUrl =
      window.location + '/catalog?redirect=' + initialRedirectParam;
    const response = formatUrlWithRedirect(signupPath, redirectUrl);
    const uri = new URL(response);
    expect(uri.searchParams.get('redirect')).toBe('initialRedirectParam');
  });
});
