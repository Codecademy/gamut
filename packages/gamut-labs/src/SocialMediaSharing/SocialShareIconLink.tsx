import { Anchor, Box } from '@codecademy/gamut';
import { GamutIconProps } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

const IconLink = styled(Box)`
  &:last-of-type {
    margin-right: 0;
  }
`.withComponent(Anchor);

type SocialShareIconLinkProps = {
  id: string;
  icon: React.ComponentType<GamutIconProps>;
  href: string;
  small?: boolean;
  track?: (e: React.MouseEvent) => void;
  sectionId?: string;
  white?: boolean;
};

export const SocialShareIconLink: React.FC<SocialShareIconLinkProps> = ({
  icon: IconComponent,
  id,
  href,
  small,
  track,
  sectionId,
  white,
}) => {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    track?.(e);
    const left = (screen.width - 570) / 2; // eslint-disable-line no-restricted-globals
    const top = (screen.height - 570) / 2; // eslint-disable-line no-restricted-globals
    const features = `menubar=no,toolbar=no,status=no,width=570,height=570,top=${top},left=${left}`;
    window.open(href, '_blank', features)?.focus();
  };

  return (
    <IconLink
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`share on ${id}`}
      p={8}
      mr={16}
      lineHeight={0}
      borderStyle="solid"
      borderWidth={small ? 1 : 2}
      borderColor={white ? 'white' : 'black'}
      borderRadius="50%"
    >
      <IconComponent
        title={id}
        titleId={`${sectionId}-${id}`}
        size={small ? 16 : 24}
        color={white ? 'white' : 'black'}
      />
    </IconLink>
  );
};
