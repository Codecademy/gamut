/* Quick and easy credit: https://stackoverflow.com/a/39835908 */
export const pluralizeWithS = (scope: string, scopeCount: number) => {
  // Out of all of our content types, only quizzes need a different way to be pluralized
  if (scope.charAt(scope.length - 1) === 'z') {
    return `${scope}${scopeCount !== 1 ? 'zes' : ''}`;
  }

  return `${scope}${scopeCount !== 1 ? 's' : ''}`;
};
