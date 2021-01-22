import { VideoProps } from '@codecademy/gamut';
import { Column, LayoutGrid } from '@codecademy/gamut';
import { breakpoints } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { CTA, Description, Title } from './';
import { BaseProps } from './types';

const RightColumn = styled(Column)`
  margin-left: 1rem;

  @media only screen and (max-width: ${breakpoints.sm}) {
    display: none;
  }
`;

const Image = styled.img`
  width: 100%;
`;

export type ImageProps = {
  src: string;
  alt: string;
};

export type MediaProps =
  | ({
      type: 'image';
    } & ImageProps)
  | ({
      type: 'video';
    } & VideoProps);

export type PageHeroProps = BaseProps & {
  media?: MediaProps;
};

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  desc,
  cta,
  media,
  testId,
  onAnchorClick,
}) => {
  const renderMedia = () => {
    if (media && media.type === 'image') {
      return (
        <RightColumn size={3}>
          <Image src={media.src} alt={media.alt} />
        </RightColumn>
      );
    } else {
      // return (
      //   <RightColumn size={3}>
      //     <Image src={imgSrc} alt={imgAlt} />
      //   </RightColumn>
      // );
    }
  };

  return (
    <LayoutGrid testId={testId}>
      <Column
        size={{
          xs: 12,
          sm: media ? 9 : 12,
        }}
      >
        {title && <Title isPageHeading>{title}</Title>}
        {desc && <Description text={desc} onAnchorClick={onAnchorClick} />}
        {cta && (
          <CTA href={cta.href} onCtaButtonClick={cta.onClick}>
            {cta.text}
          </CTA>
        )}
      </Column>
      {media && renderMedia()}
    </LayoutGrid>
  );
};
