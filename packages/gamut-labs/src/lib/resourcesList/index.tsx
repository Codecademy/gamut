import { Badge } from '@codecademy/gamut';
import React from 'react';

import {
  AppHeaderLinkItem,
  AppHeaderResourcesDataItem,
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

const renderNewBadge = (text: string) => (
  <Badge size="sm" ml={8} alignSelf="start" variant="yellow">
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
  },
  {
    id: 'challenges',
    href: '/code-challenges',
    footerTrackingTarget: 'challenges',
    headerTrackingTarget: 'topnav_resources_challenges',
    text: 'Interview Challenges',
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

export const newHeaderResourcesList: AppHeaderResourcesDataItem[] = [
  {
    title: 'Docs',
    description:
      'Find definitions, code syntax, and more -- or contribute your own code documentation.',
    link: {
      text: 'View all docs →',
      href: '/resources/docs',
      id: 'view-all-docs',
      trackingTarget: 'topnav_resources_docs_all',
      type: 'link',
    },
    data: [
      {
        id: 'c',
        href: '/resources/docs/c',
        trackingTarget: 'topnav_resources_docs_c',
        text: 'C',
        type: 'link',
      },
      {
        id: 'html',
        href: '/resources/docs/html',
        trackingTarget: 'topnav_resources_docs_html',
        text: 'HTML',
        type: 'link',
      },
      {
        id: 'python',
        href: '/resources/docs/python',
        trackingTarget: 'topnav_resources_docs_python',
        text: 'Python',
        type: 'link',
      },
      {
        id: 'cpp',
        href: '/resources/docs/cpp',
        trackingTarget: 'topnav_resources_docs_cpp',
        text: 'C++',
        type: 'link',
      },
      {
        id: 'java',
        href: '/resources/docs/java',
        trackingTarget: 'topnav_resources_docs_java',
        text: 'Java',
        type: 'link',
      },
      {
        id: 'react',
        href: '/resources/docs/react',
        trackingTarget: 'topnav_resources_docs_react',
        text: 'React',
        type: 'link',
      },
      {
        id: 'css',
        href: '/resources/docs/css',
        trackingTarget: 'topnav_resources_docs_css',
        text: 'CSS',
        type: 'link',
      },
      {
        id: 'javascript',
        href: '/resources/docs/javascript',
        trackingTarget: 'topnav_resources_docs_javascript',
        text: 'JavaScript',
        type: 'link',
      },
      {
        id: 'sql',
        href: '/resources/docs/sql',
        trackingTarget: 'topnav_resources_docs_sql',
        text: 'SQL',
        type: 'link',
      },
      {
        id: 'git',
        href: '/resources/docs/git',
        trackingTarget: 'topnav_resources_docs_git',
        text: 'Git',
        type: 'link',
      },
      {
        id: 'php',
        href: '/resources/docs/php',
        trackingTarget: 'topnav_resources_docs_php',
        text: 'PHP',
        type: 'link',
      },
      {
        id: 'uiux',
        href: '/resources/docs/uiux',
        trackingTarget: 'topnav_resources_docs_uiux',
        text: 'UI/UX',
        type: 'link',
      },
    ],
  },
  {
    title: 'Learning & practice tools',
    data: [
      {
        id: 'articles',
        href: '/articles',
        text: 'Articles',
        description: 'Learn about technical concepts.',
        trackingTarget: 'topnav_resources_learning_articles',
        type: 'link',
      },
      {
        id: 'cheatsheets',
        href: '/resources/cheatsheets/all',
        text: 'Cheatsheets',
        description: 'Review concepts from your courses.',
        trackingTarget: 'topnav_resources_learning_cheatsheets',
        type: 'link',
      },
      {
        id: 'code-challenges',
        href: '/code-challenges',
        text: 'Code challenges',
        description: 'Test your knowledge and prep for interviews.',
        trackingTarget: 'topnav_resources_learning_code_challenges',
        type: 'link',
      },
      {
        id: 'projects',
        href: '/projects',
        text: 'Projects',
        description: 'Practice and build your portfolio.',
        trackingTarget: 'topnav_resources_learning_projects',
        type: 'link',
        badge: renderNewBadge('New'),
      },

      {
        id: 'videos',
        href: '/resources/videos',
        text: 'Videos',
        description: 'Watch tutorials, project walkthroughs, and more.',
        trackingTarget: 'topnav_resources_learning_videos',
        type: 'link',
      },
      {
        id: 'workspaces',
        href: '/pages/workspaces',
        text: 'Workspaces',
        description: 'Build and share projects in your browser.',
        trackingTarget: 'topnav_resources_learning_workspaces',
        type: 'link',
      },
    ],
  },
  {
    title: 'Inspiration',
    link: {
      text: 'View all topics →',
      href: '/resources/blog',
      id: 'view-all-inspiration',
      trackingTarget: 'topnav_resources_inspiration_all',
      type: 'link',
      newTab: true,
    },
    data: [
      {
        id: 'career-advice',
        href: '/resources/blog/tag/career/',
        text: 'Career advice',
        description: 'Get answers to questions about coding careers.',
        trackingTarget: 'topnav_resources_inspiration_career_advice',
        type: 'link',
        newTab: true,
      },
      {
        id: 'learning-tips',
        href: '/resources/blog/tag/learning/',
        text: 'Learning tips',
        description: 'Learn where to start and how to stay motivated.',
        trackingTarget: 'topnav_resources_inspiration_learning_tips',
        type: 'link',
        newTab: true,
      },
    ],
  },
];
