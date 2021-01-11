import { allProps } from '../styles';
import { styled, css } from '@storybook/theming';
import LinkTo from '@storybook/addon-links/dist/react/components/link';
import { boxShadows } from '@codecademy/gamut-styles/src';
import { badgeVariants } from '../Badge';

export const Box = styled.div`
  ${allProps}

  ::-webkit-scrollbar {
    background-color: transparent;
  }
`;

export const Reset = styled.div`
  *:first-of-type {
    margin-top: 0;
  }
`;

export const SectionStatus = styled.div`
  position: absolute;
  left: calc(100% + 1rem);
  top: 0;
  bottom: 0;
  width: 0.5rem;
  border-radius: 0.25rem 0 0 0.25rem;
  ${badgeVariants}
`;

interface SectionLinkProps {
  story?: string;
  kind?: string;
  box?: boolean;
}

export const SectionLink = styled(LinkTo)<SectionLinkProps>(({ box }) => {
  return css`
    box-shadow: ${box && boxShadows[1]};
    color: #484848;
    border-radius: 4px;
    font-size: inherit;
    color: ${(!box && `#1ea7fd`) || 'inherit'};
    transition: 200ms box-shadow;

    &:hover {
      text-decoration: ${box ? 'none' : 'underline'};
      box-shadow: ${box && boxShadows[2]};
    }
  `;
});
