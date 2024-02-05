import { forwardRef } from 'react';

import { Box, FlexBox } from '../../Box';
import { ButtonBaseElements } from '../../ButtonBase/ButtonBase';
import { FillButtonProps } from '../FillButton';
import { StrokeButtonProps } from '../StrokeButton';
import { TextButtonProps } from '../TextButton';

type InlineIconButtonComponents =
  | FillButtonProps
  | StrokeButtonProps
  | TextButtonProps;

type InlineIconButtonType = InlineIconButtonComponents & {
  button: React.ComponentType<InlineIconButtonComponents>;
};

const IconBoxProps = { center: true, height: '100%' } as const;

// we can theoretically do this with display: flex + `order` but since our buttons sometimes are styled with different display types, this is a safer way to ensure these are positioned properly
const getButtonContent = ({
  iconPosition,
  icon: Icon,
  children,
}: Pick<InlineIconButtonType, 'iconPosition' | 'icon' | 'children'>) => {
  const iconSpacing = iconPosition === 'left' ? 'mr' : 'ml';
  const iconProps = {
    'aria-hidden': true,
    size: 12,
    [iconSpacing]: 8,
  } as const;
  return !Icon ? (
    <> {children} </>
  ) : iconPosition === 'left' ? (
    <FlexBox {...IconBoxProps}>
      {Icon && <Icon {...iconProps} />}
      {children}
    </FlexBox>
  ) : (
    <FlexBox {...IconBoxProps}>
      {children}
      {Icon && <Icon {...iconProps} />}
    </FlexBox>
  );
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
    const content = getButtonContent({ iconPosition, icon, children });
    return (
      <Button {...props} variant={variant} ref={ref}>
        {content}
      </Button>
    );
  }
);
