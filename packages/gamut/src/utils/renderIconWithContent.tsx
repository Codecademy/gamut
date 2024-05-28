import { Box, FlexBox } from "../Box";
import { IconComponentType, WithChildrenProp } from "../utils";

export interface InlineIconProps
  extends WithChildrenProp,
    IconComponentType {
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  iconAndTextGap?: number;
  center: boolean
}

export const renderIconWithContent = ({
  iconPosition,
  icon: Icon,
  children,
  iconSize = 12,
  iconAndTextGap = 8,
  center = false
}: InlineIconProps) => {
  const iconSpacing = iconPosition === 'left' ? 'mr' : 'ml';
  const iconPositioning = iconPosition === 'left' ? 0 : 1;

  const iconProps = {
    'aria-hidden': true,
    iconSize,
    [iconSpacing]: iconAndTextGap,
    order: iconPositioning,
  } as const;

  return !Icon ? (
    <>{children}</>
  ) : (
    <FlexBox center={center} alignItems="center" height="100%">
      {Icon && <Icon {...iconProps} />}
      {children}
    </FlexBox>
  );
};

// export const renderInlineIconWithContent = ({
//   iconPosition,
//   icon: Icon,
//   children,
//   iconSize = 12,
//   iconAndTextGap = 8,
//   center = false
// }: InlineIconProps
// }) => {
//   return !Icon ? (
//     <>{children}</>
//   ) : (
//     <Box >
//       {Icon && <Icon {...iconProps} />}
//       {children}
//     </Box>
//   );
// }
