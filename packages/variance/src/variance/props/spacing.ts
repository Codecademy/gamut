export const margin = {
  margin: { property: 'margin' },
  marginX: { property: 'margin' }, // TODO add properties array
  marginY: { property: 'margin' },
  marginLeft: { property: 'marginLeft' },
  marginRight: { property: 'marginRight' },
  marginTop: { property: 'marginTop' },
  marginBottom: { property: 'marginBottom' },
} as const;

export const padding = {
  padding: { property: 'padding' },
  paddingX: { property: 'padding' }, // TODO add properties array
  paddingY: { property: 'padding' },
  paddingLeft: { property: 'paddingLeft' },
  paddingRight: { property: 'paddingRight' },
  paddingTop: { property: 'paddingTop' },
  paddingBottom: { property: 'paddingBottom' },
} as const;

export const spacing = { ...padding, ...margin } as const;
