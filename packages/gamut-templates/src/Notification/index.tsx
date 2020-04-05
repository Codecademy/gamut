import React, { useState, useCallback } from 'react';
import cx from 'classnames';
import {
  CardShell,
  Container,
  ButtonBase,
  Button,
  Truncate,
} from '@codecademy/gamut';

import {
  CloseIcon,
  ArrowChevronDownIcon,
  ArrowChevronUpIcon,
} from '@codecademy/gamut-icons';

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
  /** Remove the max-width on the notification container */
  fluid?: boolean;
};

export const Notification: React.FC<NotificationProps> = ({
  children,
  fluid = false,
  type = BannerTypes.Info,
  showIcon = true,
  truncate,
  cta,
  onClose,
}) => {
  const TypeIcon = BANNER_CONFIG[type];
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isTruncated, setIsTruncated] = useState<boolean>(false);
  const showExpandToggle = isTruncated || expanded;
  const ToggleIcon = expanded ? ArrowChevronUpIcon : ArrowChevronDownIcon;

  const toggleExpand = useCallback(() => setExpanded(!expanded), [
    expanded,
    setExpanded,
  ]);

  return (
    <CardShell
      className={cx(s.container, {
        [s.container__fluid]: fluid,
        [s[`container__${type}`]]: type,
        [s.container__icon]: showIcon,
      })}
    >
      <Container align="start" shrink={1}>
        {showIcon && (
          <Container className={s.section} justify="center" align="center">
            <TypeIcon size={24} />
          </Container>
        )}
        <Container
          className={s.section__main}
          align="start"
          grow={1}
          shrink={1}
        >
          <Container grow={1} align="start" className={cx(s.section)}>
            <Truncate lines={expanded ? 100 : 2} onTruncate={setIsTruncated}>
              {children}
            </Truncate>
            {showExpandToggle && (
              <Container inline>
                <ButtonBase
                  className={cx(s.iconButton, {
                    [s[`iconButton__${type}`]]: type,
                  })}
                  onClick={toggleExpand}
                >
                  <ToggleIcon size={16} />
                </ButtonBase>
              </Container>
            )}
          </Container>
          {cta && (
            <Container
              shrink={1}
              className={cx(s.section, s.section__smPadding)}
            >
              <Button
                caps
                theme={type}
                className={s.actionButton}
                onClick={cta.onClick}
                href={cta.href}
                disabled={cta.disabled}
              >
                {cta.text}
              </Button>
            </Container>
          )}
        </Container>
        <Container shrink={1} center className={s.section}>
          <ButtonBase
            className={cx(s.iconButton, {
              [s[`iconButton__${type}`]]: type,
            })}
            onClick={onClose}
          >
            <CloseIcon size={12} />
          </ButtonBase>
        </Container>
      </Container>
    </CardShell>
  );
};

export default Notification;
