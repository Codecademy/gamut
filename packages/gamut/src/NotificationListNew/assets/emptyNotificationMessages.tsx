import beeGraphic from './bee.svg';
import browserGraphic from './browser.svg';
import confettiGraphic from './confetti.svg';
import plantGraphic from './plant.svg';
import sunGraphic from './sun.svg';

export const emptyNotificationMessages = [
  {
    text: "You're all caught up!",
    subtext: 'Go forth and learn new things.',
    graphic: 'bee',
  },
  {
    text: "You're all caught up!",
    subtext: 'Time to learn new things.',
    graphic: 'confetti',
  },
  {
    text: "You're all caught up!",
    subtext: 'The future looks bright.',
    graphic: 'sun',
  },
  {
    text: "You're up to date!",
    subtext: 'Go forth and learn new things.',
    graphic: 'plant',
  },
  {
    text: "You're up to date!",
    subtext: 'Clear future ahead.',
    graphic: 'browser',
  },
];

export const slugToSvgMap: Record<string, string> = {
  bee: beeGraphic,
  confetti: confettiGraphic,
  sun: sunGraphic,
  plant: plantGraphic,
  browser: browserGraphic,
};
