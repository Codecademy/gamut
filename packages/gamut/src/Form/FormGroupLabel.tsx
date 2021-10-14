import { MiniInfoOutlineIcon } from '@codecademy/gamut-icons';
import { states, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

import { FlexBox } from '..';
import { ToolTip, ToolTipProps } from '../ToolTip';
import { FormGroupProps } from '.';
import { formBaseStyles, formFieldTextDisabledStyles } from './styles';

const StyledToolTipContainer = styled.span`
  position: absolute;
  left: calc(100% - 1.1rem);
`;

const StyledToolTip = styled(ToolTip)`
  z-index: 1;
`;

const labelSizeVariants = variant({
  defaultVariant: 'small',
  prop: 'size',
  base: { display: 'block', ...formBaseStyles },
  variants: {
    small: {
      lineHeight: 'title',
      mb: 4,
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
  tooltipPadding: { mr: 16 },
});

interface LabelVariants
  extends StyleProps<typeof labelSizeVariants>,
    StyleProps<typeof labelStates> {}

export type FormGroupLabelProps = HTMLAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLLabelElement> &
  LabelVariants & {
    /**
     * [The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.
     */
    htmlFor?: string;
    tooltip?: ToolTipProps;
    showRequired?: boolean;
    size?: 'small' | 'large';
  };

const Label = styled.label<FormGroupLabelProps>(labelSizeVariants, labelStates);

export const FormGroupLabel: React.FC<FormGroupLabelProps> = ({
  children,
  className,
  disabled,
  htmlFor,
  tooltip,
  showRequired,
  size,
  ...rest
}) => {
  return (
    <FlexBox>
      <Label
        {...rest}
        htmlFor={htmlFor}
        disabled={disabled}
        tooltipPadding={Boolean(tooltip)}
        className={className}
        size={size}
        as={htmlFor ? 'label' : 'div'}
      >
        {children}
        {showRequired ? ' *' : ''}
      </Label>
      {tooltip && (
        <StyledToolTipContainer>
          <StyledToolTip
            alignment="bottom-right"
            focusable
            target={
              <MiniInfoOutlineIcon size="0.8rem" aria-hidden="false" mb={4} />
            }
            {...tooltip}
          />
        </StyledToolTipContainer>
      )}
    </FlexBox>
  );
};
