import { screenReaderOnly } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import {
  ComponentPropsWithoutRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import * as React from 'react';

import { FlexBox } from '../../Box';
import { InfoTip } from '../../Tip/InfoTip';
import {
  InfoTipSubComponentProps,
  useInfotipProps,
} from '../../Tip/InfoTip/type-utils';
import { DataAttributes } from '../../utils';
import {
  conditionalRadioInputStyles,
  conditionalRadioLabelStyles,
  InputWrapper,
  radioInput,
  radioLabel,
} from '../styles';
import { BaseInputProps } from '../types';

/*
 * Props for the visible `<label>` that wraps the radio UI, as opposed to
 * `RadioProps`' own `...rest`, which forwards to the hidden `<input>`.
 * Event handlers (`onChange`, `onCopy`, etc.) are omitted because `RadioLabel`
 * is typed with `RadioElementProps`, which inherits `RadioProps`' input-shaped
 * handler signatures rather than a label's own - not something this additive
 * slot should try to reconcile. Intersected with `DataAttributes` since nested
 * prop-bag object literals don't get the JSX exemption for hyphenated
 * attribute names.
 */
export type RadioLabelProps = Omit<
  ComponentPropsWithoutRef<'label'>,
  keyof React.DOMAttributes<HTMLElement>
> &
  DataAttributes;

export type RadioProps = InputHTMLAttributes<HTMLInputElement> &
  Omit<BaseInputProps, 'label'> & {
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    /**
     * Infotip props to render to the right of your radio label.
     * The InfoTip button is automatically labelled by the radio label.
     * To override this behavior, provide `ariaLabel` or `ariaLabelledby`.
     */
    infotip?: InfoTipSubComponentProps;
    /**
     * Props to forward to the visible label element that wraps the radio
     * UI - the thing users actually click. Unlike `...rest`, which lands on
     * the screenreader-only `<input>`, this is the slot for `data-*`/`aria-*`
     * attributes meant for click tracking or targeting the visible element.
     */
    labelProps?: RadioLabelProps;
    /**
     * A label for your Radio input - should not include infotips or other interactive elements
     */
    label?: ReactNode;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Specifies the tab order of the Radio input
     */
    tabIndex?: number;
    value?: string;
    readOnly?: boolean;
  };
export interface RadioElementProps
  extends RadioProps,
    StyleProps<typeof conditionalRadioInputStyles> {}

const RadioLabel = styled.label<RadioElementProps>(
  radioLabel,
  conditionalRadioLabelStyles
);
const RadioInput = styled.input<RadioElementProps>(
  screenReaderOnly,
  radioInput,
  conditionalRadioInputStyles
);

const conditionalStyleState = (error?: boolean, disabled?: boolean) => {
  return error ? 'error' : disabled ? 'disabled' : undefined;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      checked,
      className,
      disabled,
      error,
      htmlFor,
      id,
      infotip,
      label,
      labelProps,
      name,
      onChange,
      required,
      value,
      ...rest
    },
    ref
  ) => {
    const inputId = id ? `${htmlFor}-${id}` : htmlFor;
    const styleState = conditionalStyleState(error, disabled);
    const { infotipProps, labelId, shouldLabelInfoTip } =
      useInfotipProps(infotip);

    return (
      <InputWrapper className={className}>
        <RadioInput
          checked={checked}
          disabled={disabled}
          id={inputId}
          name={name}
          ref={ref}
          required={required}
          type="radio"
          value={value}
          variant={styleState}
          onChange={onChange}
          {...rest}
        />
        {/*
          labelProps spreads first so Radio's own accessibility wiring -
          disabled/htmlFor/id/variant - always wins over anything a consumer
          passes in.
        */}
        <RadioLabel
          {...labelProps}
          disabled={disabled}
          htmlFor={htmlFor}
          id={infotip && shouldLabelInfoTip ? labelId : undefined}
          variant={styleState}
        >
          {label}
        </RadioLabel>
        {infotipProps && (
          <FlexBox center pl={8}>
            <InfoTip {...infotipProps} />
          </FlexBox>
        )}
      </InputWrapper>
    );
  }
);
