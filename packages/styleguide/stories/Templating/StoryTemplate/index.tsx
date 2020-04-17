import { VisualTheme } from '@codecademy/gamut/src';
import { select } from '@storybook/addon-knobs';
import cx from 'classnames';
import React from 'react';

import { StoryStatus } from '../StoryStatus';
import StoryStatusIndicator from '../StoryStatusIndicator';
import styles from './styles.module.scss';

export type StoryTemplateProps = {
  children?: React.ReactNode | ((theme: VisualTheme) => React.ReactNode);
  status: StoryStatus;
  theme?: VisualTheme;
  wide?: boolean;
};

export const StoryTemplate: React.FC<StoryTemplateProps> = ({
  children,
  status,
  theme = select(
    'Visual Theme',
    { Light: VisualTheme.LightMode, Dark: VisualTheme.DarkMode },
    VisualTheme.LightMode
  ),
  wide,
}) => {
  return (
    <div
      className={cx(
        styles.template,
        theme === VisualTheme.DarkMode && styles.templateDark,
        wide && styles.templateWide
      )}
    >
      <StoryStatusIndicator status={status} />
      {children instanceof Function ? children(theme) : children}
      <div className={styles.divider} />
    </div>
  );
};
