import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { focusStyles } from '../../AppHeader/styles';
import { AppHeaderLink } from '../../AppHeader/types';
import { HeaderClickHandler } from '../../GlobalHeader';

type AppHeaderLinkButtonProps = {
  verticalPadding?: number;
  horizontalPadding?: number;
};

const AppHeaderLinkButton = styled.a<AppHeaderLinkButtonProps>`
  font-weight: normal;
  min-width: 0;
  /* margin: 0 0.5rem; */

  padding-top: ${({ verticalPadding }) => verticalPadding || 1};
  padding-bottom: ${({ verticalPadding }) => verticalPadding || 1};
  padding-left: ${({ horizontalPadding }) => horizontalPadding || 0};
  padding-right: ${({ horizontalPadding }) => horizontalPadding || 0};

  text-align: left;
  display: block;
  color: ${colors.navy};
  border: 1px solid transparent;
  line-height: 1.5;
  white-space: nowrap;

  &:hover {
    color: ${colors.hyper};
    text-decoration: none;
  }
  ${focusStyles}
`;

export type AppHeaderLinkElementProps = AppHeaderLinkButtonProps & {
  className?: string;
  item: AppHeaderLink;
  onClick: HeaderClickHandler;
};

export const AppHeaderLinkElement: React.FC<AppHeaderLinkElementProps> = ({
  item,
  onClick,
  ...props
}) => {
  return (
    <AppHeaderLinkButton
      data-testid={item.dataTestId}
      onClick={(event: React.MouseEvent) => onClick(event, item)}
      href={item.href}
      {...props}
    >
      {item.text}
    </AppHeaderLinkButton>
  );
};
