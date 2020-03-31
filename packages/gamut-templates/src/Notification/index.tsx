import React from 'react';
import cx from 'classnames';
import { CardShell, CloseIcon, ButtonBase, Button } from '@codecademy/gamut';

import { BANNER_CONFIG } from './contstants';
import { BannerTypes, BannerCTA } from './types';

import s from './styles.module.scss';

export type NotificationProps = {
  /** Banner theme string: info, alert, success, announcement, error */
  type: BannerTypes;
  /** Toggle the display of the theme's icon */
  showIcon: boolean;
  /** On close callback */
  onClose: () => void;
  /** Call to action configuration { text, href, onClick } */
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
        <div className={s.ctaContainer}>
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
