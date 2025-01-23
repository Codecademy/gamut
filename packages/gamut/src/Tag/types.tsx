import { system } from '@codecademy/gamut-styles';
import { StyleProps , variance } from '@codecademy/variance';
import { ComponentProps } from 'react';

import { IconComponentType, WithChildrenProp } from '../utils';
import { DismissButton } from './elements';
import { anchorVariants, sizeVariants, tagUsageVariants,tagWrapperStates } from './styles';

export const tagProps = variance.compose(
  system.space,
  system.layout,
  system.typography
);

export interface BaseTagProps
  extends StyleProps<typeof tagProps>,
    StyleProps<typeof tagUsageVariants>,
    StyleProps<typeof sizeVariants>,
    StyleProps<typeof tagWrapperStates>,
    Partial<IconComponentType>,
    WithChildrenProp {}
    //  KENNY: will need AppendIconProps here

//  KENNY:  Would I need a discriminated union here?
// need to remove readonly here and add in onClick and href
export interface ReadOnlyTagProps extends BaseTagProps {
  /**
   * If the DismissButton should be shown.
   */
  readonly: true;
  /**
   * ClickHandler for the DismissButton.
   */
  disabled?: never;
  onDismiss?: never;
  onClick?: never;
  href?: never;
}
export interface DismissableTagProps extends BaseTagProps {
  /**
   * If the DismissButton should be shown.
   */
  readonly?: false;
  /**
   * ClickHandler for the DismissButton.
   */
  onDismiss: ComponentProps<typeof DismissButton>['onClick'];
  onClick?: never;
  href?: never;
  disabled: boolean;
}

export type TagProps = ReadOnlyTagProps | DismissableTagProps;

export interface TagAnchorProps
  extends StyleProps<typeof anchorVariants>,
    StyleProps<typeof sizeVariants> {}

export interface TagTextProps
  extends StyleProps<typeof sizeVariants> {}
