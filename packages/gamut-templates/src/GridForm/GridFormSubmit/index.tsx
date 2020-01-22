import { Button, Row } from '@codecademy/gamut';
import { ColumnSizes } from '@codecademy/gamut/dist/Layout/types';
import React from 'react';

export type GridFormSubmitProps = {
  children: React.ReactNode;
  size?: ColumnSizes;
};

const GridFormSubmit: React.FC<GridFormSubmitProps> = ({ children }) => {
  return (
    <Row>
      <Button as="input" type="submit" theme="brand-purple">
        {children}
      </Button>
    </Row>
  );
};

export default GridFormSubmit;
