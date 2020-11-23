import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import React from 'react';

import { VisualTheme } from '../theming/VisualTheme';
import { ButtonProps } from './shared';
import { buttonOutlineStyles } from './styles';

const StyledButtonOutline = styled('button', {
  shouldForwardProp: (prop: string) => isPropValid(prop) && prop !== 'mode',
})<ButtonProps>(({ mode = VisualTheme.LightMode }) => {
  return buttonOutlineStyles({ mode });
});

const linkTag = 'a';
const buttonTag = 'button';

type ButtonOutlineProps = React.ComponentProps<typeof StyledButtonOutline>;

export const ButtonOutline: React.FC<ButtonOutlineProps> = ({
  as = buttonTag,
  disabled,
  ...props
}) => {
  const buttonProps: Partial<ButtonOutlineProps> = {
    as,
  };
  // Switch to an anchor tag if href is defined and the default component is unchanged
  if (buttonProps.as === buttonTag && props.href) {
    buttonProps.as = linkTag;
  }

  // Sensible defaults based on element tagName
  if (buttonProps.as === buttonTag) {
    buttonProps.type = props.type ?? 'button';
    buttonProps.disabled = disabled;
  } else {
    if (buttonProps.as !== linkTag || !props.href) {
      buttonProps.role = props.role ?? 'button';
    }
    buttonProps['aria-disabled'] = disabled;
  }

  return <StyledButtonOutline {...props} {...buttonProps} />;
};
