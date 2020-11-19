import React from 'react';
import styled from '@emotion/styled';

import { Heading, Markdown } from '@codecademy/gamut';

const Icon = styled.img`
  width: 4rem;
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

const Image = styled.img`
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

const StyledMarkdown = styled(Markdown)`
  font-size: 1rem;
`;

export type LandingPageFeatureProps = {
  /**
    Used to determine if an icon or a full size image should be rendered
  */
  isIcon?: boolean;
  imgSrc?: string;
  /**
   Hero image alt text (for screen readers)
  */
  imgAlt?: string;
  title?: string;
  /**
    Main body text (can include html)
  */
  desc?: string;
  /**
    Hero image URL
  */
  testId?: string;
};

export const LandingPageFeature: React.FC<LandingPageFeatureProps> = ({
  isIcon = false,
  imgSrc,
  imgAlt,
  title,
  desc,
  testId,
}) => {
  return (
    <div data-testid={testId}>
      {isIcon ? (
        <Icon src={imgSrc} alt={imgAlt} />
      ) : (
        <Image src={imgSrc} alt={imgAlt} />
      )}
      {title && (
        <Heading as="h4" hideMargin fontSize={{ xs: 'sm', sm: 'md' }}>
          {title}
        </Heading>
      )}
      {desc && (
        <div>
          <StyledMarkdown text={desc} />
        </div>
      )}
    </div>
  );
};
