export const getGridTemplateColumns = ({
  numOfColumns,
  selectable,
}: {
  numOfColumns?: number;
  selectable?: boolean;
}) => {
  const selectableText = selectable ? 'min-content ' : '';
  // return `min-content repeat(5, minmax(0, 1fr) max-content) min-content`;
  return `${selectableText}repeat(${numOfColumns}, minmax(0, min-content) max-content) min-content`;
};
