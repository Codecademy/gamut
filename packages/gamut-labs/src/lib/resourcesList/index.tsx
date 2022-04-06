import { Badge } from '@codecademy/gamut';
import React from 'react';

import {
  AppHeaderCatalogDataItem,
  AppHeaderLinkItem,
} from '../../AppHeader/AppHeaderElements/types';

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

// TODO: add tracking
const çatalogDropdownList: AppHeaderCatalogDataItem[] = [
  {
    title: 'Top career paths',
    description: 'Land an entry-level role in tech with step-by-step guidance.',
    requiresCareerAccess: true,
    links: [
      {
        id: 'full-stack-engineer-career-path',
        href: '/learn/paths/full-stack-engineer-career-path',
        trackingTarget: 'topnav_catalog_career_full_stack_engineer',
        text: 'Full-Stack Engineer',
        type: 'link',
      },
      {
        id: 'front-end-engineer-career-path',
        href: '/learn/paths/front-end-engineer-career-path',
        trackingTarget: 'topnav_catalog_career_front-end-engineer',
        text: 'Front-End Engineer',
        type: 'link',
      },
      {
        id: 'data-science',
        href: '/learn/paths/data-science',
        trackingTarget: 'topnav_catalog_career_data_science',
        text: 'Data Scientist',
        type: 'link',
      },

      {
        id: 'data-analyst',
        href: '/learn/paths/data-analyst',
        trackingTarget: 'topnav_catalog_career_data_analyst',
        text: 'Data Analyst',
        type: 'link',
      },
      {
        id: 'computer-science',
        href: '/learn/paths/computer-science',
        trackingTarget: 'topnav_catalog_career_computer-science',
        text: 'Computer Science',
        type: 'link',
      },
      {
        id: 'ios-developer',
        href: '/learn/paths/ios-developer',
        trackingTarget: 'topnav_catalog_career_ios-developer',
        text: 'iOS Developer',
        type: 'link',
      },
    ],
  },
  {
    title: 'Popular courses',
    description: 'Find courses in languages or subjects that interest you.',
    links: [
      {
        id: 'top-languages',
        text: 'Top languages',
        type: 'subheader',
      },
      {
        id: 'python',
        href: '/catalog/language/python',
        trackingTarget: 'topnav_catalog_skill_python',
        text: 'Python',
        type: 'link',
      },
      {
        id: 'javascript',
        href: '/catalog/language/javascript',
        trackingTarget: 'topnav_catalog_skill_javascript',
        text: 'Javascript',
        type: 'link',
      },
      {
        id: 'html-css',
        href: '/catalog/language/html-css',
        trackingTarget: 'topnav_catalog_skill_html-css',
        text: 'HTML & CSS',
        type: 'link',
      },
      {
        id: 'top-subjects',
        text: 'Top subjects',
        type: 'subheader',
      },
      {
        id: 'web-development',
        href: '/catalog/subject/web-development',
        trackingTarget: 'topnav_catalog_skill_web_development',
        text: 'Web development',
        type: 'link',
      },
      {
        id: 'data-science',
        href: '/catalog/subject/data-science',
        trackingTarget: 'topnav_catalog_skill_data-science',
        text: 'Data science',
        type: 'link',
      },
      {
        id: 'computer-science',
        href: '/catalog/subject/computer-science',
        trackingTarget: 'topnav_catalog_skill_computer-science',
        text: 'Computer science',
        type: 'link',
      },
    ],
  },
  {
    title: 'Practice tools',
    description: `Get real-world practice and apply what you're learning.`,
    links: [
      {
        id: 'projects',
        href: '/projects',
        trackingTarget: 'topnav_catalog_practice_projects',
        text: 'Projects',
        type: 'link',
      },
      {
        id: 'code-challenges',
        href: '/code-challenges',
        trackingTarget: 'topnav_catalog_practice_code_challenges',
        text: 'Code Challenges',
        type: 'link',
      },
      {
        id: 'workspaces',
        href: '/pages/workspaces',
        trackingTarget: 'topnav_catalog_practice_workspaces',
        text: 'Workspaces',
        type: 'link',
      },
    ],
  },
];

export const headerCatalogDropdownList = (
  hideCareerPaths?: boolean
): AppHeaderCatalogDataItem[] => {
  return hideCareerPaths
    ? çatalogDropdownList.filter((item) => !item.requiresCareerAccess)
    : çatalogDropdownList;
};

export const footerResourcesList: FooterResourceList[] = resourcesList.map(
  ({ id, href, footerTrackingTarget, text, newTab }) => ({
    id,
    href,
    trackingTarget: footerTrackingTarget,
    text,
    newTab,
  })
);
