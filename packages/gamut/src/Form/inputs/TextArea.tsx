import { css, useVariance } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useState,
} from 'react';

import {
  conditionalStyles,
  conditionalStyleState,
  formFieldStyles,
} from '../styles';
import { BaseInputProps } from '../types';

export type TextWrapperProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  Omit<BaseInputProps, 'label'> & {
    className?: string;
    value?: string;
  };

export interface TextAreaProps
  extends TextWrapperProps,
    StyleProps<typeof conditionalStyles> {}

const textAreaExtraStyles = css({ position: 'initial', borderRadius: 'md' });

const StyledTextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const { rest } = useVariance(
      props as Record<string, unknown>,
      formFieldStyles,
      conditionalStyles,
      textAreaExtraStyles
    );
    return <textarea ref={ref} {...rest} />;
  }
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextWrapperProps>(
  ({ error, className, id, ...rest }, ref) => {
    const [activated, setActivated] = useState(false);

    const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      rest?.onChange?.(event);
      setActivated(true);
    };

    return (
      <StyledTextArea
        {...rest}
        className={className}
        id={id || rest.htmlFor}
        ref={ref}
        variant={conditionalStyleState(Boolean(error), activated)}
        onChange={(event) => changeHandler(event)}
      />
    );
  }
);
