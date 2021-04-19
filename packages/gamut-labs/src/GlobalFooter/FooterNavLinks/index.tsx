import { Column, LayoutGrid } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { CatalogLinks } from './CatalogLinks';
import { CompanyLinks, CompanyLinksProps } from './CompanyLinks';

export type FooterNavLinksProps = CompanyLinksProps;

const FooterNavLinksGrid = styled(LayoutGrid)`
  ${theme.breakpoints.sm} {
    padding: 2rem 0;
  }
`;

export const FooterNavLinks: React.FC<FooterNavLinksProps> = ({
  onClick,
  userGeo,
}) => {
  return (
    <FooterNavLinksGrid>
      <Column size={{ _: 12, md: 6 }}>
        <CompanyLinks onClick={onClick} userGeo={userGeo} />
      </Column>
      <Column size={{ _: 12, md: 6 }}>
        <CatalogLinks onClick={onClick} />
      </Column>
    </FooterNavLinksGrid>
  );
};
