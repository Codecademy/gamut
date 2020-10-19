import React, { ReactNode } from 'react';
import cx from 'classnames';
import styles from './styles/CardFooter.module.scss';

const defaultProps = {
  border: 'none',
  align: 'left',
  flex: true,
  standardPadding: true,
  standardHeight: true,
};

export type CardFooterProps = {
  /**
   * Variant for the top border style.
   */
  border?: 'dashed' | 'none' | 'solid';
  children: ReactNode;
  className?: string;
  /** Displays the footer content as flex and aligned center */
  flex?: boolean;
  /**
   * Flex justification for the content of the footer.  (used with `flex`)
   */
  align?: 'center' | 'left' | 'right';
  /**
   * Use standard height regardless of content.
   */
  standardHeight?: boolean;
  /**
   * Use standard padding sizes regardless of content.
   */
  standardPadding?: boolean;
};

export const CardFooter = ({
  children,
  border,
  align,
  flex,
  standardPadding,
  standardHeight,
  className,
}: CardFooterProps) => {
  const footerClasses = cx(
    styles.footer,
    {
      [styles.flex]: flex,
      [styles.solidTopBorder]: border === 'solid',
      [styles.dashedTopBorder]: border === 'dashed',
      [styles.transparentTopBorder]: border === 'none',
      [styles.leftAlign]: align === 'left',
      [styles.centerAlign]: align === 'center',
      [styles.rightAlign]: align === 'right',
      [styles.standardPadding]: standardPadding,
      [styles.standardHeight]: standardHeight,
    },
    className
  );

  return <div className={footerClasses}>{children}</div>;
};

CardFooter.defaultProps = defaultProps;
