export const applyCorrectNotation = ({ id }: { id: string }) => {
  const hasHypen = id.includes('-');
  if (!hasHypen) return `.${id}`;
  return `['${id}']`;
};
