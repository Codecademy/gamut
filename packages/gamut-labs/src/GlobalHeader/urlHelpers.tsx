export const formatUrlWithRedirect = (url: string, redirectUrl?: string) => {
  if (!redirectUrl) {
    return url;
  }
  const base = window.location.origin;
  const uri = new URL(url, base);
  const redirectUri = new URL(redirectUrl);

  const redirectParam = redirectUri.searchParams.get('redirect');
  if (redirectParam) {
    uri.searchParams.append('redirect', redirectParam);
  } else {
    uri.searchParams.append('redirect', redirectUri.toString());
  }
  return uri.toString();
};
