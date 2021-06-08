import { Anchor, Box } from '@codecademy/gamut';
import { GamutIconProps } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

import type { SocialMediaSharingProps } from '.';

const IconLink = styled(Box)`
  &:last-of-type {
    margin-right: 0;
  }
`.withComponent(Anchor);

type SocialShareIconLinkProps = Pick<
  SocialMediaSharingProps,
  'size' | 'sectionId' | 'variant'
> & {
  icon: React.ComponentType<GamutIconProps>;
  id: string;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
};

export const SocialShareIconLink: React.FC<SocialShareIconLinkProps> = ({
  icon: IconComponent,
  id,
  href,
  onClick,
  size,
  sectionId,
  variant,
}) => {
  const onIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.(e);
    const popupSize = 570;
    const left = (screen.width - popupSize) / 2;
    const top = (screen.height - popupSize) / 2;
    const features = `menubar=no,toolbar=no,status=no,width=${popupSize},height=${popupSize},top=${top},left=${left}`;
    window.open(href, '_blank', features)?.focus();
  };

  return (
    <IconLink
      href={href}
      onClick={onIconClick}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`share on ${id}`}
      p={8}
      mr={16}
      lineHeight={0}
      borderStyle="solid"
      borderWidth={size === 'small' ? 1 : 2}
      borderColor={variant}
      borderRadius="50%"
    >
      <IconComponent
        title={id}
        titleId={`${sectionId}-${id}`}
        size={size === 'small' ? 16 : 24}
        color={variant}
      />
    </IconLink>
  );
};
