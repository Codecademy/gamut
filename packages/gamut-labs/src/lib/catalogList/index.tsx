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
        id: 'back-end-engineer-career-path',
        href: '/learn/paths/back-end-engineer-career-path',
        trackingTarget: 'topnav_catalog_career_back-end-engineer',
        text: 'Back-End Engineer',
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
      {
        id: 'data-science',
        href: '/learn/paths/data-science',
        trackingTarget: 'topnav_catalog_career_data_science',
        text: 'Data Scientist: Machine Learning Specialist',
        type: 'link',
      },
      {
        id: 'data-analyst',
        href: '/learn/paths/data-analyst',
        trackingTarget: 'topnav_catalog_career_data_analyst',
        text: 'Data Scientist: Analytics Specialist',
        type: 'link',
      },
    ],
  },
  {
    title: 'Popular languages and subjects',
    description: 'Find courses in languages or subjects that interest you.',
    data: [
      {
        id: 'top-languages',
        text: 'Top Languages',
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
        id: 'sql',
        href: '/catalog/language/sql',
        trackingTarget: 'topnav_catalog_skill_sql',
        text: 'SQL',
        type: 'link',
      },
      {
        id: 'java',
        href: '/catalog/language/java',
        trackingTarget: 'topnav_catalog_skill_java',
        text: 'Java',
        type: 'link',
      },
      {
        id: 'c-plus-plus',
        href: '/catalog/language/c-plus-plus',
        trackingTarget: 'topnav_catalog_skill_c-plus-plus',
        text: 'C++',
        type: 'link',
      },
      {
        id: 'c-sharp',
        href: '/catalog/language/c-sharp',
        trackingTarget: 'topnav_catalog_skill_c-sharp',
        text: 'C#',
        type: 'link',
      },
      {
        id: 'bash',
        href: '/catalog/language/bash',
        trackingTarget: 'topnav_catalog_skill_bash',
        text: 'Bash',
        type: 'link',
      },
      {
        id: 'c',
        href: '/catalog/language/c',
        trackingTarget: 'topnav_catalog_skill_c',
        text: 'C',
        type: 'link',
      },
      {
        id: 'php',
        href: '/catalog/language/php',
        trackingTarget: 'topnav_catalog_skill_php',
        text: 'PHP',
        type: 'link',
      },
      {
        id: 'r',
        href: '/catalog/language/r',
        trackingTarget: 'topnav_catalog_skill_r',
        text: 'R',
        type: 'link',
      },
      {
        id: 'swift',
        href: '/catalog/language/swift',
        trackingTarget: 'topnav_catalog_skill_swift',
        text: 'Swift',
        type: 'link',
      },
      {
        id: 'top-subjects',
        text: 'Top Subjects',
        type: 'subheader',
      },
      {
        id: 'web-development',
        href: '/catalog/subject/web-development',
        trackingTarget: 'topnav_catalog_skill_web_development',
        text: 'Web Development',
        type: 'link',
      },
      {
        id: 'data-science',
        href: '/catalog/subject/data-science',
        trackingTarget: 'topnav_catalog_skill_data-science',
        text: 'Data Science',
        type: 'link',
      },
      {
        id: 'computer-science',
        href: '/catalog/subject/computer-science',
        trackingTarget: 'topnav_catalog_skill_computer-science',
        text: 'Computer Science',
        type: 'link',
      },
      {
        id: 'web-design',
        href: '/catalog/subject/web-design',
        trackingTarget: 'topnav_catalog_skill_web-design',
        text: 'Web Design',
        type: 'link',
      },
      {
        id: 'cybersecurity',
        href: '/catalog/subject/cybersecurity',
        trackingTarget: 'topnav_catalog_skill_cybersecurity',
        text: 'Cybersecurity',
        type: 'link',
      },
      {
        id: 'machine-learning',
        href: '/catalog/subject/machine-learning',
        trackingTarget: 'topnav_catalog_skill_machine-learning',
        text: 'Machine Learning',
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
