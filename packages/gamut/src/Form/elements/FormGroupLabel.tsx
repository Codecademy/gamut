import { states, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { size } from 'lodash';
import { HTMLAttributes } from 'react';
import * as React from 'react';

import { FlexBox } from '../..';
import { InfoTip, InfoTipProps } from '../../Tip';
import { formBaseStyles, formFieldTextDisabledStyles } from '../styles';
import { BaseInputProps } from '../types';

const labelSizeVariants = variant({
  defaultVariant: 'small',
  prop: 'size',
  base: { display: 'block', ...formBaseStyles },
  variants: {
    small: {
      lineHeight: 'base',
    },
    large: {
      fontSize: 22,
      lineHeight: 'base',
      fontWeight: 'title',
    },
  },
});

const labelStates = states({
  disabled: formFieldTextDisabledStyles,
});

export interface LabelVariants
  extends StyleProps<typeof labelSizeVariants>,
    StyleProps<typeof labelStates> {}

export type FormGroupLabelProps = HTMLAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLLabelElement> &
  LabelVariants &
  Pick<BaseInputProps, 'htmlFor' | 'required'> & {
    /**
     * [The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.
     */
    infotip?: InfoTipProps;
    size?: 'small' | 'large';
  };

const Label = styled.label<FormGroupLabelProps>(labelSizeVariants, labelStates);

export const FormGroupLabel: React.FC<FormGroupLabelProps> = ({
  children,
  className,
  disabled,
  htmlFor,
  infotip,
  required,
  size,
  ...rest
}) => {
  return (
    <FlexBox mb={4} justifyContent="space-between">
      <Label
        {...rest}
        htmlFor={htmlFor}
        disabled={disabled}
        className={className}
        size={size}
        as={htmlFor ? 'label' : 'div'}
      >
        {children}
        {required ? ' *' : ' (optional)'}
      </Label>
      {infotip && <InfoTip {...infotip} />}
    </FlexBox>
  );
};
