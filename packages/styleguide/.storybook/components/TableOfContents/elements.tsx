import { allProps } from '../styles';
import { styled, css } from '@storybook/theming';
import LinkTo from '@storybook/addon-links/dist/react/components/link';
import { boxShadows } from '@codecademy/gamut-styles/src';
import { badgeVariants } from '../Badge';

export const Box = styled.div(allProps);

export const SectionStatus = styled.div`
  position: absolute;
  left: calc(100% + 1rem);
  top: 0;
  bottom: 0;
  width: 0.5rem;
  border-radius: 0.25rem 0 0 0.25rem;
  ${badgeVariants}
`;

export const SectionLink = styled(LinkTo)<{ kind?: string; box?: boolean }>`
  color: #484848;
  border-radius: 4px;
  font-size: 14px;

  * {
    margin: 0;
  }

  a {
    color: #1ea7fd;

    &:hover {
      text-decoration: underline;
    }
  }

  ${({ kind, box }) => {
    return css`
      ${box && boxShadows[1]}

      &:hover {
        ${kind && box && boxShadows[2]}
        text-decoration: none;
      }
    `;
  }}
`;
