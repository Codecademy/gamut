import { Button, Col, Item } from '@codecademy/gamut';
import { ColumnSizes } from '@codecademy/gamut/dist/Layout/types';
import React from 'react';

export type GridFormSubmitProps = {
  children: React.ReactNode;
  sizing?: ColumnSizes;
};

const GridFormSubmit: React.FC<GridFormSubmitProps> = ({
  children,
  sizing,
}) => {
  return (
    <Col {...sizing}>
      <Item>
        <Button theme="brand-purple" type="submit">
          {children}
        </Button>
      </Item>
    </Col>
  );
};

export default GridFormSubmit;
