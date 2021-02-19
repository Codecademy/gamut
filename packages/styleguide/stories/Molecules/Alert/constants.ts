export const ALERTS = {
  general: {
    type: 'general',
    children: 'You have been logged out due to inactivity.',
    cta: { children: 'Login' },
  },
  success: {
    type: 'success',
    cta: { children: 'Learn more' },
    children:
      'Success notification with an icon, an inline link, a call-to-action and an X',
  },
  feature: {
    type: 'feature',
    cta: { children: 'Learn more' },
    children:
      'You can now do this new thing with this new feature we just added!',
  },
  notice: {
    type: 'notice',
    cta: { children: 'Learn more' },
    children:
      'Maintenance: Codecademy will be offline between 02:00 AM and 08:00 AM.',
  },
  error: {
    type: 'error',
    cta: { children: 'Learn more' },
    children: 'Couldn’t save your account changes because there is connection.',
  },
};
