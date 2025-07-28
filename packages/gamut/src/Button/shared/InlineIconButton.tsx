import { forwardRef } from 'react';

import { ButtonBaseElements } from '../../ButtonBase/ButtonBase';
import { AppendedIconProps, appendIconToContent } from '../../helpers';
import { FillButtonProps } from '../FillButton';
import { StrokeButtonProps } from '../StrokeButton';
import { TextButtonProps } from '../TextButton';

type InlineIconButtonComponents =
  | FillButtonProps
  | StrokeButtonProps
  | TextButtonProps;

type InlineIconButtonType = InlineIconButtonComponents &
  AppendedIconProps & {
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
    const commonIconProps = {
      iconSize: props.size === 'small' ? 12 : 16,
      children,
    };

    const content = appendIconToContent({
      ...commonIconProps,
      icon,
      iconPosition,
    });

    return (
      <Button {...props} ref={ref} variant={variant}>
        {content}
      </Button>
    );
  }
);
