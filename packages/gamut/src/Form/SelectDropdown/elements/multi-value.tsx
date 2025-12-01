import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { KeyboardEvent, useContext } from 'react';
import {
  components as SelectDropdownElements,
  GroupBase,
  MultiValueProps,
  MultiValueRemoveProps,
} from 'react-select';

import { ExtendedOption, SizedIndicatorProps } from '../types';
import { indicatorIcons } from './constants';
import { SelectDropdownContext } from './containers';

const { MultiValue, MultiValueRemove } = SelectDropdownElements;

/**
 * Custom multi-value component that manages focus state for keyboard navigation.
 * Tracks which multi-value is currently focused and updates the context accordingly.
 */
export const MultiValueWithColorMode = (
  props: MultiValueProps<ExtendedOption, true, GroupBase<ExtendedOption>>
) => {
  const { currentFocusedValue, setCurrentFocusedValue } = useContext(
    SelectDropdownContext
  );

  const { data } = props;

  const { value, label } = data;

  if (
    props.isFocused &&
    setCurrentFocusedValue &&
    currentFocusedValue !== value
  ) {
    setCurrentFocusedValue(value);
  }

  if (
    !props.isFocused &&
    setCurrentFocusedValue &&
    currentFocusedValue === value
  ) {
    setCurrentFocusedValue(undefined);
  }
  const displayText = data?.abbreviation ? data.abbreviation : label || '';

  return <MultiValue {...props}>{displayText}</MultiValue>;
};

/**
 * Custom remove button for multi-value items.
 * Provides accessible removal functionality with proper ARIA labels.
 */
export const MultiValueRemoveButton = (
  props: MultiValueRemoveProps<ExtendedOption, true, GroupBase<ExtendedOption>>
) => {
  const { label } = props?.data ?? { label: '' };

  props.innerProps['aria-label'] = `Remove ${label}`;

  return (
    <MultiValueRemove {...props}>
      <MiniDeleteIcon size={12} />
    </MultiValueRemove>
  );
};

/**
 * Custom remove all button for multi-select mode.
 * Provides keyboard navigation and accessible removal of all selected values.
 */

const CustomStyledRemoveAllDiv = styled('div')(
  css({
    '&:focus': {
      outline: `2px solid ${theme.colors.primary}`,
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.primary}`,
    },
  })
);

export const RemoveAllButton = (props: SizedIndicatorProps) => {
  const {
    getStyles,
    innerProps: { ...restInnerProps },
    selectProps: { size },
  } = props;

  const { removeAllButtonRef, selectInputRef } = useContext(
    SelectDropdownContext
  );

  const iconSize = size ?? 'medium';
  const { ...iconProps } = indicatorIcons[`${iconSize}Remove`];
  const { icon: IndicatorIcon } = iconProps;

  const onKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && restInnerProps.onMouseDown) {
      restInnerProps.onMouseDown(e as any);
    }

    if (
      selectInputRef?.current &&
      (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowDown')
    ) {
      selectInputRef?.current.focus();
    }
  };

  const style = getStyles('clearIndicator', props) as React.CSSProperties;

  return (
    <CustomStyledRemoveAllDiv
      aria-label="Remove all selected"
      role="button"
      tabIndex={0}
      {...restInnerProps}
      ref={removeAllButtonRef}
      // eslint-disable-next-line gamut/no-inline-style
      style={style}
      onKeyDown={onKeyPress}
    >
      <IndicatorIcon {...iconProps} color="text" />
    </CustomStyledRemoveAllDiv>
  );
};
