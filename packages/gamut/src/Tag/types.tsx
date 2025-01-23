import { system } from '@codecademy/gamut-styles';
import { StyleProps , variance } from '@codecademy/variance';
import { ComponentProps, HTMLProps } from 'react';

import { IconComponentType, WithChildrenProp } from '../utils';
import { DismissButton } from './elements';
import { anchorVariants, sizeVariants, tagUsageVariants, tagWrapperStates } from './styles';

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

export interface ReadOnlyTagProps extends BaseTagProps {
  /**
   * ClickHandler for the DismissButton.
   */
  disabled?: never;
  onDismiss?: never;
  onClick?: never;
  href?: never;
  variant: 'readOnly';
}
export interface SelectionTagProps extends BaseTagProps {
  /**
   * ClickHandler for the DismissButton.
   */
  onDismiss: ComponentProps<typeof DismissButton>['onClick'];
  onClick?: never;
  href?: never;
  disabled: boolean;
  variant: 'selection';
}

export interface InteractiveTagProps extends BaseTagProps {
  onDismiss?: never;
  href?: string;
  onClick?: HTMLProps<HTMLAnchorElement>['onClick'];
  disabled: boolean;
  interactiveType: 'suggestion' | 'navigation';
}

export type TagProps = ReadOnlyTagProps | SelectionTagProps | InteractiveTagProps

export interface BaseTagAnchorProps
  extends StyleProps<typeof anchorVariants>,
    StyleProps<typeof sizeVariants> {
      disabled: boolean;
    }

export interface NavigationAnchorProps extends BaseTagAnchorProps {
  onClick?: never;
  href: string;
}


export interface SuggestionAnchorProps extends BaseTagAnchorProps {
  onClick: HTMLProps<HTMLAnchorElement>['onClick'];
  href?: never;
}

export type TagAnchorProps = SuggestionAnchorProps | NavigationAnchorProps

export interface TagTextProps
  extends StyleProps<typeof sizeVariants> {}

  // export interface BaseTagTextProps
//   extends StyleProps<typeof sizeVariants> {}

// export interface ReadOnlyTagPropsV2 extends BaseTagTextProps {
//   disabled?: never;
// }

// export interface SuggestionPropsV2 extends BaseTagTextProps {
//   disabled: boolean;
// }


// export type TagTextProps = ReadOnlyTagPropsV2 | SuggestionPropsV2
