import React from 'react';
import { get } from 'lodash';
import { NotificationIconSettings } from './typings';
import styled from '@emotion/styled';
import { Icon, iconMap } from '../deprecated';

const OuterIconContainer = styled.div`
  height: 3rem;
  width: 3rem;
  margin-right: 1.5rem;
`;

const InnerIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
`;

export const NotificationIconElement = styled(Icon)`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
`;

export const NotificationImageElement = styled.img`
  height: 2.5rem;
  width: 2.5rem;
`;

const renderIcon = (props: NotificationIconProps) => {
  const { iconSettings, iconSlug, imageUrl } = props;

  if (iconSlug) {
    const color = get(iconSettings, 'color');
    const backgroundColor = get(iconSettings, 'backgroundColor');

    const iconStyle = {
      backgroundColor,
      color,
    };

    return (
      <InnerIconContainer style={iconStyle}>
        <NotificationIconElement name={iconSlug} />
      </InnerIconContainer>
    );
  }

  if (imageUrl) {
    return <NotificationImageElement src={imageUrl} alt="" />;
  }

  return null;
};

export type NotificationIconProps = {
  iconSettings?: NotificationIconSettings;
  iconSlug?: keyof typeof iconMap;
  imageUrl?: string;
};

export const NotificationIcon: React.FC<NotificationIconProps> = (props) => (
  <OuterIconContainer>{renderIcon(props)}</OuterIconContainer>
);
