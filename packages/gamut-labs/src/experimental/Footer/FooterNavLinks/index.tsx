import { Column, LayoutGrid } from '@codecademy/gamut';
import React from 'react';

import { CatalogLinks } from './CatalogLinks';
import { CompanyLinks, CompanyLinksProps } from './CompanyLinks';

export type FooterNavLinksProps = CompanyLinksProps;

export const FooterNavLinks: React.FC<FooterNavLinksProps> = ({ userGeo }) => {
  return (
    <LayoutGrid>
      <Column size={{ xs: 12, md: 6 }}>
        <CompanyLinks userGeo={userGeo} />
      </Column>
      <Column size={{ xs: 12, md: 6 }}>
        <CatalogLinks />
      </Column>
    </LayoutGrid>
  );
};
