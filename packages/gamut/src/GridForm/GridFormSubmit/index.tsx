import React from 'react';

import { Button } from '../../Button';
import { Column, ColumnSizes, ResponsiveProperty } from '../../Layout';

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  disabled?: boolean;
  size?: ResponsiveProperty<ColumnSizes>;
};

export const GridFormSubmit: React.FC<GridFormSubmitProps> = ({
  contents,
  disabled,
  size,
}) => {
  return (
    <Column size={size}>
      <Button disabled={disabled} theme="brand-purple" type="submit">
        {contents}
      </Button>
    </Column>
  );
};

export default GridFormSubmit;
