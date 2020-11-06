export const getPixelPattern = (fill?: string) =>
  `"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='5' height='5'><rect fill='${sanitizeHexString(
    fill
  )}' x='0' y='0' width='40%' height='40%'/></svg>"`;

export const sanitizeHexString = (color?: string) => color?.replace(/#/, '%23');
