export const getControlColConfig = ({
  row,
  col,
}: {
  row: number;
  col: number;
}) => {
  let newRow = row;
  let newCol = col;

  if (col === 3) {
    newRow = row + 1;
    newCol = 1;
  } else {
    newCol = col + 1;
  }

  return {
    stateConfig: { row, col },
    controlConfig: {
      gridColumn: { _: newCol, c_sm: undefined },
      gridRow: newRow,
    },
  };
};
