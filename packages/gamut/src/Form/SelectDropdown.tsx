import {
  ArrowChevronDownIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { theme, variant } from '@codecademy/gamut-styles';
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { each, isArray, isObject } from 'lodash';
import React, {
  ChangeEvent,
  forwardRef,
  SelectHTMLAttributes,
  useState,
} from 'react';
import ReactSelect, { components } from 'react-select';

import { Box } from '../Box';
import { conditionalStyles, formBaseFieldStyles } from './styles/shared';

export type SelectDropdownWrapperProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
  htmlFor?: string;
  options?: string[] | Record<string, number | string>;
  id?: string;
  sizeVariant?: 'small' | 'base';
};

export interface SelectDropdownProps extends SelectDropdownWrapperProps {
  activated?: boolean;
}

const selectSizeVariants = variant({
  default: 'base',
  prop: 'sizeVariant',
  variants: {
    small: {
      height: '2rem',
      paddingX: 8,
      paddingY: 0,
    },
    base: {
      height: 'auto',
    },
  },
});

const SelectBase = styled.select<SelectDropdownProps>`
  ${formBaseFieldStyles}
  ${conditionalStyles}
  ${selectSizeVariants}
  display: flex;
  cursor: pointer;
  display: block;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;

const spacing = ({ theme }: { theme: Theme }) => css`
  padding-top: ${theme.spacing[4]};
`;

const selectBaseStyles = (error, activated, isFocused) => css`
  ${formBaseFieldStyles}
  ${conditionalStyles({ error, activated, isFocused })}
${spacing}
  cursor: pointer;
  display: flex;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;

const selectIconStyles = css`
  pointer-events: none;
`;

const SelectIcon = styled(ArrowChevronDownIcon)(selectIconStyles);
const MiniSelectIcon = styled(MiniChevronDownIcon)(selectIconStyles);

const customStyles = {
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: '0',
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '2px dotted green',
    color: state.isSelected ? 'yellow' : 'black',
    backgroundColor: state.isSelected ? 'green' : 'white',
  }),
  control: (provided, state) => ({
    ...selectBaseStyles(
      state.selectProps.error,
      state.selectProps.activated,
      state.isFocused
    ),
  }),
  container: (provided) => ({
    ...provided,
    // ...formBaseFieldStyles,
  }),
};

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <SelectIcon size={16} />
    </components.DropdownIndicator>
  );
};

export const SelectDropdown = forwardRef<HTMLSelectElement, SelectWrapperProps>(
  (
    { className, defaultValue, options, error, id, sizeVariant, ...rest },
    ref
  ) => {
    const [activated, setActivated] = useState(false);
    console.log(customStyles);

    const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
      rest?.onChange?.(event);
      setActivated(true);
    };

    let selectOptions = [];
    if (isArray(options)) {
      options.map((option) => {
        const key = id ? `${id}-${option}` : option;
        selectOptions.push({ value: option, label: key });
      });
    } else if (isObject(options)) {
      each(options, (text, val) => {
        selectOptions.push({ value: val, label: text });
      });
    }

    // if (isArray(options)) {
    //   selectOptions = options.map((option) => {
    //     const key = id ? `${id}-${option}` : option;
    //     return (
    //       <option key={key} value={option} data-testid={key}>
    //         {option}
    //       </option>
    //     );
    //   });
    // } else if (isObject(options)) {
    //   each(options, (text, val) => {
    //     const key = id ? `${id}-${val}` : val;
    //     selectOptions.push(
    //       <option key={key} value={val} data-testid={key}>
    //         {text}
    //       </option>
    //     );
    //   });
    // }

    return (
      <Box
        width="100%"
        textColor={error ? 'red' : 'navy'}
        minWidth="7rem"
        className={className}
      >
        <ReactSelect
          styles={customStyles}
          activated={activated}
          error={error}
          components={{ DropdownIndicator, IndicatorSeparator: () => null }}
          onChange={changeHandler}
          options={selectOptions}
          theme={(theme) => ({
            ...theme,
          })}
        />
      </Box>
      //<FlexBox
      //     paddingRight={12}
      //     alignItems="center"
      //     position="absolute"
      //     right="0"
      //     top="0"
      //     bottom="0"
      //   >
      //     {sizeVariant === 'small' ? (
      //       <MiniSelectIcon size={12} />
      //     ) : (
      //       <SelectIcon size={16} />
      //     )}
      //   </FlexBox>
      //   <SelectBase
      //     {...rest}
      //     defaultValue={defaultValue || ''}
      //     id={id || rest.htmlFor}
      //     ref={ref}
      //     error={error}
      //     sizeVariant={sizeVariant}
      //     activated={activated}
      //     onChange={(event) => changeHandler(event)}
      //   >
      //     {selectOptions}
      //   </SelectBase>
    );
  }
);
