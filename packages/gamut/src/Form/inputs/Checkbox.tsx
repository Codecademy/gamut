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

export type CheckboxTextProps = StyleProps<typeof checkboxTextStates>;
export type CheckboxPaddingProps = StyleProps<typeof checkboxPadding>;

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value'
> &
  CheckboxPaddingProps & {
    /**
     * If the label is a ReactNode, an aria-label must be added.
     */
    label: ReactNode | string;
    'aria-label'?: string;
    multiline?: boolean;
    className?: string;
    /**
     * [The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.
     */
    htmlFor: string;
    name?: string;
    required?: boolean;
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
          id={id || htmlFor}
          labelled-by={`text-${id || htmlFor}`}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          aria-label={
            ariaLabel === undefined
              ? typeof label === 'string'
                ? label
                : undefined
              : ariaLabel
          }
          value={`${value}`}
          {...rest}
          ref={ref}
        />
        <CheckboxLabel
          htmlFor={id || htmlFor}
          disabled={disabled}
          spacing={spacing}
        >
          <CheckboxElement
            multiline={multiline}
            checked={checked}
            disabled={disabled}
          >
            <CheckboxVector
              width="19px"
              height="19px"
              viewBox="0 0 19 19"
              color={checked ? 'currentColor' : 'transparent'}
              aria-hidden
            >
              <path fill="currentColor" d="M1 1h19v19h-19z" />
              <Polyline checked={checked} points="4 11 8 15 16 6" />
            </CheckboxVector>
          </CheckboxElement>
          <CheckboxText
            id={`text-${id || htmlFor}`}
            multiline={multiline}
            disabled={disabled}
            aria-hidden={dontAriaHideLabel ? 'false' : 'true'}
          >
            {label}
          </CheckboxText>
        </CheckboxLabel>
      </div>
    );
  }
);
