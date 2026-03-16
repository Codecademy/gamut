import {
  noSelect,
  screenReaderOnly,
  styledOptions,
  timing,
} from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes, useEffect, useRef } from 'react';

import { FlexBox } from '../../Box';
import { InfoTip } from '../../Tip/InfoTip';
import {
  InfoTipSubComponentProps,
  useInfotipProps,
} from '../../Tip/InfoTip/type-utils';
import {
  checkboxElement,
  checkboxElementStates,
  checkboxInput,
  checkboxLabel,
  checkboxLabelStates,
  checkboxPadding,
  checkboxTextStates,
  InputWrapper,
  polyline,
} from '../styles';
import { BaseInputProps } from '../types';
import { CheckboxCheckedUnion, CheckboxLabelUnion } from './types';

export type CheckboxTextProps = StyleProps<typeof checkboxTextStates>;
export type CheckboxPaddingProps = StyleProps<typeof checkboxPadding>;

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'value' | 'label' | 'aria-label'
> &
  CheckboxLabelUnion &
  CheckboxCheckedUnion &
  CheckboxPaddingProps &
  Pick<BaseInputProps, 'name' | 'required'> & {
    multiline?: boolean;
    className?: string;
    /**
     * [The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.
     */
    htmlFor: string;
    /**
     * Infotip props to render to the right of your checkbox label.
     * The InfoTip button is automatically labelled by the checkbox label.
     * To override this behavior, provide `ariaLabel` or `ariaLabelledby`.
     */
    infotip?: InfoTipSubComponentProps;
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
    /**
     * Use if you want both the aria-label and text label to be read by voiceover - this component assumes that the aria-label and visual text label are identical.
     * If you have a link in the Checkbox options, you should set this as true.
     */
    dontAriaHideLabel?: boolean;
  };

const CheckboxLabel = styled.label<Pick<CheckboxProps, 'disabled' | 'spacing'>>(
  noSelect,
  checkboxLabel,
  checkboxPadding,
  checkboxLabelStates
);

type CheckboxElementProps = StyleProps<typeof checkboxElementStates>;

const CheckboxElement = styled('div', styledOptions)<CheckboxElementProps>(
  checkboxElement,
  checkboxElementStates
);

const CheckboxVector = styled.svg`
  position: absolute;
  top: -1px;
  left: -1px;
`;

const Checkmark = styled.polyline<Pick<CheckboxProps, 'checked'>>`
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

const Line = styled.line<Pick<CheckboxProps, 'indeterminate'>>`
  ${polyline}
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-dasharray: 18px;
  stroke-dashoffset: ${({ indeterminate }) => (indeterminate ? 0 : `18px`)};
  transition: stroke-dashoffset ${timing.fast};
`;

const Input = styled.input`
  ${screenReaderOnly}
  ${checkboxInput}
`;

const CheckboxText = styled.span<CheckboxTextProps>(checkboxTextStates);

export const Checkbox = forwardRef<HTMLInputElement | null, CheckboxProps>(
  (
    {
      'aria-label': ariaLabel,
      checked,
      indeterminate,
      className,
      disabled,
      dontAriaHideLabel,
      htmlFor,
      id,
      infotip,
      label,
      multiline,
      spacing,
      value,
      ...rest
    },
    ref
  ) => {
    const intRef = useRef<HTMLInputElement | null>(null);
    const { infotipProps, labelId, shouldLabelInfoTip } =
      useInfotipProps(infotip);

    function syncedRefs(element: HTMLInputElement | null) {
      intRef.current = element;
      if (ref) {
        if (typeof ref === 'object') {
          ref.current = element;
        } else {
          ref(element);
        }
      }
    }

    useEffect(() => {
      if (intRef.current && indeterminate !== undefined && !checked) {
        intRef.current.indeterminate = indeterminate;
      }
    }, [checked, indeterminate]);

    const active = checked || indeterminate;
    const textId = shouldLabelInfoTip ? labelId : `text-${id || htmlFor}`;

    return (
      <InputWrapper className={className}>
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
          labelled-by={textId}
          type="checkbox"
          value={`${value}`}
          {...rest}
          ref={syncedRefs}
        />
        <CheckboxLabel
          disabled={disabled}
          htmlFor={id || htmlFor}
          spacing={spacing}
        >
          <CheckboxElement
            active={active}
            disabled={disabled}
            hasBg={checked || indeterminate}
            hideBorder={disabled && (checked || indeterminate)}
            multiline={multiline}
          >
            <CheckboxVector
              aria-hidden
              color={active ? 'currentColor' : 'transparent'}
              height="19px"
              viewBox="0 0 19 19"
              width="19px"
            >
              <Checkmark
                // This should never happen if the types are working, but is a good back-up.
                checked={checked && !indeterminate}
                points="4 11 8 15 16 6"
              />
              <Line
                indeterminate={indeterminate}
                x1="4"
                x2="16"
                y1="10"
                y2="10"
              />
            </CheckboxVector>
          </CheckboxElement>
          <CheckboxText
            aria-hidden={dontAriaHideLabel ? 'false' : 'true'}
            disabled={disabled}
            id={textId}
            multiline={multiline}
          >
            {label}
          </CheckboxText>
        </CheckboxLabel>
        {infotipProps && (
          <FlexBox center pl={8}>
            <InfoTip {...infotipProps} />
          </FlexBox>
        )}
      </InputWrapper>
    );
  }
);
