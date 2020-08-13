import React, { HTMLAttributes } from 'react';
import s from './styles.module.scss';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  maxHeight?: number | string;
}

export const Table: React.FC<TableProps> = ({ maxHeight, ...props }) => {
  return (
    <div className={s.tableWrapper} style={{ maxHeight }}>
      <table {...props} />
    </div>
  );
};
