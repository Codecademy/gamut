import { Badge } from '@codecademy/gamut';
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

export const renderBadge = (text: string) => (
  <Badge size="sm" ml={8} alignSelf="center">
    {text}
  </Badge>
);

export const resourcesList: ResourcesList[] = [
  {
    id: 'projects',
    href: '/projects',
    footerTrackingTarget: 'projects',
    headerTrackingTarget: 'topnav_resources_projects',
    text: 'Projects',
    type: 'link',
    badgeText: 'New',
    hideWithNewCatalogDropdown: true,
  },
  {
    id: 'challenges',
    href: '/code-challenges',
    footerTrackingTarget: 'challenges',
    headerTrackingTarget: 'topnav_resources_challenges',
    text: 'Challenges',
    type: 'link',
    hideWithNewCatalogDropdown: true,
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
    id: 'videos',
    href: '/resources/videos',
    footerTrackingTarget: 'videos_homepage',
    headerTrackingTarget: 'topnav_resources_videos',
    text: 'Videos',
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
    id: 'career-center',
    href: '/pages/career-center',
    footerTrackingTarget: 'career_center',
    headerTrackingTarget: 'topnav_resources_career_center',
    text: 'Career Center',
    type: 'link',
  },
];

export const headerResourcesList = (
  useNewCatalogDropdown?: boolean
): AppHeaderLinkItem[] => {
  const filteredResources = useNewCatalogDropdown
    ? resourcesList.filter((resource) => !resource.hideWithNewCatalogDropdown)
    : resourcesList;
  return filteredResources.map(
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
};

export const headerCatalogDropdownList = () => [
  {
    id: 'projects',
    href: '/projects',
    footerTrackingTarget: 'projects',
    headerTrackingTarget: 'topnav_resources_projects',
    text: 'Projects',
    type: 'link',
    badgeText: 'New',
    hideWithNewCatalogDropdown: true,
  },
];

// TODO: add tracking
const headerCatalogDropdownData = [
  {
    title: 'Career paths',
    description: 'Land an entry-level role in tech with step-by-step guidance.',
    data: {
      linkHeaders: null,
      links: [
        [
          {
            id: 'full-stack-engineer-career-path',
            href: '/learn/paths/full-stack-engineer-career-path',
            headerTrackingTarget: 'topnav_resources_videos',
            text: 'Full-stack engineer',
            type: 'link',
          },
          {
            id: 'front-end-engineer-career-path',
            href: '/learn/paths/front-end-engineer-career-path',
            headerTrackingTarget: 'topnav_resources_videos',
            text: 'Front-end engineer',
            type: 'link',
          },
          {
            id: 'data-science',
            href: '/learn/paths/data-science',
            headerTrackingTarget: 'topnav_resources_videos',
            text: 'Data Scientist',
            type: 'link',
          },
        ],
        [
          {
            id: 'fdata-analyst',
            href: '/learn/paths/data-analyst',
            headerTrackingTarget: 'topnav_resources_videos',
            text: 'Data Analyst',
            type: 'link',
          },
          {
            id: 'computer-science',
            href: '/learn/paths/computer-science',
            headerTrackingTarget: 'topnav_resources_videos',
            text: 'Computer Science',
            type: 'link',
          },
          {
            id: 'ios-developer',
            href: '/learn/paths/ios-developer',
            headerTrackingTarget: 'topnav_resources_videos',
            text: 'iOS Developer',
            type: 'link',
          },
        ],
      ],
    },
  },
  {
    title: 'Popular topics',
    description: 'Find courses in languages or subjects that interest you.',
    data: {
      linkHeaders: ['Top Languages', 'Top Subjects'],
      links: [
        [
          {
            id: 'python',
            href: '/catalog/language/python',
            headerTrackingTarget: 'topnav_resources_videos',
            text: 'Python',
            type: 'link',
          },
          {
            id: 'javascript',
            href: '/catalog/language/javascript',
            headerTrackingTarget: 'topnav_resources_videos',
            text: 'Javascript',
            type: 'link',
          },
          {
            id: 'html-css',
            href: '/catalog/language/html-css',
            headerTrackingTarget: 'topnav_resources_videos',
            text: 'HTML & CSS',
            type: 'link',
          },
        ],
        [
          {
            id: 'web-development',
            href: '/catalog/subject/web-development',
            headerTrackingTarget: 'topnav_resources_videos',
            text: 'Web Development',
            type: 'link',
          },
          {
            id: 'data-science',
            href: '/catalog/subject/data-science',
            headerTrackingTarget: 'topnav_resources_videos',
            text: 'Data Science',
            type: 'link',
          },
          {
            id: 'computer-science',
            href: '/catalog/subject/computer-science',
            headerTrackingTarget: 'topnav_resources_videos',
            text: 'Computer Science',
            type: 'link',
          },
        ],
      ],
    },
  },
  {
    title: 'Practice tools',
    description: 'Get real-world practice and apply what you&apos;re learning.',
    data: {
      linkHeaders: null,
      links: [
        [
          {
            id: 'projects',
            href: '/projects',
            headerTrackingTarget: 'topnav_resources_videos',
            text: 'Projects',
            type: 'link',
          },
          {
            id: 'code-challenges',
            href: '/code-challenges',
            headerTrackingTarget: 'topnav_resources_videos',
            text: 'Code Challenges',
            type: 'link',
          },
        ],
      ],
    },
  },
];

export const footerResourcesList: FooterResourceList[] = resourcesList.map(
  ({ id, href, footerTrackingTarget, text, newTab }) => ({
    id,
    href,
    trackingTarget: footerTrackingTarget,
    text,
    newTab,
  })
);
