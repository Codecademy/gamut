import React, { ReactNode } from 'react';
import cx from 'classnames';
import { CardBody } from '../Card';
import { VisualTheme } from '../theming/VisualTheme';
import s from './styles.scss';

export enum TooltipPosition {
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  TopLeft = 'top-left',
  TopRight = 'top-right',
}

export type ToolTipProps = {
  children?: ReactNode;
  className?: string;
  id: string;
  position?: TooltipPosition;
  target?: ReactNode;
  theme?: VisualTheme;
};

export const ToolTip: React.FC<ToolTipProps> = ({
  children,
  className,
  target,
  position = TooltipPosition.TopRight,
  id,
  theme = VisualTheme.LightMode,
}) => {
  return (
    <div className={cx(s.toolTipWrapper, className)}>
      <button aria-labelledby={id} type="button" className={s.targetContainer}>
        {target}
      </button>
      <div
        className={cx(
          s.toolTipContainer,
          s[position],
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
