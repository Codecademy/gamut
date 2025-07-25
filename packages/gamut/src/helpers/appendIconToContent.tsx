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

// // Helper to check if a value is a valid React component
const isValidComponent = (Component: any) =>
  typeof Component === 'function' ||
  (typeof Component === 'object' && Component !== null);

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

export const appendMultiIconsToContent = ({
  children,
  icon: Icon,
  iconAndTextGap = 8,
  iconOffset,
  iconSize = 12,
  isInlineIcon = false,
}: AppendedMultipleIconsProps) => {
  if (!Icon) return <>{children}</>;
  // console.log('hi');
  const [LeftIcon, RightIcon] = Icon;

  if (typeof iconOffset !== 'number') {
    iconOffset = isInlineIcon ? 2 : 4;
  }

  const iconOffsetInEm = pixelToEm(iconOffset);
  const heightOffset = pixelToEm(iconSize + iconOffset);

  const iconProps = {
    'aria-hidden': true,
    size: iconSize,
  } as const;

  const renderIcon = (Component: any, spacing: 'mr' | 'ml', order: number) =>
    isValidComponent(Component) ? (
      <Component
        {...iconProps}
        {...{ [spacing]: iconAndTextGap }}
        height={heightOffset}
        order={order}
        pb={iconOffsetInEm as any}
        verticalAlign="middle"
        width={iconSize}
      />
    ) : null;

  const content = (
    <>
      {renderIcon(LeftIcon, 'mr', 0)}
      {children}
      {renderIcon(RightIcon, 'ml', 1)}
    </>
  );

  return isInlineIcon ? (
    <Box display="inline">{content}</Box>
  ) : (
    <FlexBox alignItems="center" center height="100%">
      {content}
    </FlexBox>
  );
};
