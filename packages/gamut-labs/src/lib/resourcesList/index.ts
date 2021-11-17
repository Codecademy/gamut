import { AppHeaderLinkItem } from '../../AppHeader/AppHeaderElements/types';

type ResourcesList = Omit<AppHeaderLinkItem, 'trackingTarget'> & {
  headerTrackingTarget: string;
  footerTrackingTarget: string;
};

type FooterResourceList = {
  id: string;
  href: string;
  trackingTarget: string;
  text: string;
  newTab?: boolean;
};

export const resourcesList: ResourcesList[] = [
  {
    id: 'challenges',
    href: '/code-challenges',
    footerTrackingTarget: 'challenges',
    headerTrackingTarget: 'topnav_resources_challenges',
    text: 'Challenges',
    type: 'link',
    newBadge: false,
  },
  {
    id: 'docs',
    href: '/resources/docs',
    footerTrackingTarget: 'docs',
    headerTrackingTarget: 'topnav_resources_docs',
    text: 'Docs',
    type: 'link',
    newBadge: false,
  },
  {
    id: 'cheatsheets',
    href: '/resources/cheatsheets/all',
    footerTrackingTarget: 'cheatsheets_home',
    headerTrackingTarget: 'topnav_resources_cheatsheets',
    text: 'Cheatsheets',
    type: 'link',
    newBadge: false,
  },
  {
    id: 'articles',
    href: '/articles',
    footerTrackingTarget: 'articles',
    headerTrackingTarget: 'topnav_resources_articles',
    text: 'Articles',
    type: 'link',
    newBadge: false,
  },
  {
    id: 'blog',
    href: 'https://codecademy.com/resources/blog',
    footerTrackingTarget: 'blog',
    headerTrackingTarget: 'topnav_resources_blog',
    text: 'Blog',
    newTab: true,
    type: 'link',
    newBadge: false,
  },
  {
    id: 'projects',
    href: '/projects',
    footerTrackingTarget: 'projects',
    headerTrackingTarget: 'topnav_resources_projects',
    text: 'Projects',
    type: 'link',
    newBadge: false,
  },
  {
    id: 'career-center',
    href: '/pages/career-center',
    footerTrackingTarget: 'career_center',
    headerTrackingTarget: 'topnav_resources_career_center',
    text: 'Career Center',
    type: 'link',
    newBadge: false,
  },
];

export const headerResourcesList: AppHeaderLinkItem[] = resourcesList.map(
  ({ id, href, headerTrackingTarget, text, type, newTab, newBadge }) => ({
    id,
    href,
    trackingTarget: headerTrackingTarget,
    text,
    type,
    newTab,
    newBadge,
  })
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
