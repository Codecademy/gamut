import React from 'react';

import { GridFormField } from '../../types';
import { GridFormToolTip } from '../GridFromToolTip';

export type GridForToolTipWrapper = {
  children: React.ReactNode;
  field: GridFormField;
};

export const GridFormToolTipWrapper: React.FC<GridForToolTipWrapper> = ({
  children,
  field,
}) => {
  return (
    <div>
      {children}
      {field.toolTip && <GridFormToolTip field={field} />}
    </div>
  );
};
