export const avatarGridTemplate = `'avatar 1fr'
'avatar 1fr'
'avatar 1fr'`;

export const avatarColumnTemplate = 'min-content 1fr';

export const defaultGridTemplate = `1fr`;

export const getShadowAlignment = (alignment: string) => {
  switch (alignment) {
    case 'top-right':
      return 'above-left';
    case 'bottom-left':
      return 'below-right';
    case 'below-right':
      return 'below-left';
    default:
      return 'above-right';
  }
};
