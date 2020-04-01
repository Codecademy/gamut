import React from 'react';
import s from './styles.module.scss';
import cx from 'classnames';
import { VisualTheme } from '@codecademy/gamut';
import orangeQuotes from './assets/orangeQuotes.svg';
import purpleQuotes from './assets/purpleQuotes.svg';

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
      theme === VisualTheme.DarkMode ? s.darkContainer : s.lightContainer
    )}
  >
    <img
      src={theme === VisualTheme.DarkMode ? purpleQuotes : orangeQuotes}
      alt=""
      className={cx(s.icon, classNames.icon)}
    />
    <q className={cx(s.text, classNames.text)}>{text}</q>
  </div>
);

export default Quote;
