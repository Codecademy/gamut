import React from 'react';
import cx from 'classnames';
import { CardShell, Button, CloseIcon } from '@codecademy/gamut';

import s from './styles.module.scss';

export type BannerCTA = {
  href?: string;
  text: string;
  onClick: () => void;
};

export enum BannerType {
  alert,
  announcement,
  error,
  informational,
  success,
}

export type NotificationProps = {
  type: BannerType;
  showIcon: boolean;
  onClose: () => void;
  cta?: BannerCTA;
};

export const Notification: React.FC<NotificationProps> = ({
  children,
  type = BannerType.informational,
  showIcon,
  cta,
  onClose,
}) => {
  return (
    <CardShell
      className={cx(s.container, {
        [s[`container__${type}`]]: type,
        [s.container__icon]: showIcon,
      })}
    >
      {showIcon && <span />}
      <div>{children}</div>
      {cta && (
        <div>
          <Button
            theme={}
            onClick={cta.onClick}
            link={!!cta.href}
            href={cta.href}
          >
            {cta.text}
          </Button>
        </div>
      )}
      <Button
        flat
        theme="brand-dark-blue"
        className={s.closeButton}
        onClick={onClose}
      >
        <CloseIcon />
      </Button>
    </CardShell>
  );
};

export default Notification;
