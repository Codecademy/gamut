import cx from 'classnames';
import { HTMLProps, ReactNode } from 'react';
import * as React from 'react';

import { ChildComponentDescriptor } from '../../typings/react';
import { omitProps } from '../../utils/omitProps';
// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles.module.scss';

const propKeys = [
  'children',
  'className',
  'href',
  'link',
  'onClick',
  'target',
  'rel',
];

export type ButtonDeprecatedBaseProps = Omit<
  HTMLProps<HTMLAnchorElement> & HTMLProps<HTMLButtonElement>,
  'as' | 'size'
> & {
  /**
   * Component type to wrap children with.
   */
  as?: ChildComponentDescriptor;
  /**
   * @remarks We would love to properly type this with generics, but cannot yet.
   * @see https://github.com/Codecademy/gamut/pull/270#discussion_r270917147
   * @see https://github.com/Microsoft/TypeScript/issues/21048
   */
  asProps?: any;
  children?: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  /**
   * Variant that displays the button as an inline link element, but maintains its semantic meaning as a button.
   */
  link?: boolean;
  /**
   * @remarks
   * Technically, this is only ever a button event *or* a link event.
   * We '&' them together for ease of usage.
   */
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement> &
      React.MouseEvent<HTMLButtonElement>
  ) => void;
};

/**
 * @deprecated
 * This component is deprecated and is no longer supported.
 *
 * See [Anchor](https://gamut.codecademy.com/storybook/?path=/docs/typography-anchor--anchor) for similiar functionality
 *
 * @example
 * import { Anchor } from '@codecademy/gamut';
 *
 * <Anchor variant="interface">Button</Anchor>
 *
 */

export const ButtonDeprecatedBase: React.FC<ButtonDeprecatedBaseProps> = (
  props
) => {
  const { href, className, link, onClick, target, rel } = props;
  const { as: As, asProps = {}, ...restOfProps } = props;
  const propsToTransfer = omitProps(propKeys, restOfProps);

  const classes = cx(styles.basicBtn, className, {
    [styles.basicLink]: link,
  });

  const defaultProps = {
    ...propsToTransfer,
    className: classes,
    onClick,
    'data-btn': true,
  };

  if (As) {
    return <As {...defaultProps} {...asProps} />;
  }

  if (href) {
    // Check if this is a popup and and appropriate rel props if they don't exist (see https://web.dev/external-anchors-use-rel-noopener/)
    const anchorProps = {
      target,
      rel: target === '_blank' && !rel ? 'noopener noreferrer' : rel,
    };

    // Anchor tag receives children content from propsToTransfer
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...defaultProps} {...anchorProps} href={href} />;
  }

  // eslint-disable-next-line react/button-has-type
  return <button {...defaultProps} />;
};
