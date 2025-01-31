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
    WithChildrenProp {
      // size: 'default' | 'large';
    }

export interface ReadOnlyTagProps extends BaseTagProps {
  /**
   * ClickHandler for the DismissButton.
   */
  onDismiss?: never;
  onClick?: never;
  href?: never;
  variant: 'readOnly';
  disabled?: never;
  interactiveType?: never;
}
export interface SelectionTagProps extends BaseTagProps {
  /**
   * ClickHandler for the DismissButton.
   */
  onDismiss: ComponentProps<typeof DismissButton>['onClick'];
  onClick?: never;
  href?: never;
  disabled?: boolean;
  variant: 'selection';
  interactiveType?: never;
}

export interface NavigationTagProps extends BaseTagProps {
  onDismiss?: never;
  href: string;
  onClick?: HTMLProps<HTMLAnchorElement>['onClick'];
  disabled?: boolean;
  variant: 'navigation';
}

export interface SuggestionTagProps extends BaseTagProps {
  onDismiss?: never;
  href?: never;
  onClick: HTMLProps<HTMLAnchorElement>['onClick'];
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
  onClick?: HTMLProps<HTMLAnchorElement>['onClick'];
}

export interface SuggestionAnchorProps extends BaseTagAnchorProps {
  href?: never;
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
