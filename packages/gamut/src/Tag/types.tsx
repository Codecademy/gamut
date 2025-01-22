import { StyleProps } from '@codecademy/variance';
import { ComponentProps } from 'react';

import { WithChildrenProp } from '../utils';
import { DismissButton, tagProps } from './elements';
import { colorVariants, sizeVariants, tagWrapperStates } from './styles';

export interface BaseTagProps
  extends StyleProps<typeof tagProps>,
    StyleProps<typeof colorVariants>,
    StyleProps<typeof sizeVariants>,
    StyleProps<typeof tagWrapperStates>,
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
