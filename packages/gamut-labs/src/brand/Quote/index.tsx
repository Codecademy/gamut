import React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import { VisualTheme } from '@codecademy/gamut';
import orangeQuotes from '../assets/orangeQuotes.svg';
import purpleQuotes from '../assets/purpleQuotes.svg';

type QuoteProps = {
  text: string;
  theme?: VisualTheme;
  classNames?: { text?: string; icon?: string };
};

export const Quote: React.FC<QuoteProps> = ({
  text,
  theme = VisualTheme.LightMode,
  classNames = {},
}) => (
  <div
    className={cx(
      theme === VisualTheme.DarkMode
        ? styles.darkContainer
        : styles.lightContainer
    )}
  >
    <img
      src={theme === VisualTheme.DarkMode ? purpleQuotes : orangeQuotes}
      alt=""
      className={cx(styles.icon, classNames.icon)}
    />
    <q className={cx(styles.text, classNames.text)}>{text}</q>
  </div>
);
