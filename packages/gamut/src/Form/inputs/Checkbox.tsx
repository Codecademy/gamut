import {
  noSelect,
  screenReaderOnly,
  styledOptions,
  timing,
} from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import {
  checkboxElement,
  checkboxElementStates,
  checkboxInput,
  checkboxLabel,
  checkboxLabelStates,
  checkboxPadding,
  checkboxTextStates,
  polyline,
} from '../styles';
import { BaseInputProps } from '../types';

/** Something will happen here */
export type CheckboxTextProps = StyleProps<typeof checkboxTextStates>;
export type CheckboxPaddingProps = StyleProps<typeof checkboxPadding>;

export type CheckboxStringLabelProps = {
  label: string;
  'aria-label'?: string;
};

export type CheckboxReactNodeLabelProps = {
  label: ReactNode;
  'aria-label': string;
};

export type CheckboxLabelProps =
  | CheckboxStringLabelProps
  | CheckboxReactNodeLabelProps;

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'label' | 'aria-label'
> &
  CheckboxLabelProps &
  CheckboxPaddingProps &
  Pick<BaseInputProps, 'name' | 'required'> & {
    multiline?: boolean;
    className?: string;
    /**
     * [The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.
     */
    htmlFor: string;
    /**
     * @remarks
     * The `value` prop here gets passed to the underlying `input` component
     * and functions exactly like the HTML spec for checkboxes defines
     * (which may not be as you expect):
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value=
     *
     * Of note is that `value` ends up being the string that your field name key
     * is set to when the checkbox is checked. So a `value` of the boolean `true` and
     * a `name` of "isPro" will result in `{
     *  isPro: "true"
     * }` being submitted to your (non-`Connected`) form when the checkbox is checked.
     * However, if due to how your HOC is organized, the Checkbox recieves a value
     * of the boolean `false` when it is unchecked, NOTHING will be submitted. You
     * _will not_ get `{ isPro: "false" }` on submit. However, the `value` of your input
     * will be "false"
     *
     * As the MDN documentation above states:
     * "If a checkbox is unchecked when its form is submitted, there is no value submitted to the server to represent its unchecked state (e.g. value=unchecked); the value is not submitted to the server at all"
     *
     * This behavior may not matter to you if you're handling your own form values
     * externally (i.e. not relying on default lower-case-`form`/`input` submit behavior)
     * or you're using `register` from Gamut's `useField` hook,
     * which uses `react-hook-form`'s logic to sidestep this behavior by not passing
     * a value to the underlying checkbox at all.
     */
    value?: string | boolean;
    id?: string;
    dontAriaHideLabel?: boolean;
  };

const CheckboxLabel = styled.label<Pick<CheckboxProps, 'disabled' | 'spacing'>>(
  noSelect,
  checkboxLabel,
  checkboxPadding,
  checkboxLabelStates
);

const CheckboxElement = styled('div', styledOptions)<
  Pick<CheckboxProps, 'checked' | 'multiline' | 'disabled'>
>(checkboxElement, checkboxElementStates);

const CheckboxVector = styled.svg`
  position: absolute;
  top: -1px;
  left: -1px;
`;

const Polyline = styled.polyline<Pick<CheckboxProps, 'checked'>>`
  ${polyline}
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 18px;
  stroke-dashoffset: ${({ checked }) => (checked ? 0 : `18px`)};
  transition: stroke-dashoffset ${timing.fast};
`;

const Input = styled.input`
  ${screenReaderOnly}
  ${checkboxInput}
`;

const CheckboxText = styled.span<CheckboxTextProps>(checkboxTextStates);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      'aria-label': ariaLabel,
      className,
      label,
      htmlFor,
      multiline,
      id,
      checked,
      disabled,
      spacing,
      value,
      dontAriaHideLabel,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={className}>
        <Input
          aria-label={
            ariaLabel === undefined
              ? typeof label === 'string'
                ? label
                : 'checkbox'
              : ariaLabel
          }
          checked={checked}
          disabled={disabled}
          id={id || htmlFor}
          labelled-by={`text-${id || htmlFor}`}
          type="checkbox"
          value={`${value}`}
          {...rest}
          ref={ref}
        />
        <CheckboxLabel
          disabled={disabled}
          htmlFor={id || htmlFor}
          spacing={spacing}
        >
          <CheckboxElement
            checked={checked}
            disabled={disabled}
            multiline={multiline}
          >
            <CheckboxVector
              aria-hidden
              color={checked ? 'currentColor' : 'transparent'}
              height="19px"
              viewBox="0 0 19 19"
              width="19px"
            >
              <path d="M1 1h19v19h-19z" fill="currentColor" />
              <Polyline checked={checked} points="4 11 8 15 16 6" />
            </CheckboxVector>
          </CheckboxElement>
          <CheckboxText
            aria-hidden={dontAriaHideLabel ? 'false' : 'true'}
            disabled={disabled}
            id={`text-${id || htmlFor}`}
            multiline={multiline}
          >
            {label}
          </CheckboxText>
        </CheckboxLabel>
      </div>
    );
  }
);
