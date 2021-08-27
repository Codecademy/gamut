import { Notification } from '@codecademy/gamut';

export const createStubNotification = (
  overrides?: Partial<Notification>
): Notification => ({
  campaign: 'existence_is_pain',
  date: '5 hours',
  id: '1',
  link: 'https://codecademy.com',
  text: "Look at me! I'm Mr. Notification!",
  ...overrides,
});
