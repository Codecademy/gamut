import {
  css,
  states,
  theme as GamutTheme,
  variant,
} from '@codecademy/gamut-styles';
import { StylesConfig } from 'react-select';

import {
  dismissSharedStyles,
  tagBaseStyles,
  tagLabelFontSize,
  tagLabelPadding,
} from '../../Tag/styles';
import {
  formBaseComponentStyles,
  formBaseFieldStylesObject,
  formFieldDisabledStyles,
  formFieldPaddingStyles,
  InputSelectors,
} from '../styles';
import { ControlState, OptionState } from './types';
import { BaseSelectComponentProps } from './types/styles';

const selectDropdownStyles =
  css({
    ...formBaseFieldStylesObject,
    display: 'flex',
    zIndex: 3,
  });

const selectFocusStyles = {
  color: 'primary',
  borderColor: 'currentColor',
  boxShadow: `inset 0 0 0 1px currentColor`,
} as const;

export const conditionalBorderStates = states({
  isFocused: selectFocusStyles,
  activated: { borderColor: 'currentColor' },
  error: {
    color: 'feedback-error',
    borderColor: 'currentColor',
    [InputSelectors.HOVER]: {
      borderColor: 'currentColor',
    },
  },
  isDisabled: formFieldDisabledStyles,
});

const sizeVariants = variant({
  prop: 'size',
  defaultVariant: 'medium',
  variants: {
    medium: formFieldPaddingStyles,
    mediumIsMultiSelected: { px: 8, py: 8 },
    small: { minHeight: '2rem', px: 8, py: 0 },
  },
});

const dropdownBorderStates = states({
  error: { borderColorTop: 'feedback-error' },
});

const dropdownBorderStyles = (zIndex: number = 2) => css({
  ...formBaseComponentStyles,
  border: 1,
  borderColor: 'currentColor',
  position: 'absolute',
  marginTop: 0,
  borderRadius: 'none',
  zIndex,
});

const getOptionBackground = (isSelected: boolean, isFocused: boolean) =>
  css({
    bg: isFocused
      ? 'background-hover'
      : isSelected
      ? 'background-selected'
      : 'transparent',
  });

const textColor = css({
  color: 'text',
});

const placeholderColor = css({
  color: 'text-disabled',
});

export const getMemoizedStyles = (
  theme: typeof GamutTheme,
  zIndex?: number,
): StylesConfig<any, false> => {
  return {
    clearIndicator: (provided) => ({
      ...provided,
    }),
    container: (provided, state: BaseSelectComponentProps) => {
      const { inputWidth } = state.selectProps;
      return {
        ...provided,
        pointerEvents: 'visible',
        cursor: state.selectProps.isSearchable ? 'text' : 'pointer',
        width: inputWidth || '100%',
        minWidth: '7rem',
      };
    },
    control: (provided, state: ControlState) => {
      const { isMulti, size } = state.selectProps;
      const getSize = size ?? 'medium';
      const getPadding =
        isMulti && state.hasValue && size !== 'small'
          ? `mediumIsMultiSelected`
          : getSize;

      return {
        ...selectDropdownStyles({ theme }),
        ...sizeVariants({ size: getPadding, theme }),
        ...conditionalBorderStates({
          isFocused: state.isFocused,
          isDisabled: state.isDisabled,
          error: state.selectProps.error,
          activated: state.selectProps.activated,
          theme,
        }),
      };
    },
    dropdownIndicator: () => ({
      color: 'currentColor',
      display: 'flex',
      padding: '0',
      pointerEvents: 'none',
    }),
    groupHeading: (provided) => ({
      ...provided,
      color: theme.colors['text-disabled'],
    }),
    input: (provided) => ({
      ...provided,
      ...textColor({ theme }),
      padding: '0',
      margin: '0',
    }),
    menu: (provided, state: BaseSelectComponentProps) => {
      const { dropdownWidth, menuAlignment } = state.selectProps;

      return {
        ...provided,
        ...dropdownBorderStyles(zIndex)({ theme }),
        ...dropdownBorderStates({ error: state.selectProps.error, theme }),
        ...(dropdownWidth
          ? {
              width: dropdownWidth,
              minWidth: dropdownWidth,
            }
          : {}),
        ...(menuAlignment === 'right'
          ? {
              left: 'auto',
              right: 0,
            }
          : {}),
      };
    },
    menuList: (provided, state: BaseSelectComponentProps) => {
      const sizeInteger = state.selectProps.size === 'small' ? 2 : 3;
      const maxHeight = `${
        (state.selectProps.shownOptionsLimit ?? 6) * sizeInteger
      }rem`;
      return {
        ...provided,
        maxHeight,
      };
    },
    multiValue: (provided, state) => ({
      ...provided,
      ...tagBaseStyles,
      height: '24px',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      color: theme.colors.background,
      backgroundColor: 'transparent',
      borderRadius: theme.borderRadii.md,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: theme.colors.background,
      backgroundColor: theme.colors['text-secondary'],
      borderRadius: `${theme.borderRadii.md} 0 0 ${theme.borderRadii.md}`,
      fontSize: `${tagLabelFontSize}px`,
      height: '100%',
      padding: `0 ${tagLabelPadding}px`,
      paddingLeft: `${tagLabelPadding}px`, // default label has an explicit rule for padding left so we need this to override it
      paddingTop: '2px', // adding to shift the text down to vertically center it
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      ...dismissSharedStyles,
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      pointerEvents: state.isDisabled ? 'none' : 'visible',
      backgroundColor: theme.colors['text-secondary'],
      borderRadius: `0 ${theme.borderRadii.md} ${theme.borderRadii.md} 0`,
      padding: 0, // default remove has padding left and right that we don't need
      ':hover': {
        backgroundColor: theme.colors['secondary-hover'],
      },
    }),
    option: (provided, state: OptionState) => ({
      padding: state.selectProps.size === 'small' ? '3px 14px' : '11px 14px',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      ...getOptionBackground(state.isSelected, state.isFocused)({ theme }),
      display: 'flex',
      alignItems: 'center',
      color: state.isDisabled ? 'text-disabled' : 'default',
    }),
    placeholder: (provided) => ({
      ...provided,
      ...placeholderColor({ theme }),
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
    singleValue: (provided) => ({
      ...provided,
      ...textColor({ theme }),
      display: 'flex',
      alignItems: 'center',
      marginLeft: 0,
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
  };
};
