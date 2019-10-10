import React, { HTMLAttributes } from 'react';
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
    maxHeight?: number | string;
}
declare const Table: React.FC<TableProps>;
export default Table;
