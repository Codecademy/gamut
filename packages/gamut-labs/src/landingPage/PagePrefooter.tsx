import { Container } from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { CTA, Description, Title } from './';
import { BaseProps } from './types';

const FlexContainer = styled(Container)`
  ${mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
  }
`;

const FlexContent = styled.div`
  flex: 1;
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
      <StyledCTA href={cta.href} onCtaButtonClick={cta.onClick}>
        {cta.text}
      </StyledCTA>
    </FlexContainer>
  ) : (
    <div>
      {SectionTitle}
      {Desc}
    </div>
  );
};
