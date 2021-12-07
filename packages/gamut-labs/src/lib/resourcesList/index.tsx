import { Badge } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderLinkItem } from '../../AppHeader/AppHeaderElements/types';

type ResourcesList = Omit<AppHeaderLinkItem, 'trackingTarget' | 'badge'> & {
  headerTrackingTarget: string;
  footerTrackingTarget: string;
  badgeText?: string;
};

type FooterResourceList = {
  id: string;
  href: string;
  trackingTarget: string;
  text: string;
  newTab?: boolean;
};

export const StyledBadge = styled(Badge)`
  font-size: 10px;
  padding-top: 1px;
  padding-bottom: 10px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 16px;
`;

export const renderBadge = (text: string) => (
  <StyledBadge
    round
    variant="blue"
    fontFamily="accent"
    ml={8}
    pl={8}
    pr={8}
    height={16}
    alignSelf="center"
  >
    {text}
  </StyledBadge>
);

export const resourcesList: ResourcesList[] = [
  {
    id: 'challenges',
    href: '/code-challenges',
    footerTrackingTarget: 'challenges',
    headerTrackingTarget: 'topnav_resources_challenges',
    text: 'Challenges',
    type: 'link',
  },
  {
    id: 'docs',
    href: '/resources/docs',
    footerTrackingTarget: 'docs',
    headerTrackingTarget: 'topnav_resources_docs',
    text: 'Docs',
    type: 'link',
  },
  {
    id: 'cheatsheets',
    href: '/resources/cheatsheets/all',
    footerTrackingTarget: 'cheatsheets_home',
    headerTrackingTarget: 'topnav_resources_cheatsheets',
    text: 'Cheatsheets',
    type: 'link',
  },
  {
    id: 'articles',
    href: '/articles',
    footerTrackingTarget: 'articles',
    headerTrackingTarget: 'topnav_resources_articles',
    text: 'Articles',
    type: 'link',
  },
  {
    id: 'blog',
    href: 'https://codecademy.com/resources/blog',
    footerTrackingTarget: 'blog',
    headerTrackingTarget: 'topnav_resources_blog',
    text: 'Blog',
    newTab: true,
    type: 'link',
  },
  {
    id: 'projects',
    href: '/projects',
    footerTrackingTarget: 'projects',
    headerTrackingTarget: 'topnav_resources_projects',
    text: 'Projects',
    type: 'link',
    badgeText: 'hello from the other side',
  },
  {
    id: 'career-center',
    href: '/pages/career-center',
    footerTrackingTarget: 'career_center',
    headerTrackingTarget: 'topnav_resources_career_center',
    text: 'Career Center',
    type: 'link',
  },
];

export const headerResourcesList: AppHeaderLinkItem[] = resourcesList.map(
  ({ id, href, headerTrackingTarget, text, type, newTab, badgeText }) => {
    return {
      id,
      href,
      trackingTarget: headerTrackingTarget,
      text,
      type,
      newTab,
      badge: badgeText ? renderBadge(badgeText) : undefined,
    };
  }
);

export const footerResourcesList: FooterResourceList[] = resourcesList.map(
  ({ id, href, footerTrackingTarget, text, newTab }) => ({
    id,
    href,
    trackingTarget: footerTrackingTarget,
    text,
    newTab,
  })
);
