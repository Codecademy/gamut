type ResourcesList = {
  href: string;
  trackingTarget: string;
  text: string;
};

export const resourcesList: ResourcesList[] = [
  {
    href: '/resources/docs',
    trackingTarget: 'docs',
    text: 'Docs',
  },
  {
    href: '/resources/cheatsheets/all',
    trackingTarget: 'cheatsheets_home',
    text: 'Cheatsheets',
  },
  {
    href: '/projects',
    trackingTarget: 'projects',
    text: 'Projects',
  },
  {
    href: '/articles',
    trackingTarget: 'articles',
    text: 'Articles',
  },
  {
    href: 'https://codecademy.com/resources/blog',
    trackingTarget: 'blog',
    text: 'Blog',
  },
];
