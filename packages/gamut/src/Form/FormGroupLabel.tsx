import { MiniInfoOutlineIcon } from '@codecademy/gamut-icons';
import { theme, variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

import { ToolTip, ToolTipProps } from '..';
import { formBaseStyles } from './styles/shared';

// type StyledToolTipProps = {
//   zIndex: number;
// };

// const StyledToolTipContainer = styled.span<StyledToolTipProps>`
//   position: absolute;
//   left: calc(100% - 1.1rem);

//   /* div {
//     > *:last-child {
//       z-index: ${({ zIndex }) => zIndex};
//       left: calc(100% - 1.7rem);
//     }
//     &::after,
//     &::before {
//       z-index: ${({ zIndex }) => zIndex};
//     }
//   } */
// `;

const StyledToolTip = styled(ToolTip)`
  margin-left: 23px;
`;

export type FormGroupLabelProps = HTMLAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLLabelElement> & {
    disabled?: boolean;
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
        // <StyledToolTipContainer zIndex={1}>
        <StyledToolTip
          {...tooltip}
          id={`${htmlFor}-tooltip`}
          position="bottom-right"
          target={<MiniInfoOutlineIcon height="0.8rem" width="0.8rem" />}
        />
        // </StyledToolTipContainer>
      )}
    </Label>
  );
};
