import { MiniInfoOutlineIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import cx from 'classnames';
import React, { HTMLAttributes, ReactNode } from 'react';

import { ToolTip, ToolTipProps } from '../ToolTip';
import styles from './styles/FormGroupLabel.module.scss';

const StyledLabel = styled.label`
  position: relative;
  width: 100%;
`;

const StyledToolTip = styled.span`
  position: absolute;
  left: calc(100% - 1.1rem);
`;
const StyledFormGroupLabelText = styled.span`
  display: inline-block;
  margin-right: 0.5rem;
`;

export type FormGroupLabelProps = HTMLAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLLabelElement> & {
    disabled?: boolean;
    htmlFor?: string;
    tooltip?: ToolTipProps;
    children: ReactNode;
  };

export const FormGroupLabel: React.FC<FormGroupLabelProps> = ({
  className,
  disabled,
  htmlFor,
  tooltip,
  children,
  ...rest
}) => {
  const classNames = cx(
    styles.FormGroupLabel,
    disabled && styles.disabled,
    className
  );

  if (htmlFor) {
    return (
      <StyledLabel {...rest} htmlFor={htmlFor} className={classNames}>
        <StyledFormGroupLabelText>{children}</StyledFormGroupLabelText>
        {tooltip && (
          <StyledToolTip>
            <ToolTip
              {...tooltip}
              id={`${htmlFor}-tooltip`}
              target={<MiniInfoOutlineIcon height="0.8rem" width="0.8rem" />}
            />
          </StyledToolTip>
        )}
      </StyledLabel>
    );
  }

  return <div {...rest} className={classNames} />;
};
