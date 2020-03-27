import { Button, Column } from '@codecademy/gamut-elements';
import {
  ColumnSizes,
  ResponsiveProperty,
} from '@codecademy/gamut-elements/dist/Layout/types';
import React from 'react';

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  size?: ResponsiveProperty<ColumnSizes>;
};

export const GridFormSubmit: React.FC<GridFormSubmitProps> = ({
  contents,
  size,
}) => {
  return (
    <Column size={size}>
      <Button theme="brand-purple" type="submit">
        {contents}
      </Button>
    </Column>
  );
};

export default GridFormSubmit;
