import { IconButton, TextButton } from '@codecademy/gamut';
import { StreakIcon } from '@codecademy/gamut-icons';
import { fontFamily, fontSize } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export const PaginationWrapper = styled.div`
  width: 100%;
  padding-right: 0.75rem;
  height: 44px;
  background-color: ${({ theme }) => theme.colors['gray-100']};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Total = styled.div`
  font-family: ${fontFamily.accent};
  font-size: ${fontSize[14]};
  margin-left: 1.5rem;
`;

export const Page = styled.div`
  display: flex;
  font-family: ${fontFamily.accent};
  font-size: ${fontSize[14]};
  align-items: center;
`;

type NumberProps = {
  isCurrent?: boolean;
};

export const Number = styled(TextButton)<NumberProps>`
  font-family: ${fontFamily.accent};
  padding: 0;
  span {
    padding: 0;
    font-weight: normal;
    color: black;
    &:hover {
      background: none;
    }
  }
  color: ${({ isCurrent, theme }) =>
    isCurrent ? theme.colors.blue : theme.colors.black};
`;
export const ArrowButton = styled(IconButton)`
  padding: 0;
  span {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

export const PageNumber = styled(Number)`
  span {
    color: ${({ theme }) => theme.colors.blue};
    font-weight: bold;
  }
`;

export const PageNumberLoader = styled(StreakIcon)`
  height: 16px;
  width: 90px;
  margin-left: 16px;
  padding-right: 16px;
`;

export const PageTotalOf = styled.span`
  font-family: ${fontFamily.base};
`;
