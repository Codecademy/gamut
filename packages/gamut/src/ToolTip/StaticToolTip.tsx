import {
  ColorModes,
  fontSmoothPixel,
  lineHeight,
  pxRem,
  theme,
  timing,
  variant,
} from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { ToolTipProps } from '.';
import {
  TargetContainer,
  ToolTipBody,
  ToolTipContainer,
  TooltipWrapper,
} from './elements';

export const StaticToolTip: React.FC<ToolTipProps> = ({
  alignment = 'top-right',
  children,
  className,
  containerClassName,
  focusable,
  id,
  mode = 'light',
  widthMode = 'standard',
  target,
}) => {
  return (
    <TooltipWrapper className={containerClassName}>
      <TargetContainer
        aria-labelledby={id}
        role={focusable ? 'button' : undefined}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            (event.target as HTMLElement).blur();
          }
        }}
        // ToolTips sometimes contain actual <button>s, which cannot be a child of a button.
        // This element still needs tab focus so we must use the `tabIndex=0` hack.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={focusable ? 0 : undefined}
      >
        {target}
      </TargetContainer>
      <ToolTipContainer
        as="div"
        bg={mode === 'light' ? 'white' : 'black'}
        color={mode === 'light' ? 'text' : 'secondary'}
        alignment={alignment}
        className={className}
        id={id}
        role="tooltip"
        aria-live="polite"
      >
        <ToolTipBody alignment={alignment} mode={mode} widthMode={widthMode}>
          {children}
        </ToolTipBody>
      </ToolTipContainer>
    </TooltipWrapper>
  );
};
