import React from 'react';
import 'katex/dist/katex.css';
import katex from 'katex';
import cx from 'classnames';
import { isString } from 'lodash';
import styles from './styles.module.scss';

export type MathBlockProps = {
  wrap?: boolean;
  language?: string;
  filename?: string;
  className?: string;
  children: string;
};

const getKatex = (children: string) => {
  try {
    return katex.renderToString(children, {
      displayMode: true,
    });
  } catch (error) {
    return error.message;
  }
}

export const MathBlock: React.FC<MathBlockProps> = ({
  children,
  className,
  wrap = true,
}) => {
  if (!isString(children)) {
    throw new Error(`MathBlock needs a text node child; got ${children}`);
  }

  const classes = cx(
    {
      [styles.wrap]: wrap,
    },
    styles.MathBlock,
    className
  );

  const html = getKatex(children);

  return (
    <span className={classes}>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </span>
  );
}
