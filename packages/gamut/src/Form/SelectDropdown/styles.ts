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
  tagBorderRadius,
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

const selectDropdownStyles = css({
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
    small: { height: '2rem', px: 8, py: 0 },
  },
});

const dropdownBorderStates = states({
  error: { borderColorTop: 'feedback-error' },
});

const dropdownBorderStyles = css({
  ...formBaseComponentStyles,
  border: 1,
  borderColor: 'currentColor',
  position: 'absolute',
  marginTop: 0,
  borderRadius: 0,
  zIndex: 2,
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
  theme: typeof GamutTheme
): StylesConfig<any, false> => {
  return {
    clearIndicator: (provided) => ({
      ...provided,
    }),
    container: (provided, state) => ({
      ...provided,
      pointerEvents: 'visible',
      cursor: state.selectProps.isSearchable ? 'text' : 'pointer',
      width: '100%',
      minWidth: '7rem',
    }),
    control: (provided, state: any) => {
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
    input: (provided) => ({
      ...provided,
      ...textColor({ theme }),
      padding: '0',
      margin: '0',
    }),
    menu: (provided, state: any) => ({
      ...provided,
      ...dropdownBorderStyles({ theme }),
      ...dropdownBorderStates({ error: state.selectProps.error, theme }),
    }),
    menuList: (provided, state: any) => {
      const sizeInteger = state.selectProps.size === 'small' ? 2 : 3;
      const maxHeight = `${
        state.selectProps.shownOptionsLimit * sizeInteger
      }rem`;
      return {
        ...provided,
        maxHeight,
      };
    },
    placeholder: (provided) => ({
      ...provided,
      ...placeholderColor({ theme }),
    }),
    option: (provided, state: any) => {
      return {
        padding: state.selectProps.size === 'small' ? '3px 14px' : '11px 14px',
        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
        ...getOptionBackground(state.isSelected, state.isFocused)({ theme }),
        display: 'flex',
        alignItems: 'center',
        color: state.isDisabled ? 'text-disabled' : 'default',
      };
    },
    singleValue: (provided) => ({
      ...provided,
      ...textColor({ theme }),
      display: 'flex',
      alignItems: 'center',
      marginLeft: 0,
    }),
    multiValue: (provided) => ({
      ...provided,
      ...tagBaseStyles,
      cursor: 'pointer',
      background: theme.colors.background,
      borderRadius: '4px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      fontSize: `${tagLabelFontSize}px`,
      color: theme.colors.text,
      borderRadius: tagBorderRadius,
      padding: `0 ${tagLabelPadding}px`,
      paddingLeft: `${tagLabelPadding}px`, // default label has an explicit rule for padding left so we need this to override it
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      ...dismissSharedStyles,
      cursor: 'pointer',
      borderRadius: `0px ${tagBorderRadius} ${tagBorderRadius} 0px`, // only want border radius on top and bottom right
      padding: 0, // default remove has padding left and right that we don't need
      ':hover': {
        backgroundColor: theme.colors['background-hover'],
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
  };
};
