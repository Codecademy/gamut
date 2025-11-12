import { Box, FlexBox } from '../Box';
import { IconComponentType, WithChildrenProp } from '../utils';
import { pixelToEm } from './pixelToEmCalc';

export interface AppendedIconProps
  extends WithChildrenProp,
    Partial<IconComponentType> {
  /**
   * This provides the space between the icon and the children
   */
  iconAndTextGap?: number;
  /**
   * This value adds a padding to the icon's parent container and bumps up the icon's height by the offset
   */
  iconOffset?: number;
  /**
   * Can set the positioning of the icon relative to children, default is `left`
   */
  iconPosition?: 'left' | 'right';
  /**
   * This value determines the size of the icon
   */
  iconSize?: number;
  /**
   * This boolean value determines if the icon should be displayed inline with the children
   */
  isInlineIcon?: boolean;
}

export const appendIconToContent = ({
  children,
  icon: Icon,
  iconAndTextGap = 8,
  iconOffset,
  iconPosition,
  iconSize = 12,
  isInlineIcon = false,
}: AppendedIconProps) => {
  if (!Icon) return <>{children}</>;

  const iconSpacing = iconPosition === 'left' ? 'mr' : 'ml';
  const iconPositioning = iconPosition === 'left' ? 0 : 1;

  if (typeof iconOffset !== 'number') {
    iconOffset = isInlineIcon ? 2 : 4;
  }

  const iconOffsetInEm = pixelToEm(iconOffset);
  const heightOffset = pixelToEm(iconSize + iconOffset);

  const iconProps = {
    'aria-hidden': true,
    size: iconSize,
    [iconSpacing]: iconAndTextGap,
    order: iconPositioning,
  } as const;

  const InlineCenteredIcon = (
    <Icon
      {...iconProps}
      height={heightOffset}
      pb={iconOffsetInEm as any}
      verticalAlign="middle"
      width={iconSize}
    />
  );

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
    <Box display="inline">{content}</Box>
  ) : (
    <FlexBox alignItems="center" center height="100%">
      {Icon && <Icon {...iconProps} />}
      {children}
    </FlexBox>
  );
};
