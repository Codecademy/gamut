import { Column, LayoutGrid } from '@codecademy/gamut/src';
import styled from '@emotion/styled';
import React from 'react';

import { AboutCell, AboutCellProps } from './AboutCell';

export type TableOfContentsProps = {
  data: AboutCellProps[];
};

const StyledLayoutGrid = styled(LayoutGrid)`
  margin-top: 3rem;
`;

export const TableOfContents: React.FC<TableOfContentsProps> = ({ data }) => {
  return (
    <StyledLayoutGrid columnGap="lg" rowGap="lg">
      {data.map((data) => {
        return (
          <Column size={{ xs: 12, sm: 6, md: 4 }}>
            <AboutCell key={data.emoji} {...data} />
          </Column>
        );
      })}
    </StyledLayoutGrid>
  );
};
