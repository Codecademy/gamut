import React from 'react';
import styled from '@emotion/styled';
import { Container } from '@codecademy/gamut';
import { mediaQueries, breakpoints } from '@codecademy/gamut-styles';

import { PageSectionCTA, PageSectionTitle, PageSectionDescription } from './';
import { BaseProps } from './types';

const NoFlexContainer = styled.div`
  margin: 2rem 0;
`;

const FlexContainer = styled(Container)`
  margin: 2rem 0;

  ${mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
  }
`;

const FlexContent = styled.div`
  flex-shrink: 1;

  ${mediaQueries.sm} {
    max-width: ${breakpoints.xs};
  }
`;

const CTA = styled(PageSectionCTA)`
  ${mediaQueries.sm} {
    margin: 0 0 0 2rem;
  }
`;

export const PagePrefooter: React.FC<BaseProps> = ({
  title,
  desc,
  cta,
  testId,
}) => {
  const Title = title && <PageSectionTitle>{title}</PageSectionTitle>;
  const Desc = desc && <PageSectionDescription text={desc} />;

  if (cta && cta?.href && cta?.text) {
    return (
      <FlexContainer nowrap column justify="spaceBetween">
        <FlexContent>
          {Title}
          {Desc}
        </FlexContent>
        <CTA href={cta.href}>{cta.text}</CTA>
      </FlexContainer>
    );
  }

  return (
    <NoFlexContainer>
      {Title}
      {Desc}
    </NoFlexContainer>
  );
};
