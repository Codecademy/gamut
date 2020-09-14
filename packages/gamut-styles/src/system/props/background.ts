export const background = {
  backgroundImage: {
    propName: 'backgroundImage',
    scale: [] as string[],
  },
  backgroundSize: {
    propName: 'backgroundSize',
    scale: [] as ('contain' | 'cover' | 'auto' | string | number)[],
  },
  backgroundRepeat: {
    propName: 'backgroundRepeat',
    scale: [] as (
      | 'repeat'
      | 'repeat-x'
      | 'repeat-y'
      | 'space'
      | 'round'
      | 'no-repeat'
    )[],
  },
  backgroundPosition: {
    propName: 'backgroundPosition',
    scale: [] as ('top' | 'bottom' | 'left' | 'right' | 'center')[],
  },
} as const;
