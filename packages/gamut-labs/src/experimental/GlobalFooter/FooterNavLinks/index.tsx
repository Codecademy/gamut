import { Column, LayoutGrid } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { CatalogLinks } from './CatalogLinks';
import { CompanyLinks, CompanyLinksProps } from './CompanyLinks';

export type FooterNavLinksProps = CompanyLinksProps;

const FooterNavLinksGrid = styled(LayoutGrid)`
  ${theme.breakpoints.md} {
    padding: 2rem 0;
  }
`;

export const FooterNavLinks: React.FC<FooterNavLinksProps> = ({ userGeo }) => {
  return (
    <FooterNavLinksGrid>
      <Column size={{ xs: 12, md: 6 }}>
        <CompanyLinks userGeo={userGeo} />
      </Column>
      <Column size={{ xs: 12, md: 6 }}>
        <CatalogLinks />
      </Column>
    </FooterNavLinksGrid>
  );
};
