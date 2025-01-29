import { system } from '@codecademy/gamut-styles';
import { StyleProps , variance } from '@codecademy/variance';
import { ComponentProps, HTMLProps } from 'react';

import { IconComponentType, WithChildrenProp } from '../utils';
import { DismissButton } from './elements';
import { anchorSizeVariants, anchorVariants, tagUsageVariants, tagWrapperStates,textSizeVariants } from './styles';

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
   * ClickHandler for the DismissButton.
   */
  onDismiss?: never;
  onClick?: never;
  href?: never;
  variant: 'readOnly';
  disabled?: never;
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
    StyleProps<typeof anchorSizeVariants> {
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
  extends StyleProps<typeof textSizeVariants> {}
