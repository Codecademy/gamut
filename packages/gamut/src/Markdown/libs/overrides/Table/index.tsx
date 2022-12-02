import { HTMLAttributes } from 'react';
import * as React from 'react';

// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles.module.scss';

export const Table: React.FC<HTMLAttributes<HTMLTableElement>> = (props) => {
  return (
    <div className={styles.tableWrapper}>
      <table {...props} />
    </div>
  );
};
