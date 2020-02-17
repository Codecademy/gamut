import React from 'react';
import cx from 'classnames';

import s from './styles/Toast.module.scss';
import CloseIcon from '../../../gamut/src/Icon/icons/CloseIcon';
import { ContainerElementProps } from '../../../gamut/src/Layout/types';
import { Button, CardShell } from '@codecademy/gamut';

type ToastProps = {
  icon?: React.ReactElement;
  onClick?: () => void;
  onClose: () => void;
} & ContainerElementProps;

const Toast: React.FC<ToastProps> = ({
  children,
  icon,
  onClose,
  onClick,
  testId,
  className,
}) => {
  return (
    <CardShell className={cx(s.container, className)} data-test-id={testId}>
      <Button flat theme="platform" className={s.closeButton} onClick={onClose}>
        <CloseIcon />
      </Button>
      <Button
        flat
        theme="platform"
        className={s.contentButton}
        onClick={onClick}
      >
        <div
          className={cx(s.body, {
            [s.body__noIcon]: !icon,
          })}
        >
          {icon && <div className={s.icon}>{icon}</div>}
          <div className={s.content}>{children}</div>
        </div>
      </Button>
    </CardShell>
  );
};

export default Toast;
