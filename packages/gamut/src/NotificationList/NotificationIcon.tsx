import styled from '@emotion/styled';
import React from 'react';

import { Icon } from '../deprecated/Icon';
import { iconMap } from '../deprecated/Icon/iconMap';
import { NotificationIconSettings } from './typings';

const IconContainer = styled.div`
  height: 3rem;
  margin-right: 1.5rem;
  width: 3rem;
`;

const IconComponentContainer = styled.div`
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 3rem;
  justify-content: center;
  width: 3rem;
`;

const StyledIcon = styled(Icon)`
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
`;

const IconImage = styled.img`
  height: 2.5rem;
  width: 2.5rem;
`;

const renderIcon = ({
  iconSettings,
  iconSlug,
  imageUrl,
}: NotificationIconProps) => {
  if (iconSlug) {
    const color = iconSettings?.color;
    const backgroundColor = iconSettings?.backgroundColor;

    return (
      <IconComponentContainer style={{ backgroundColor, color }}>
        <StyledIcon name={iconSlug} />
      </IconComponentContainer>
    );
  }

  if (imageUrl) {
    return <IconImage src={imageUrl} alt="" />;
  }

  return null;
};

export type NotificationIconProps = {
  iconSettings?: NotificationIconSettings;
  iconSlug?: keyof typeof iconMap;
  imageUrl?: string;
};

export const NotificationIcon: React.FC<NotificationIconProps> = (props) => (
  <IconContainer>{renderIcon(props)}</IconContainer>
);
