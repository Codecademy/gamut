import { Column, LayoutGrid } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { CatalogLinks } from './CatalogLinks';
import { CompanyLinks, CompanyLinksProps } from './CompanyLinks';

export type FooterNavLinksProps = CompanyLinksProps;

const FooterNavLinksGrid = styled(LayoutGrid)`
  ${theme.breakpoints.sm} {
    padding: 2rem 0;
  }
`;

export const FooterNavLinks: React.FC<FooterNavLinksProps> = ({
  hidePricing,
  onClick,
}) => {
  return (
    <FooterNavLinksGrid>
      <Column size={{ _: 12, md: 6 }}>
        <CompanyLinks hidePricing={hidePricing} onClick={onClick} />
      </Column>
      <Column size={{ _: 12, md: 6 }}>
        <CatalogLinks onClick={onClick} />
      </Column>
    </FooterNavLinksGrid>
  );
};
