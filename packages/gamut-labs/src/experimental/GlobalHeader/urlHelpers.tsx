export const addRedirectParam = (url: string, redirectParam: string) => {
  const base = window.location.origin;
  const uri = new URL(url, base);
  const requestUri = new URL(redirectParam, base);

  const redirect = requestUri.searchParams.get('redirect');
  if (redirect) {
    uri.searchParams.append('redirect', redirect);
  } else {
    uri.searchParams.append('redirect', requestUri.toString());
  }
  return uri.toString();
};
