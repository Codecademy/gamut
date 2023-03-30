import { Badge } from '@codecademy/gamut';

import {
  AppFooterResourcesDataItem,
  AppHeaderResourcesDataItem,
} from '../../AppHeader/AppHeaderElements/types';

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

export const footerResourcesList: AppFooterResourcesDataItem[] = [
  {
    id: 'articles',
    href: '/articles',
    trackingTarget: 'articles',
    text: 'Articles',
  },
  {
    id: 'blog',
    href: 'https://codecademy.com/resources/blog',
    trackingTarget: 'blog',
    text: 'Blog',
    newTab: true,
  },
  {
    id: 'cheatsheets',
    href: '/resources/cheatsheets/all',
    trackingTarget: 'cheatsheets_home',
    text: 'Cheatsheets',
  },
  {
    id: 'challenges',
    href: '/code-challenges',
    trackingTarget: 'challenges',
    text: 'Code challenges',
  },
  {
    id: 'docs',
    href: '/resources/docs',
    trackingTarget: 'docs',
    text: 'Docs',
  },
  {
    id: 'projects',
    href: '/projects',
    trackingTarget: 'projects',
    text: 'Projects',
  },
  {
    id: 'videos',
    href: '/resources/videos',
    trackingTarget: 'videos_homepage',
    text: 'Videos',
  },
  {
    id: 'workspaces',
    href: 'https://codecademy.com/pages/workspaces',
    trackingTarget: 'workspaces',
    text: 'Workspaces',
  },
];
export const headerResourcesList: AppHeaderResourcesDataItem[] = [
  {
    title: 'Docs',
    description:
      'Find definitions, code syntax, and more -- or contribute your own code documentation.',
    link: {
      text: 'View all docs',
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
      text: 'View all topics',
      href: '/resources/blog',
      id: 'view-all-inspiration',
      trackingTarget: 'topnav_resources_inspiration_all',
      type: 'link',
      newTab: true,
    },
    data: [
      {
        id: 'career-advice',
        href: '/resources/blog/category/career/',
        text: 'Career advice',
        description: 'Get answers to questions about coding careers.',
        trackingTarget: 'topnav_resources_inspiration_career_advice',
        type: 'link',
        newTab: true,
      },
      {
        id: 'learning-tips',
        href: '/resources/blog/category/learning-tips/',
        text: 'Learning tips',
        description: 'Learn where to start and how to stay motivated.',
        trackingTarget: 'topnav_resources_inspiration_learning_tips',
        type: 'link',
        newTab: true,
      },
    ],
  },
];
