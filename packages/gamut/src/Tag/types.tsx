import { system } from '@codecademy/gamut-styles';
import { StyleProps , variance } from '@codecademy/variance';
import { ComponentProps, HTMLProps } from 'react';

import { IconComponentType, WithChildrenProp } from '../utils';
import { DismissButton } from './elements';
import { anchorSizeVariants, anchorVariants, dismissButtonLargeStyling,dismissButtonStyling, tagUsageVariants, tagWrapperStates,textSizeVariants } from './styles';

export const tagProps = variance.compose(
  system.space,
  system.layout,
  system.typography
);

export interface BaseTagProps
  extends StyleProps<typeof tagProps>,
    StyleProps<typeof tagUsageVariants>,
    StyleProps<typeof textSizeVariants>,
    StyleProps<typeof tagWrapperStates>,
    Partial<IconComponentType>,
    WithChildrenProp {}

export interface ReadOnlyTagProps extends BaseTagProps {
  /**
   * ClickHandler for the DismissButton on Selection tags.
   */
  onDismiss?: never;
  /**
   * ClickHandler for the Navigation and Suggestion tags.
   */
  onClick?: never;
  /**
   * URL for Navigation tags.
   */
  href?: never;
  variant: 'readOnly';
  /**
   * Provides disabled styling for Selection, Navigation, and Suggestion tags.
   */
  disabled?: never;
}
export interface SelectionTagProps extends BaseTagProps {
  /**
   * ClickHandler for the DismissButton on Selection tags.
   */
  onDismiss: ComponentProps<typeof DismissButton>['onClick'];
  /**
   * ClickHandler for the Navigation and Suggestion tags.
   */
  onClick?: never;
  /**
   * URL for Navigation tags.
   */
  href?: never;
  /**
   * Provides disabled styling for Selection, Navigation, and Suggestion tags.
   */
  disabled?: boolean;
  variant: 'selection';
}

export interface NavigationTagProps extends BaseTagProps {
  /**
   * ClickHandler for the DismissButton on Selection tags.
   */
  onDismiss?: never;
  /**
   * URL for Navigation tags.
   */
  href: string;
  /**
   * ClickHandler for the Navigation and Suggestion tags.
   */
  onClick?: HTMLProps<HTMLAnchorElement>['onClick'];
  /**
   * Provides disabled styling for Selection, Navigation, and Suggestion tags.
   */
  disabled?: boolean;
  variant: 'navigation';
}

export interface SuggestionTagProps extends BaseTagProps {
  /**
   * ClickHandler for the DismissButton on Selection tags.
   */
  onDismiss?: never;
  /**
   * URL for Navigation tags.
   */
  href?: never;
  /**
   * ClickHandler for the Navigation and Suggestion tags.
   */
  onClick: HTMLProps<HTMLAnchorElement>['onClick'];
  /**
   * Provides disabled styling for Selection, Navigation, and Suggestion tags.
   */
  disabled?: boolean;
  variant: 'suggestion';
}

export type TagProps = ReadOnlyTagProps | SelectionTagProps | NavigationTagProps | SuggestionTagProps;

export interface BaseTagAnchorProps
  extends StyleProps<typeof anchorVariants>,
    StyleProps<typeof anchorSizeVariants> {
      disabled?: boolean;
    }

export interface NavigationAnchorProps extends BaseTagAnchorProps {
  href: string;
  /**
   * ClickHandler for the Navigation and Suggestion tags.
   */
  onClick?: HTMLProps<HTMLAnchorElement>['onClick'];
}

export interface SuggestionAnchorProps extends BaseTagAnchorProps {
  href?: never;
  /**
   * ClickHandler for the Navigation and Suggestion tags.
   */
  onClick: HTMLProps<HTMLAnchorElement>['onClick'];
}

export type TagAnchorProps = SuggestionAnchorProps | NavigationAnchorProps

export interface BaseTagTextProps
  extends StyleProps<typeof textSizeVariants> {
    onClick?: never;
    href?: never;
  }

export interface TagTextReadOnlyProps extends BaseTagTextProps {
  disabled?: never;
}

export interface TagTextSelectionProps extends BaseTagTextProps {
  disabled?: boolean;
}

export type TagTextProps = TagTextReadOnlyProps | TagTextSelectionProps

export interface DismissButtonProps
  extends StyleProps<typeof dismissButtonStyling>,
  StyleProps<typeof dismissButtonLargeStyling> {}
