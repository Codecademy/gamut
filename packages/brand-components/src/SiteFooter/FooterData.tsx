export const footerData = {
  urls: {
    nav: {
      company: {
        about: '/about',
        codecademy_for_business: '/business',
        shop: 'https://shop.codecademy.com',
        stories: '/stories',
        jobs: '/about/careers',
      },
      resources: {
        beta_catalog: '/beta-catalog/subject/beta',
        articles: '/articles',
        forums: 'https://discuss.codecademy.com/',
        help: '/help',
        blog: '/blog',
        roadmap: 'https://trello.com/b/vAgDXtT6/codecademy-releases-roadmap',
      },
    },
    legal: {
      policy: '/policy',
      data_privacy:
        'https://help.codecademy.com/hc/en-us/requests/new?ticket_form_id=360002689273',
      terms: '/terms',
    },
  },
  filters: {
    language: {
      filter_order: [
        'html-css',
        'python',
        'javascript',
        'java',
        'sql',
        'bash',
        'ruby',
        'c-plus-plus',
        'r',
        'c-sharp',
        'php',
        'go',
        'swift',
      ],
      names: {
        'html-css': 'HTML & CSS',
        python: 'Python',
        javascript: 'JavaScript',
        java: 'Java',
        sql: 'SQL',
        bash: 'Bash/Shell',
        ruby: 'Ruby',
        'c-plus-plus': 'C++',
        r: 'R',
        'c-sharp': 'C#',
        php: 'PHP',
        go: 'Go',
        swift: 'Swift',
      },
    },
    subject: {
      filter_order: [
        'all',
        'web-development',
        'programming',
        'data-science',
        'partnerships',
        'design',
        'game-development',
      ],
      names: {
        all: 'Full Catalog',
        'web-development': 'Web Development',
        programming: 'Programming',
        'data-science': 'Data Science',
        partnerships: 'Partnerships',
        design: 'Design',
        'game-development': 'Game Development',
      },
    },
  },
};

export type FooterData = typeof footerData;

export type FooterCatalogLinkFilters = FooterData['filters'];

export type FooterCatalogLinkFilter = FooterCatalogLinkFilters['language'];

export type FooterUrlProps = FooterData['urls'];

export type FooterLegalUrls = FooterUrlProps['legal'];

export type FooterLinksUrls = FooterUrlProps['nav'];
