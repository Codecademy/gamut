export const pxRem = (pixelValue: string | number): string => {
  const parsedValue =
    typeof pixelValue === 'string' ? parseInt(pixelValue, 10) : pixelValue;
  return `${parsedValue / 16}rem`;
};
