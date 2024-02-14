import { forwardRef } from 'react';

import { FlexBox } from '../../Box';
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

const getButtonContent = ({
  iconPosition,
  icon: Icon,
  children,
}: Pick<InlineIconButtonType, 'iconPosition' | 'icon' | 'children'>) => {
  const iconSpacing = iconPosition === 'left' ? 'mr' : 'ml';
  const iconPositioning = iconPosition === 'left' ? 0 : 1;

  const iconProps = {
    'aria-hidden': true,
    size: 12,
    [iconSpacing]: 8,
    order: iconPositioning,
  } as const;

  return !Icon ? (
    <>{children}</>
  ) : (
    <FlexBox center height="100%">
      {Icon && <Icon {...iconProps} />}
      {children}
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
