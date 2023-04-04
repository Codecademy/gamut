import { Anchor, Box } from '@codecademy/gamut';
import { GamutIconProps } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import * as React from 'react';

const IconLink = styled(Anchor)``;

const getTitleId = (id: string, sectionId?: string) =>
  sectionId ? `${sectionId}-${id}` : id;

export type BaseSocialShareProps = {
  sectionId?: string;
  size?: 'small' | 'normal';
};

export type SocialShareIconLinkProps = BaseSocialShareProps & {
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
}) => {
  const onIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.(e);
    const popupSize = 570;
    const left = (window.screen.width - popupSize) / 2;
    const top = (window.screen.height - popupSize) / 2;
    const features = `menubar=no,toolbar=no,status=no,width=${popupSize},height=${popupSize},top=${top},left=${left}`;
    window.open(href, '_blank', features)?.focus();
  };

  return (
    <Box as="li">
      <IconLink
        href={href}
        onClick={onIconClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`share on ${id}`}
        p={8}
        lineHeight={0}
        borderStyle="solid"
        borderWidth={size === 'small' ? 1 : 2}
        borderColor="text"
        borderRadius="50%"
      >
        <IconComponent
          title={id}
          titleId={getTitleId(id, sectionId)}
          size={size === 'small' ? 16 : 24}
          color="text"
        />
      </IconLink>
    </Box>
  );
};
