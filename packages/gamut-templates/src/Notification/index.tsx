import React, { useState, useCallback, useLayoutEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import cx from 'classnames';
import { CardShell, Container, ButtonBase, Button } from '@codecademy/gamut';
import {
  CloseIcon,
  ArrowChevronDownIcon,
  ArrowChevronUpIcon,
} from '@codecademy/gamut-icons';

import { truncateText, generateContainerId } from './utilities';

import { BANNER_CONFIG, CHAR_WIDTH, CHARACTER_BUFFER } from './contstants';
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
  /** Number of lines to truncate body text to */
  truncate?: number;
  children: string;
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
  const [expanded, setExpanded] = useState(false);
  const [width, setWidth] = useState(0);
  const identifier = useMemo(() => generateContainerId(), []);

  const charsPerLine = width / CHAR_WIDTH - CHARACTER_BUFFER;

  const text = useMemo(() => {
    if (!(truncate > 0) || expanded) {
      return children;
    }
    return truncateText(children, charsPerLine, truncate);
  }, [charsPerLine, children, expanded, truncate]);

  const isTruncated = text !== children;
  const showExpandToggle = isTruncated || expanded;

  const toggleExpand = useCallback(() => setExpanded(!expanded), [
    expanded,
    setExpanded,
  ]);

  const getContainerWidth = useCallback(
    debounce(
      () => setWidth(document.getElementById(identifier).offsetWidth),
      50
    ),
    [setWidth, identifier]
  );

  useLayoutEffect(() => {
    if (truncate && truncate > 0) {
      getContainerWidth();
      window.addEventListener('resize', getContainerWidth);

      return () => window.removeEventListener('resize', getContainerWidth);
    }
  }, [getContainerWidth, truncate]);

  return (
    <CardShell
      className={cx(s.container, {
        [s.container__fluid]: fluid,
        [s[`container__${type}`]]: type,
        [s.container__icon]: showIcon,
      })}
    >
      <Container align="start" justify="spaceBetween">
        {showIcon && (
          <Container className={s.column} justify="center" align="center">
            <TypeIcon size={24} />
          </Container>
        )}
        <Container
          align="start"
          className={cx(s.column__fill, s.column__action)}
        >
          <Container
            id={identifier}
            align="start"
            className={cx(s.column, s.column__fill, s.content, {
              [s.content__expanded]: expanded,
            })}
          >
            <span
              style={{
                maxHeight:
                  isTruncated && !expanded && `${1.5 * (truncate || 1)}rem`,
              }}
              className={cx(s.text, {
                [s.text__truncated]: isTruncated,
              })}
            >
              {text}
              {isTruncated && <span>...</span>}
            </span>
            {showExpandToggle && (
              <Container inline>
                <ButtonBase
                  className={cx(s.iconButton, {
                    [s[`iconButton__${type}`]]: type,
                  })}
                  onClick={toggleExpand}
                >
                  {expanded ? (
                    <ArrowChevronUpIcon size={12} />
                  ) : (
                    <ArrowChevronDownIcon size={12} />
                  )}
                </ButtonBase>
              </Container>
            )}
          </Container>
          {cta && (
            <Container className={cx(s.column, s.column__noPadding)}>
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
        <Container center className={s.column}>
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
