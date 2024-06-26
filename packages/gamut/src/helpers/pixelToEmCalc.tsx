export function pixelToEm(pixel: number, baseFontSize = 16): string {
  const em = pixel / baseFontSize;
  return `${em}em`;
}
