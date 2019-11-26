import React, { ReactNode } from 'react';
import cx from 'classnames';
import { CardBody } from '../Card';
import { VisualTheme } from '../theming/VisualTheme';
import s from './styles.scss';

export enum ToolTipPosition {
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  TopLeft = 'top-left',
  TopRight = 'top-right',
}

export type ToolTipProps = {
  children?: ReactNode;
  id: string;
  position?: ToolTipPosition;
  target?: ReactNode;
  theme?: VisualTheme;
  tipClassName?: string;
  wrapperClassName?: string;
};

export const ToolTip: React.FC<ToolTipProps> = ({
  children,
  id,
  position = ToolTipPosition.TopRight,
  target,
  theme = VisualTheme.LightMode,
  tipClassName,
  wrapperClassName,
}) => {
  return (
    <div className={cx(s.toolTipWrapper, wrapperClassName)}>
      <button aria-labelledby={id} type="button" className={s.targetContainer}>
        {target}
      </button>
      <div
        className={cx(
          s.toolTipContainer,
          s[position],
          theme === VisualTheme.DarkMode
            ? s.toolTipContainerDark
            : s.toolTipContainerLight,
          tipClassName
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
