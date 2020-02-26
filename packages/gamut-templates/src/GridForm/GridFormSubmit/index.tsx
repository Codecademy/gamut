import { Button, Col, Item } from '@codecademy/gamut';
import { ColumnSizes } from '@codecademy/gamut/dist/Layout/types';
import React from 'react';

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  sizing?: ColumnSizes;
};

export const GridFormSubmit: React.FC<GridFormSubmitProps> = ({
  contents,
  sizing,
}) => {
  return (
    <Col {...sizing}>
      <Item>
        <Button theme="brand-purple" type="submit">
          {contents}
        </Button>
      </Item>
    </Col>
  );
};

export default GridFormSubmit;
