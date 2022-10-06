import { StyleProps } from '@codecademy/variance';

import { GenericChildrenType } from '..';
import { ButtonProps } from '../Button';
import { colorVariants, tagProps } from './elements';

export interface BaseTagProps
  extends StyleProps<typeof tagProps>,
    StyleProps<typeof colorVariants>,
    GenericChildrenType {}
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
  onDismiss: ButtonProps['onClick'];
}

export type TagProps = ReadOnlyTagProps | DismissableTagProps;
