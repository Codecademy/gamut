/* Quick and easy credit: https://stackoverflow.com/a/39835908 */
export var pluralizeWithS = function pluralizeWithS(scope, scopeCount) {
  // Out of all of our content types, only quizzes need a different way to be pluralized
  if (scope.charAt(scope.length - 1) === 'z') {
    return "".concat(scope).concat(scopeCount !== 1 ? 'zes' : '');
  }
  return "".concat(scope).concat(scopeCount !== 1 ? 's' : '');
};