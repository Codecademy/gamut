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

export type PagePrefooterProps = BaseProps & {
  mode?: 'dark' | 'light';
};

export const PagePrefooter: React.FC<PagePrefooterProps> = ({
  title,
  desc,
  cta,
  onAnchorClick,
  mode,
  testId,
}) => {
  const SectionTitle = title && <Title mode={mode}>{title}</Title>;
  const Desc = desc && (
    <Description text={desc} onAnchorClick={onAnchorClick} mode={mode} />
  );

  return cta ? (
    <FlexContainer data-testid={testId} nowrap column justify="spaceBetween">
      <FlexContent>
        {SectionTitle}
        {Desc}
      </FlexContent>
      <StyledCTA href={cta.href} onCtaButtonClick={cta.onClick} mode={mode}>
        {cta.text}
      </StyledCTA>
    </FlexContainer>
  ) : (
    <div data-testid={testId}>
      {SectionTitle}
      {Desc}
    </div>
  );
};
