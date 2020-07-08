import { ColumnSizes, ResponsiveProperty } from '@codecademy/gamut/dist/Layout/types';
import React from 'react';
export declare type GridFormSubmitProps = {
    contents: React.ReactNode;
    size?: ResponsiveProperty<ColumnSizes>;
};
export declare const GridFormSubmit: React.FC<GridFormSubmitProps>;
export default GridFormSubmit;
