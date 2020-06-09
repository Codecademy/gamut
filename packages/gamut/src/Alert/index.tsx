import React, { useState } from 'react';
import cx from 'classnames';

import {
  CloseIcon,
  ArrowChevronDownIcon,
  ArrowChevronUpIcon,
} from '@codecademy/gamut-icons';

import { CardShell } from '../Card';
import { Container } from '../FlexBox';
import Truncate from '../Truncate';
import ButtonBase from '../ButtonBase';
import Button from '../Button';

import { BannerType, BANNER_CONFIG } from './constants';
import { BannerCTA } from './types';

import s from './styles.module.scss';

export type AlertProps = {
  className?: string;
  /** Banner theme string: info, alert, success, announcement, error */
  type?: BannerType;
  /** Toggle the display of the theme's icon */
  showIcon?: boolean;
  /** On close callback */
  onClose?: () => void;
  /** Call to action configuration { text, href, onClick } */
  cta?: BannerCTA;
  /** Remove the max-width on the Alert container */
  fluid?: boolean;
  /** Number of lines to limit the message to */
  lines?: number;
};

export const Alert: React.FC<AlertProps> = ({
  className,
  children,
  fluid = false,
  type = BannerType.Info,
  showIcon = true,
  lines,
  cta,
  onClose,
}) => {
  const TypeIcon = BANNER_CONFIG[type];
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const showExpandToggle = isTruncated || isExpanded;
  const ToggleIcon = isExpanded ? ArrowChevronUpIcon : ArrowChevronDownIcon;

  return (
    <CardShell
      className={cx(s.container, className, {
        [s.container__fluid]: fluid,
        [s[`container__${type}`]]: type,
      })}
    >
      <Container align="start" justify="spaceAround" grow={1}>
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
          <Container
            className={s.section}
            grow={1}
            shrink={1}
            align="start"
            justify="spaceBetween"
          >
            <Truncate
              lines={isExpanded ? undefined : lines}
              onTruncate={setIsTruncated}
            >
              {children}
            </Truncate>
            {showExpandToggle && (
              <Container inline>
                <ButtonBase
                  className={cx(s.iconButton, s.iconButton__pushRight, {
                    [s[`iconButton__${type}`]]: type,
                  })}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <ToggleIcon size={16} />
                </ButtonBase>
              </Container>
            )}
          </Container>
          {cta && (
            <Container className={s.section} shrink={1}>
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
        {onClose && (
          <Container className={s.section} shrink={1} center>
            <ButtonBase
              className={cx(s.iconButton, {
                [s[`iconButton__${type}`]]: type,
              })}
              onClick={onClose}
            >
              <CloseIcon size={12} />
            </ButtonBase>
          </Container>
        )}
      </Container>
    </CardShell>
  );
};

export { BannerType } from './constants';

export default Alert;
