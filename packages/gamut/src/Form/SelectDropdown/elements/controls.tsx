import { css, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { KeyboardEvent, useContext } from 'react';
import {
  AriaOnFocus,
  components as SelectDropdownElements,
} from 'react-select';

import { ExtendedOption, SizedIndicatorProps } from '../types';
import { indicatorIcons } from './constants';
import { SelectDropdownContext } from './containers';

const { DropdownIndicator } = SelectDropdownElements;

/**
 * Generates accessible focus messages for screen readers.
 * Provides detailed information about the currently focused option.
 *
 * @param params - Object containing the focused option details
 * @returns Formatted accessibility message
 */
export const onFocus: AriaOnFocus<ExtendedOption> = ({
  focused: { label, subtitle, rightLabel, disabled },
}) => {
  const formattedSubtitle = `, ${subtitle}`;
  const formattedRightLabel = `, ${rightLabel}`;

  const msg = `You are currently focused on option ${label}${
    subtitle ? formattedSubtitle : ''
  } ${rightLabel ? formattedRightLabel : ''}${disabled ? ', disabled' : ''}`;

  return msg;
};

/**
 * Custom dropdown indicator that shows either a chevron or search icon.
 * The icon type depends on whether the select is searchable or not.
 */
export const DropdownButton = (props: SizedIndicatorProps) => {
  const { size, isSearchable } = props.selectProps;
  const color = props.isDisabled ? 'text-disabled' : 'text';
  const iconSize = size ?? 'medium';
  const iconType = isSearchable ? 'Searchable' : 'Chevron';
  const { ...iconProps } = indicatorIcons[`${iconSize}${iconType}`];
  const { icon: IndicatorIcon } = iconProps;

  return (
    <DropdownIndicator {...props}>
      <IndicatorIcon {...iconProps} color={color} />
    </DropdownIndicator>
  );
};

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

/**
 * Custom remove all button for multi-select mode.
 * Provides keyboard navigation and accessible removal of all selected values.
 */
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
