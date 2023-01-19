import {
  Bee,
  Browser,
  Confetti,
  Plant,
  Sun,
} from '@codecademy/gamut-illustrations';

export type exportNotificationsContent = {
  text: string;
  subtext: string;
  image: typeof Bee;
};

/* must have at least one in array */
export const emptyNotificationContents: readonly exportNotificationsContent[] = [
  {
    text: "You're all caught up!",
    subtext: 'Go forth and learn new things.',
    image: Bee,
  },
  {
    text: "You're all caught up!",
    subtext: 'Time to learn new things.',
    image: Confetti,
  },
  {
    text: "You're all caught up!",
    subtext: 'The future looks bright.',
    image: Sun,
  },
  {
    text: "You're up to date!",
    subtext: 'Go forth and learn new things.',
    image: Plant,
  },
  {
    text: "You're up to date!",
    subtext: 'Clear future ahead.',
    image: Browser,
  },
] as const;
