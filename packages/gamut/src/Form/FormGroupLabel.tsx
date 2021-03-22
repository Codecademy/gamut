import { MiniInfoOutlineIcon } from '@codecademy/gamut-icons';
import { theme, variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

import { ToolTip, ToolTipProps } from '../ToolTip';
import { formBaseStyles } from './styles/shared';

const StyledToolTipContainer = styled.span`
  position: absolute;
  left: calc(100% - 1.1rem);
`;

const StyledToolTip = styled(ToolTip)`
  margin-left: -0.9rem;
  z-index: 1;
`;

export type FormGroupLabelProps = HTMLAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLLabelElement> & {
    disabled?: boolean;
    /**
     * [The for/id string of a label or labelable form-related element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). The outer FormGroup or FormLabel should have an identical string as the inner FormElement for accessibility purposes.
     */
    htmlFor?: string;
    tooltip?: ToolTipProps;
    showRequired?: boolean;
    size?: 'small' | 'large';
  };

type disabledLabelStyleProps = {
  disabled?: boolean;
};

const labelSizeVariants = variant({
  default: 'small',
  prop: 'size',
  variants: {
    small: {
      lineHeight: 'title',
      marginBottom: 4,
    },
    large: {
      fontSize: 22,
      lineHeight: 'base',
      fontWeight: 'title',
    },
  },
});

const disabledLabelStyle = ({ disabled }: disabledLabelStyleProps) => {
  if (disabled) {
    return css`
      color: ${theme.colors[`gray-400`]};
    `;
  }
};

const formLabelStyles = ({ size, disabled }: FormGroupLabelProps) => css`
  ${formBaseStyles}
  ${disabledLabelStyle({ disabled })}
  ${labelSizeVariants({ size })}
  display: block;
`;

const Label = styled
  .label(formLabelStyles)
  .withComponent((props: FormGroupLabelProps) => {
    if (props.htmlFor) {
      return <label {...props} />;
    }
    return <div {...props} />;
  });

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
    <Label
      {...rest}
      htmlFor={htmlFor}
      disabled={disabled}
      className={className}
      size={size}
    >
      {children}
      {showRequired ? ' *' : ''}
      {tooltip && (
        <StyledToolTipContainer>
          <StyledToolTip
            {...tooltip}
            id={`${htmlFor}-tooltip`}
            position="bottom-right"
            target={<MiniInfoOutlineIcon height="0.8rem" width="0.8rem" />}
          />
        </StyledToolTipContainer>
      )}
    </Label>
  );
};
