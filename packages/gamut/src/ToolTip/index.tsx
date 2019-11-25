import React, { ReactNode } from 'react';
import cx from 'classnames';
import { CardBody } from '../Card';
import { VisualTheme } from '../theming/VisualTheme';
import s from './styles.scss';

export type ToolTipProps = {
  target?: ReactNode;
  children?: ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  tipClassName?: string;
  theme?: VisualTheme;
  id: string;
};

export const ToolTip: React.FC<ToolTipProps> = ({
  children,
  target,
  position = 'top-right',
  id,
  theme = VisualTheme.LightMode,
  tipClassName,
}) => {
  return (
    <div className={cx(s.toolTipWrapper)}>
      <button aria-labelledby={id} type="button" className={s.targetContainer}>
        {target}
      </button>
      <div
        className={cx(
          s.toolTipContainer,
          s[position],
          tipClassName,
          theme === VisualTheme.DarkMode
            ? s.toolTipContainerDark
            : s.toolTipContainerLight
        )}
        role="tooltip"
        id={id}
      >
        <CardBody className={s.toolTipBody}>{children}</CardBody>
      </div>
    </div>
  );
};

export default ToolTip;
