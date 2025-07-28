import { GamutIconProps } from '@codecademy/gamut-icons';

import { Box, FlexBox } from '../Box';
import { WithChildrenProp } from '../utils';
import { pixelToEm } from './pixelToEmCalc';

interface BaseAppendedIconProps extends WithChildrenProp {
  /**
   * This provides the space between the icon and the children
   */
  iconAndTextGap?: number;
  /**
   * This value adds a padding to the icon's parent container and bumps up the icon's height by the offset
   */
  iconOffset?: number;
  /**
   * This value determines the size of the icon
   */
  iconSize?: number;
  /**
   * This boolean value determines if the icon should be displayed inline with the children
   */
  isInlineIcon?: boolean;
}
export interface AppendedSingleIconProps extends BaseAppendedIconProps {
  icon?: React.ComponentType<GamutIconProps>;
  /**
   * Can set the positioning of the icon relative to children, default is `left`
   */
  iconPosition?: 'left' | 'right';
}

export interface AppendedMultipleIconsProps extends BaseAppendedIconProps {
  icon?: [
    React.ComponentType<GamutIconProps>,
    React.ComponentType<GamutIconProps>
  ];
  iconPosition?: never;
}

export type AppendedIconProps =
  | AppendedSingleIconProps
  | AppendedMultipleIconsProps;

// Calculate icon offsets for centering and spacing
const createIconOffsets = (
  iconOffset: number | undefined,
  iconSize: number,
  isInlineIcon: boolean
) => {
  const finalIconOffset = iconOffset ?? (isInlineIcon ? 2 : 4);
  const iconOffsetInEm = pixelToEm(finalIconOffset);
  const heightOffset = pixelToEm(iconSize + finalIconOffset);

  return { iconOffsetInEm, heightOffset };
};

interface RenderStyledIconProps {
  Icon: React.ComponentType<GamutIconProps>;
  spacing: 'mr' | 'ml';
  iconAndTextGap: number;
  iconOffsetInEm: string;
  heightOffset: string;
  iconSize: number;
}

const renderStyledIcon = ({
  Icon,
  spacing,
  iconAndTextGap,
  iconOffsetInEm,
  heightOffset,
  iconSize,
}: RenderStyledIconProps) => (
  <Icon
    aria-hidden
    size={iconSize}
    {...{ [spacing]: iconAndTextGap }}
    height={heightOffset}
    pb={iconOffsetInEm as any}
    verticalAlign="middle"
    width={iconSize}
  />
);

// Create a wrapper to handle inline vs flex layout
const wrapContent = (content: React.ReactNode, isInlineIcon: boolean) =>
  isInlineIcon ? (
    <Box display="inline">{content}</Box>
  ) : (
    <FlexBox center height="100%">
      {content}
    </FlexBox>
  );

export const appendIconToContent = ({
  children,
  icon: Icon,
  iconAndTextGap = 8,
  iconOffset,
  iconPosition,
  iconSize = 12,
  isInlineIcon = false,
}: AppendedSingleIconProps) => {
  if (!Icon) return <>{children}</>;

  const { iconOffsetInEm, heightOffset } = createIconOffsets(
    iconOffset,
    iconSize,
    isInlineIcon
  );

  const iconSpacing = iconPosition === 'left' ? 'mr' : 'ml';

  const styledIcon = renderStyledIcon({
    Icon,
    spacing: iconSpacing,
    iconAndTextGap,
    iconOffsetInEm,
    heightOffset,
    iconSize,
  });

  const content =
    iconPosition === 'left' ? (
      <>
        {styledIcon}
        {children}
      </>
    ) : (
      <>
        {children}
        {styledIcon}
      </>
    );

  return wrapContent(content, isInlineIcon);
};

export const appendMultiIconsToContent = ({
  children,
  icon: Icon,
  iconAndTextGap,
  iconOffset,
  iconSize,
  isInlineIcon = false,
}: AppendedMultipleIconsProps) => {
  if (!Icon) return <>{children}</>;

  const [LeftIcon, RightIcon] = Icon;

  const appendLeftIcon = appendIconToContent({
    children,
    icon: LeftIcon,
    iconAndTextGap,
    iconOffset,
    iconSize,
    isInlineIcon,
    iconPosition: 'left',
  });

  const appendRightIcon = appendIconToContent({
    children: appendLeftIcon,
    icon: RightIcon,
    iconAndTextGap,
    iconOffset,
    iconSize,
    isInlineIcon,
    iconPosition: 'right',
  });

  return appendRightIcon;
};
