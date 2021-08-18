type ResourcesList = {
  id: string;
  href: string;
  trackingTarget: string;
  text: string;
  newTab?: boolean;
};

export const resourcesList: ResourcesList[] = [
  {
    id: 'docs',
    href: '/resources/docs',
    trackingTarget: 'docs',
    text: 'Docs',
  },
  {
    id: 'cheatsheets',
    href: '/resources/cheatsheets/all',
    trackingTarget: 'cheatsheets_home',
    text: 'Cheatsheets',
  },
  {
    id: 'projects',
    href: '/projects',
    trackingTarget: 'projects',
    text: 'Projects',
  },
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
];
