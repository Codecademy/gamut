import React from 'react';
import cx from 'classnames';

import s from './styles/Toast.module.scss';
import CloseIcon from '../../../gamut/src/Icon/icons/CloseIcon';
import { ContainerElementProps } from '../../../gamut/src/Layout/types';
import { ButtonBase, CardShell } from '@codecademy/gamut';

type ToastProps = {
  icon?: React.ReactElement;
  onClick?: () => void;
  onClose: () => void;
} & ContainerElementProps;

const Toast: React.FC<ToastProps> = ({
  children,
  icon,
  onClose,
  testId,
  className,
}) => {
  return (
    <CardShell className={cx(s.container, className)} data-test-id={testId}>
      <ButtonBase className={s.closeButton} onClick={onClose}>
        <CloseIcon />
      </ButtonBase>
      <div
        className={cx(s.body, {
          [s.body__noIcon]: !icon,
        })}
      >
        {icon && <div className={s.icon}>{icon}</div>}
        <div className={s.content}>{children}</div>
      </div>
    </CardShell>
  );
};

export default Toast;
