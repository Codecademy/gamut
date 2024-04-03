export const ALERTS = {
  general: {
    type: 'general',
    children:
      'Please verify your email so we can make sure your account is secure. A link has been sent to name@email.com.',
    cta: { children: 'Resend verification' },
  },
  success: {
    type: 'success',
    cta: { children: '' },
    children: <>Success! Your content has been assigned.</>,
  },
  feature: {
    type: 'feature',
    cta: { children: 'Add your name' },
    children:
      'Update your profile with your name to help your team with account management.',
  },
  notice: {
    type: 'notice',
    cta: { children: 'Learn more' },
    children: (
      <>Maintenance: Codecademy will be offline between 2AM and 4AM EST.</>,
    ),
  },
  error: {
    type: 'error',
    cta: { children: '' },
    children:
      'We were unable to add this team member. Please refresh the page and try again.',
  },
  subtle: {
    type: 'subtle',
    cta: { children: 'Learn more' },
    children: 'Subtly alerting the user',
  },
};
