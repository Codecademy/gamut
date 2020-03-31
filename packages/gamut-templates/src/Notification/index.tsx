import React from 'react';
import cx from 'classnames';
import {
  CardShell,
  CloseIcon,
  ButtonBase,
  AlertIcon,
  InformationalIcon,
  CheckmarkIcon,
  Button,
} from '@codecademy/gamut';

import s from './styles.module.scss';

export type BannerCTA = {
  href?: string;
  text: string;
  onClick: () => void;
};

export type BannerTypes =
  | 'alert'
  | 'announcement'
  | 'error'
  | 'info'
  | 'success';

const BANNER_CONFIG = {
  alert: AlertIcon,
  error: CloseIcon,
  info: InformationalIcon,
  announcement: AlertIcon,
  success: CheckmarkIcon,
};

export type NotificationProps = {
  type: BannerTypes;
  showIcon: boolean;
  onClose: () => void;
  cta?: BannerCTA;
};

export const Notification: React.FC<NotificationProps> = ({
  children,
  type = 'info',
  showIcon,
  cta,
  onClose,
}) => {
  const TypeIcon = BANNER_CONFIG[type];
  return (
    <CardShell
      className={cx(s.container, {
        [s[`container__${type}`]]: type,
        [s.container__icon]: showIcon,
      })}
    >
      {showIcon && <TypeIcon />}
      <div>{children}</div>
      {cta && (
        <div>
          <Button
            theme={type}
            className={s.cta}
            onClick={cta.onClick}
            link={!!cta.href}
            href={cta.href}
          >
            {cta.text}
          </Button>
        </div>
      )}
      <ButtonBase className={s.closeButton} onClick={onClose}>
        <CloseIcon />
      </ButtonBase>
    </CardShell>
  );
};

export default Notification;
