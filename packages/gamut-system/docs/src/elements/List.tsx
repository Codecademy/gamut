import { compose, HandlerProps } from '@codecademy/gamut-system';
import { css } from '@emotion/core';
import { spacing, styled, typography } from '../system';

export const ListItem = styled.li`
  ${compose(spacing, typography)}
`;

ListItem.defaultProps = {
  fontSize: 2,
  lineHeight: 'base',
};

type ListProps = { listStyle?: 'regular' | 'menu' } & HandlerProps<
  typeof spacing
>;

export const List = styled.ul<ListProps>`
  ${spacing}
  ${({ listStyle = 'regular', theme }) =>
    listStyle === 'regular'
      ? css`
          list-style-position: inside;
          padding-left: ${theme.space[8]};
          list-style-type: disc;
        `
      : css`
          text-transform: uppercase;
        `}
> li {
    padding-left: ${({ theme }) => theme.space[12]}px;
  }
`;
