export const percentageOrAbsolute = (coordinate: number) => {
  if (coordinate <= 1 && coordinate >= -1) {
    return `${coordinate * 100}%`;
  }
  return `${coordinate}px`;
};
