import { forwardRef } from 'react';

import type { ButtonBaseElements } from '../../ButtonBase/ButtonBase';
import { appendIconToContent } from '../../helpers';
import type { FillButtonProps } from '../FillButton';
import type { StrokeButtonProps } from '../StrokeButton';
import type { TextButtonProps } from '../TextButton';

type InlineIconButtonProps =
  | FillButtonProps
  | StrokeButtonProps
  | TextButtonProps;

type InlineIconButtonType = InlineIconButtonProps & {
  button: React.ComponentType<InlineIconButtonProps>;
  iconSize?: number;
};

export const InlineIconButton = forwardRef<
  ButtonBaseElements,
  InlineIconButtonType
>(
  (
    {
      children,
      button: Button,
      icon,
      iconPosition = 'left',
      variant,
      ...props
    },
    ref
  ) => {
    const content = appendIconToContent({
      iconPosition,
      icon,
      iconSize: props.size === 'small' ? 12 : 16,
      children,
    });
    const ButtonWithRef = Button as React.ForwardRefExoticComponent<
      InlineIconButtonProps & React.RefAttributes<ButtonBaseElements>
    >;
    return (
      <ButtonWithRef {...props} ref={ref} variant={variant}>
        {content}
      </ButtonWithRef>
    );
  }
);
