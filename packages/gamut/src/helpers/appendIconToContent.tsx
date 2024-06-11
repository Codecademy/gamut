import { Box, FlexBox } from '../Box';
import { IconComponentType, WithChildrenProp } from '../utils';

export interface AppendedIconProps
  extends WithChildrenProp,
    Partial<IconComponentType> {
  iconAndTextGap?: number;
  iconOffset?: number;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  isInlineIcon?: boolean;
}

export const appendIconToContent = ({
  children,
  icon: Icon,
  iconAndTextGap = 8,
  iconOffset = 0,
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

  // const InlineCenteredIcon = <Box display="inline" >{Icon && <Icon {...iconProps} pb={iconOffset as any} verticalAlign="middle" height={iconSize + iconOffset} width={iconSize} />}</Box>
  const InlineCenteredIcon = <Icon {...iconProps} pb={iconOffset as any} verticalAlign="middle" height={iconSize + iconOffset} width={iconSize} />

  const content =
    iconPosition === 'left' ? (
      <>
        {InlineCenteredIcon}
        {children}
      </>
    ) : (
      <>
        {children}
        {InlineCenteredIcon}
      </>
    );

  return isInlineIcon ? (
    <Box display="inline" >{content}</Box>
  ) : (
    <FlexBox center alignItems="center" height="100%">
      {Icon && <Icon {...iconProps} />}
      {children}
    </FlexBox>
  );
};
