export var conditionallyLoadAnalytics = function conditionallyLoadAnalytics(_ref) {
  var analytics = _ref.analytics,
      destinationPreferences = _ref.destinationPreferences,
      identifyPreferences = _ref.identifyPreferences,
      user = _ref.user,
      writeKey = _ref.writeKey;

  if (analytics.initialize) {
    return;
  }

  analytics.load(writeKey, {
    integrations: destinationPreferences
  });
  analytics.page();

  if (user) {
    analytics.identify(user.id, {
      email: user.email
    }, {
      integrations: identifyPreferences
    });
  }
};