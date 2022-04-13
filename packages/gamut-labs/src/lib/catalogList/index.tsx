import { AppHeaderCatalogDataItem } from '../../AppHeader/AppHeaderElements/types';

export const catalogList: AppHeaderCatalogDataItem[] = [
  {
    title: 'Top career paths',
    description: 'Land an entry-level role in tech with step-by-step guidance.',
    requiresCareerAccess: true,
    data: [
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
    data: [
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
    data: [
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
    ? catalogList.filter((item) => !item.requiresCareerAccess)
    : catalogList;
};
