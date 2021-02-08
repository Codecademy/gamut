import {
  ArrowChevronDownIcon,
  ArrowChevronUpIcon,
  CloseIcon,
} from '@codecademy/gamut-icons';
import cx from 'classnames';
import React, { useState } from 'react';

import { ButtonDeprecated } from '../ButtonDeprecated';
import { ButtonDeprecatedBase } from '../ButtonDeprecatedBase';
import { CardShell } from '../Card';
import { Container } from '../FlexBox';
import { Truncate } from '../Truncate';
import { BANNER_CONFIG, BannerType } from './constants';
import styles from './styles.module.scss';
import { BannerCTA } from './types';

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
      className={cx(styles.container, className, {
        [styles.container__fluid]: fluid,
        [styles[`container__${type}`]]: type,
      })}
      role="status"
      aria-label="alert box"
      aria-live="polite"
    >
      <Container align="start" justify="spaceAround" grow={1}>
        {showIcon && (
          <Container className={styles.section} justify="center" align="center">
            <TypeIcon size={24} aria-label={`${type}: `} />
          </Container>
        )}
        <Container
          className={styles.section__main}
          align="start"
          grow={1}
          shrink={1}
        >
          <Container
            className={styles.section}
            grow={1}
            shrink={1}
            align="start"
            justify="spaceBetween"
          >
            <Truncate
              expanded={isExpanded || !lines}
              lines={lines || 1}
              onTruncate={setIsTruncated}
              className={styles.truncate}
            >
              {children}
            </Truncate>
            {showExpandToggle && (
              <Container inline>
                <ButtonDeprecatedBase
                  className={cx(
                    styles.iconButton,
                    styles.iconButton__pushRight,
                    {
                      [styles[`iconButton__${type}`]]: type,
                    }
                  )}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <ToggleIcon size={16} />
                </ButtonDeprecatedBase>
              </Container>
            )}
          </Container>
          {cta && (
            <Container className={styles.section} shrink={1}>
              <ButtonDeprecated
                caps
                theme={type}
                className={styles.actionButton}
                onClick={cta.onClick}
                href={cta.href}
                disabled={cta.disabled}
                target={cta.openInSameTab ? undefined : '_blank'}
              >
                {cta.text}
              </ButtonDeprecated>
            </Container>
          )}
        </Container>
        {onClose && (
          <Container className={styles.section} shrink={1} center>
            <ButtonDeprecatedBase
              className={cx(styles.iconButton, {
                [styles[`iconButton__${type}`]]: type,
              })}
              aria-label="Close Alert"
              onClick={onClose}
            >
              <CloseIcon aria-hidden size={12} />
            </ButtonDeprecatedBase>
          </Container>
        )}
      </Container>
    </CardShell>
  );
};

export { BannerType } from './constants';
