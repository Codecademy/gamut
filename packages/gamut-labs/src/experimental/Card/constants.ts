import { colors } from '@codecademy/gamut-styles';

const { white, navy, yellow } = colors;
export type BoxVariants = 'yellow' | 'navy' | 'white';

export const BOX_VARIANTS: Record<
  BoxVariants,
  {
    background: string;
    text: string;
    border: string;
    shadow?: string;
  }
> = {
  yellow: {
    background: yellow,
    text: navy,
    border: navy,
  },
  navy: {
    background: navy,
    shadow: white,
    text: white,
    border: navy,
  },
  white: {
    background: white,
    text: navy,
    border: navy,
  },
};
