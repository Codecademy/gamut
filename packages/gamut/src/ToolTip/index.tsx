import React, { ReactNode } from 'react';
import cx from 'classnames';
import { CardBody } from '../Card';
import { VisualTheme } from '../theming/VisualTheme';
import s from './styles.module.scss';

export enum ToolTipPosition {
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  TopLeft = 'top-left',
  TopRight = 'top-right',
}

export type ToolTipProps = {
  children?: ReactNode;

  /**
   * Whether to manually add a tabIndex of 0, such as for tooltips containing actual buttons.
   */
  focusable?: boolean;
  id: string;
  position?: ToolTipPosition;
  target?: ReactNode;
  theme?: VisualTheme;
  tipClassName?: string;
  wrapperClassName?: string;
};

export const ToolTip: React.FC<ToolTipProps> = ({
  children,
  focusable,
  id,
  position = ToolTipPosition.TopRight,
  target,
  theme = VisualTheme.LightMode,
  tipClassName,
  wrapperClassName,
}) => {
  return (
    <div className={cx(s.toolTipWrapper, wrapperClassName)}>
      <div
        aria-labelledby={id}
        className={s.targetContainer}
        // ToolTips sometimes contain actual <button>s, which cannot be a child of a button.
        // This element still needs tab focus so we must use the `tabIndex=0` hack. Sigh.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={focusable ? 0 : undefined}
      >
        {target}
      </div>
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
