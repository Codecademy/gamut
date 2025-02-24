import { forwardRef } from 'react';

import { ButtonBaseElements } from '../../ButtonBase/ButtonBase';
import { appendIconToContent } from '../../helpers';
import { FillButtonProps } from '../FillButton';
import { StrokeButtonProps } from '../StrokeButton';
import { TextButtonProps } from '../TextButton';

type InlineIconButtonComponents =
  | FillButtonProps
  | StrokeButtonProps
  | TextButtonProps;

type InlineIconButtonType = InlineIconButtonComponents & {
  button: React.ComponentType<InlineIconButtonComponents>;
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
      iconSize: 16,
      children,
    });
    return (
      <Button {...props} variant={variant} ref={ref}>
        {content}
      </Button>
    );
  }
);
