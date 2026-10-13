import { system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import { ComponentProps, HTMLProps } from 'react';

import { DataAttributes, IconComponentType, WithChildrenProp } from '../utils';
import { DismissButton, TagAnchor } from './elements';
import {
  anchorSizeVariants,
  anchorVariants,
  dismissButtonLargeStyling,
  dismissButtonStyling,
  tagUsageVariants,
  tagWrapperStates,
  textSizeVariants,
} from './styles';

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
  /**
   * Not applicable to the `readOnly` variant, which has no interactive element.
   */
  buttonProps?: never;
  /**
   * Not applicable to the `readOnly` variant, which has no interactive element.
   */
  dismissButtonProps?: never;
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
  /**
   * Only applicable to the `navigation` and `suggestion` variants, which render the interactive content as a `TagAnchor`.
   */
  buttonProps?: never;
  /**
   * Props forwarded to the `selection` variant's dismiss button, the interactive element users actually click, e.g. for `data-*`/`aria-*` attributes that need to land there rather than on the Tag's root.
   */
  dismissButtonProps?: DismissButtonPassthroughProps;
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
  /**
   * Props forwarded to the `navigation` variant's anchor, the interactive element users actually click, e.g. for `data-*`/`aria-*` attributes that need to land there rather than on the Tag's root.
   */
  buttonProps?: TagAnchorPassthroughProps;
  /**
   * Only applicable to the `selection` variant, which renders a dismiss button.
   */
  dismissButtonProps?: never;
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
  /**
   * Props forwarded to the `suggestion` variant's anchor, the interactive element users actually click, e.g. for `data-*`/`aria-*` attributes that need to land there rather than on the Tag's root.
   */
  buttonProps?: TagAnchorPassthroughProps;
  /**
   * Only applicable to the `selection` variant, which renders a dismiss button.
   */
  dismissButtonProps?: never;
}

export type TagProps =
  | ReadOnlyTagProps
  | SelectionTagProps
  | NavigationTagProps
  | SuggestionTagProps;

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

export type TagAnchorProps = SuggestionAnchorProps | NavigationAnchorProps;

/*
 * `TagAnchorProps` is a discriminated union whose branches carry required
 * fields (`interactiveType`, and either `href` or `onClick`) that Tag
 * computes internally, so a `buttonProps` value can never supply them. Those
 * keys are omitted here so an attributes-only object - the actual use case
 * for this slot - satisfies the type, while `data-*`/`aria-*` and the
 * remaining style props still get real autocomplete.
 */
export type TagAnchorPassthroughProps = Omit<
  ComponentProps<typeof TagAnchor>,
  'interactiveType' | 'href' | 'onClick'
> &
  DataAttributes;

export interface BaseTagTextProps extends StyleProps<typeof textSizeVariants> {
  onClick?: never;
  href?: never;
}

export interface TagTextReadOnlyProps extends BaseTagTextProps {
  disabled?: never;
}

export interface TagTextSelectionProps extends BaseTagTextProps {
  disabled?: boolean;
}

export type TagTextProps = TagTextReadOnlyProps | TagTextSelectionProps;

export interface DismissButtonProps
  extends StyleProps<typeof dismissButtonStyling>,
    StyleProps<typeof dismissButtonLargeStyling> {}

/*
 * `DismissButton` is an `IconButton`, whose props require `tip` and `icon` -
 * both of which, along with `onClick`, Tag computes internally. Those keys
 * are omitted here for the same reason they're omitted from
 * `TagAnchorPassthroughProps` above: so an attributes-only object satisfies
 * the type.
 */
export type DismissButtonPassthroughProps = Omit<
  ComponentProps<typeof DismissButton>,
  'tip' | 'icon' | 'onClick'
> &
  DataAttributes;
