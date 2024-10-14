import { StyleProps } from '@codecademy/variance';
import { ComponentProps } from 'react';

import { WithChildrenProp } from '..';
import { DismissButton, tagProps } from './elements';
import { colorVariants, tagWrapperStates } from './styles';

export interface BaseTagProps
  extends StyleProps<typeof tagProps>,
    StyleProps<typeof colorVariants>,
    StyleProps<typeof tagWrapperStates>,
    WithChildrenProp {}
export interface ReadOnlyTagProps extends BaseTagProps {
  /**
   * If the DismissButton should be shown.
   */
  readonly: true;
  /**
   * ClickHandler for the DismissButton.
   */
  onDismiss?: never;
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
}

export type TagProps = ReadOnlyTagProps | DismissableTagProps;
