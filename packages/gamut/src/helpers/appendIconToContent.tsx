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
  /**
   * If there are multiple icons, this prop should be an array of two icon components.
   */
  icon?: [
    React.ComponentType<GamutIconProps>,
    React.ComponentType<GamutIconProps>
  ];
  /**
   * This prop is not needed when there are multiple icons since both icons should be rendered on each side.
   */
  iconPosition?: never;
}

export type AppendedIconProps =
  | AppendedSingleIconProps
  | AppendedMultipleIconsProps;

interface RenderStyledIconProps
  extends Pick<
    BaseRenderProps,
    'iconAndTextGap' | 'iconSize' | 'iconOffsetInEm' | 'heightOffset'
  > {
  icon: React.ComponentType<GamutIconProps>;
  spacing: 'mr' | 'ml';
  isInlineIcon: boolean;
}

interface BaseRenderProps {
  children: React.ReactNode;
  iconAndTextGap: number;
  iconOffsetInEm: string;
  heightOffset: string;
  iconSize: number;
  isInlineIcon: boolean;
}

interface RenderSingleIconProps extends BaseRenderProps {
  icon: Required<AppendedSingleIconProps>['icon'];
  iconPosition?: 'left' | 'right';
}
interface RenderMultipleIconsProps extends BaseRenderProps {
  icon: Required<AppendedMultipleIconsProps>['icon'];
}

const renderStyledIcon = ({
  icon: Icon,
  spacing,
  iconAndTextGap,
  iconOffsetInEm,
  heightOffset,
  iconSize,
  isInlineIcon,
}: RenderStyledIconProps) => {
  const baseIconProps = {
    'aria-hidden': true,
    size: iconSize,
    [spacing]: iconAndTextGap,
  } as const;

  if (isInlineIcon) {
    return (
      <Icon
        {...baseIconProps}
        height={heightOffset}
        pb={iconOffsetInEm as any}
        verticalAlign="middle"
        width={iconSize}
      />
    );
  }

  return <Icon {...baseIconProps} />;
};

const wrapContent = (content: React.ReactNode, isInlineIcon: boolean) =>
  isInlineIcon ? (
    <Box display="inline">{content}</Box>
  ) : (
    <FlexBox center height="100%">
      {content}
    </FlexBox>
  );

const appendSingleIcon = ({
  icon: Icon,
  children,
  iconAndTextGap,
  iconOffsetInEm,
  heightOffset,
  iconSize,
  isInlineIcon,
  iconPosition = 'left',
}: RenderSingleIconProps) => {
  const iconSpacing = iconPosition === 'left' ? 'mr' : 'ml';

  const styledIcon = renderStyledIcon({
    icon: Icon,
    spacing: iconSpacing,
    iconAndTextGap,
    iconOffsetInEm,
    heightOffset,
    iconSize,
    isInlineIcon,
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

const appendMultipleIcons = ({
  icon: Icon,
  children,
  iconAndTextGap,
  iconOffsetInEm,
  heightOffset,
  iconSize,
  isInlineIcon,
}: RenderMultipleIconsProps) => {
  const [LeftIcon, RightIcon] = Icon;

  const leftIcon = renderStyledIcon({
    icon: LeftIcon,
    spacing: 'mr',
    iconAndTextGap,
    iconOffsetInEm,
    heightOffset,
    iconSize,
    isInlineIcon,
  });

  const rightIcon = renderStyledIcon({
    icon: RightIcon,
    spacing: 'ml',
    iconAndTextGap,
    iconOffsetInEm,
    heightOffset,
    iconSize,
    isInlineIcon,
  });

  const content = (
    <>
      {leftIcon}
      {children}
      {rightIcon}
    </>
  );
  return wrapContent(content, isInlineIcon);
};

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

  const finalIconOffset = iconOffset ?? (isInlineIcon ? 2 : 4);
  const iconOffsetInEm = pixelToEm(finalIconOffset);
  const heightOffset = pixelToEm(iconSize + finalIconOffset);

  if (Array.isArray(Icon)) {
    return appendMultipleIcons({
      children,
      heightOffset,
      icon: Icon,
      iconAndTextGap,
      iconOffsetInEm,
      iconSize,
      isInlineIcon,
    });
  }

  return appendSingleIcon({
    children,
    heightOffset,
    icon: Icon,
    iconAndTextGap,
    iconOffsetInEm,
    iconPosition,
    iconSize,
    isInlineIcon,
  });
};
