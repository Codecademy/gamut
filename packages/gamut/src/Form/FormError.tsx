import cx from 'classnames';
import React, { HTMLAttributes } from 'react';

import styles from './styles/FormError.module.scss';

export const FormError: React.FC<HTMLAttributes<HTMLSpanElement>> = (props) => {
  return <span className={cx(styles.formError, props.className)} {...props} />;
};
