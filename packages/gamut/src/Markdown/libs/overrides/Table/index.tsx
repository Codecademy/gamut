import React, { HTMLAttributes } from 'react';

import styles from './styles.module.scss';

export const Table: React.FC<HTMLAttributes<HTMLTableElement>> = (props) => {
  return (
    <div className={styles.tableWrapper}>
      <table {...props} />
    </div>
  );
};
