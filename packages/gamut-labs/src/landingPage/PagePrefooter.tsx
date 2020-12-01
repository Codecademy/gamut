import { Container } from '@codecademy/gamut';
import { breakpoints, mediaQueries } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { CTA, Description, Title } from './';
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

const StyledCTA = styled(CTA)`
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
  const SectionTitle = title && <Title>{title}</Title>;
  const Desc = desc && <Description text={desc} />;

  return cta ? (
    <FlexContainer nowrap column justify="spaceBetween">
      <FlexContent>
        {SectionTitle}
        {Desc}
      </FlexContent>
      <StyledCTA href={cta.href}>{cta.text}</StyledCTA>
    </FlexContainer>
  ) : (
    <NoFlexContainer>
      {SectionTitle}
      {Desc}
    </NoFlexContainer>
  );
};
