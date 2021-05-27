import styled from '@emotion/styled';
import React, {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useState,
} from 'react';

import { FlexBox } from '..';
import { Text } from '../Typography';
import { conditionalStyles, formFieldStyles } from './styles/shared';

export type TextWrapperProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  characterMax?: number;
  className?: string;
  error?: boolean;
  htmlFor?: string;
  name?: string;
  required?: boolean;
  value?: string;
};

export interface TextAreaProps extends TextWrapperProps {
  activated?: boolean;
}

const StyledTextArea = styled.textarea<TextAreaProps>`
  ${formFieldStyles}
  ${conditionalStyles}
  position: initial;
`;

export const TextArea = forwardRef<HTMLTextAreaElement, TextWrapperProps>(
  (
    { error, characterMax, className, defaultValue, id, value, ...rest },
    ref
  ) => {
    const [activated, setActivated] = useState(false);
    const [characterCount, setCharacterCount] = useState(
      defaultValue?.toString().length || 0
    );

    const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      rest?.onChange?.(event);
      setActivated(true);
      setCharacterCount(event.currentTarget.value.length);
    };

    return (
      <>
        <StyledTextArea
          {...rest}
          aria-label={
            characterMax ? `maximum of ${characterMax} characters` : ''
          }
          id={id || rest.htmlFor}
          className={className}
          defaultValue={defaultValue}
          ref={ref}
          error={error}
          activated={activated}
          onChange={(event) => changeHandler(event)}
        />
        {characterMax && (
          <FlexBox alignItems="flex-end" flexDirection="column">
            <Text textColor={characterCount > characterMax ? 'red' : 'navy'}>
              ({characterCount} / {characterMax})
            </Text>
          </FlexBox>
        )}
      </>
    );
  }
);
