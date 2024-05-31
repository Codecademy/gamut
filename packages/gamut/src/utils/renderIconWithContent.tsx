import { Box, FlexBox } from '../Box';
import { IconComponentType, WithChildrenProp } from '../utils';

export interface AppendedIconProps extends WithChildrenProp, Partial<IconComponentType> {
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  iconAndTextGap?: number;
  center?: boolean;
  isInlineIcon?: boolean;
}

export const appendIconToContent = ({
  center = false,
  children,
  icon: Icon,
  iconAndTextGap = 8,
  iconPosition,
  iconSize = 12,
  isInlineIcon = false,
}: AppendedIconProps) => {
  if (!Icon) return <>{children}</>;

  const iconSpacing = iconPosition === 'left' ? 'mr' : 'ml';
  const iconPositioning = iconPosition === 'left' ? 0 : 1;

  const iconProps = {
    'aria-hidden': true,
    size: iconSize,
    [iconSpacing]: iconAndTextGap,
    order: iconPositioning,
  } as const;

  const content =
    iconPosition === 'left' ? (
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

  return isInlineIcon ? (
    <Box display="inline">{content}</Box>
  ) : (
    <FlexBox center={center} alignItems="center" height="100%">
      {Icon && <Icon {...iconProps} />}
      {children}
    </FlexBox>
  );
};
