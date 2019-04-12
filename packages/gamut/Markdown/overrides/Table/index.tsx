import React, { HTMLAttributes } from 'react';
import s from './styles.scss';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  maxHeight?: number | string;
}

const Table: React.FC<TableProps> = ({ maxHeight, ...props }) => {
  return (
    <div className={s.tableWrapper} style={{ maxHeight }}>
      <table {...props} />
    </div>
  );
};

export default Table;
