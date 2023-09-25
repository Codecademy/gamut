export var formatUrlWithRedirect = function formatUrlWithRedirect(url, redirectUrl) {
  if (!redirectUrl) {
    return url;
  }
  var base = window.location.origin;
  var uri = new URL(url, base);
  var redirectUri = new URL(redirectUrl);
  var redirectParam = redirectUri.searchParams.get('redirect');
  if (redirectParam) {
    uri.searchParams.append('redirect', redirectParam);
  } else {
    uri.searchParams.append('redirect', redirectUri.toString());
  }
  return uri.toString();
};