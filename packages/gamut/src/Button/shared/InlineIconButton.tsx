import { forwardRef } from 'react';

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

// we can theoretically do this with display: flex + `order` but since our buttons sometimes are styled with different display types, this is a safer way to ensure these are positioned properly
const getButtonContent = ({
  iconPosition,
  icon: Icon,
  children,
}: Pick<InlineIconButtonType, 'iconPosition' | 'icon' | 'children'>) => {
  const iconSpacing = iconPosition === 'left' ? 'mr' : 'ml';
  const iconProps = { 'aria-hidden': true, size: 12, [iconSpacing]: 8 };
  return iconPosition && iconPosition === 'left' ? (
    <>
      {Icon && <Icon {...iconProps} />}
      {children}
    </>
  ) : (
    <>
      {children}
      {Icon && <Icon {...iconProps} />}
    </>
  );
};

export const InlineIconButton = forwardRef<
  ButtonBaseElements,
  InlineIconButtonType
>(
  (
    { children, button: Button, icon, iconPosition, variant, ...props },
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
