import Uri from 'jsuri';

export const addRedirectParam = (url: string, requestPath: string) => {
  const uri = new Uri(url);
  const currentUri = new Uri(requestPath);

  let redirectTo;
  if (currentUri.hasQueryParam('redirect')) {
    redirectTo = currentUri.getQueryParamValue('redirect');
  } else {
    currentUri.deleteQueryParam('redirect');
    redirectTo = currentUri.toString();
  }

  uri.addQueryParam('redirect', redirectTo);

  return uri.toString();
};
