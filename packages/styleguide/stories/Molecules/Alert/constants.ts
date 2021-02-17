export const ALERTS = {
  general: {
    variant: 'general',
    children: 'You have been logged out due to inactivity.',
    cta: { children: 'Login' },
  },
  success: {
    variant: 'success',
    cta: { children: 'Learn more' },
    children:
      'Success notification with an icon, an inline link, a call-to-action and an X',
  },
  feature: {
    variant: 'feature',
    cta: { children: 'Learn more' },
    children:
      'You can now do this new thing with this new feature we just added!',
  },
  maintenance: {
    variant: 'maintenance',
    cta: { children: 'Learn more' },
    children:
      'Maintenance: Codecademy will be offline between 02:00 AM and 08:00 AM.',
  },
  error: {
    variant: 'error',
    cta: { children: 'Learn more' },
    children: 'Couldn’t save your account changes because there is connection.',
  },
};
