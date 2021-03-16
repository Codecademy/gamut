import { Container } from '@codecademy/gamut';
import { mediaQueries, styled } from '@codecademy/gamut-styles';
import React from 'react';

import { CTA, Description, Title } from '.';
import { BaseProps, DarkModeProps } from './types';

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

export const PagePrefooter: React.FC<BaseProps & DarkModeProps> = ({
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
