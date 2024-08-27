export const avatarGridTemplate = `'avatar 1fr'
'avatar 1fr'
'avatar 1fr'`;

export const avatarColumnTemplate = 'min-content 1fr';

export const defaultGridTemplate = `1fr`;

export const getShadowAlignment = (alignment: string) =>
  alignment.includes('top')
    ? alignment.replace('top', 'above')
    : alignment.replace('bottom', 'below');
