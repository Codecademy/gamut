import React from 'react';
import cx from 'classnames';
import { CardShell, Container, ButtonBase, Button } from '@codecademy/gamut';
import { CloseIcon } from '@codecademy/gamut-icons';

import { BANNER_CONFIG } from './contstants';
import { BannerTypes, BannerCTA } from './types';

import s from './styles.module.scss';

export type NotificationProps = {
  /** Banner theme string: info, alert, success, announcement, error */
  type?: BannerTypes;
  /** Toggle the display of the theme's icon */
  showIcon?: boolean;
  /** On close callback */
  onClose: () => void;
  /** Call to action configuration { text, href, onClick } */
  cta?: BannerCTA;
};

export const Notification: React.FC<NotificationProps> = ({
  children,
  type = BannerTypes.Info,
  showIcon = true,
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
      {showIcon && (
        <Container className={s.column} justify="center" align="center">
          <TypeIcon size={24} />
        </Container>
      )}
      <Container className={s.column}>{children}</Container>
      {cta && (
        <Container
          className={cx(s.column, s.column__noPadding, s.column__action)}
        >
          <Button
            caps
            theme={type}
            className={s.actionButton}
            onClick={cta.onClick}
            link={!!cta.href}
            href={cta.href}
          >
            {cta.text}
          </Button>
        </Container>
      )}
      <Container
        className={cx(s.column, s.column__noPadding)}
        justify="center"
        align="stretch"
      >
        <ButtonBase
          className={cx(s.closeButton, {
            [s[`closeButton__${type}`]]: type,
          })}
          onClick={onClose}
        >
          <CloseIcon size={12} />
        </ButtonBase>
      </Container>
    </CardShell>
  );
};

export default Notification;
