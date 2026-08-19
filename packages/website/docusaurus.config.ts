import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Gamut',
  tagline: "Codecademy's design system",
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // TODO: point at the real deployed URL once this site has a home.
  url: 'https://gamut.codecademy.com',
  baseUrl: '/',

  organizationName: 'Codecademy',
  projectName: 'gamut',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: ['@docusaurus/theme-live-codeblock'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl:
            'https://github.com/Codecademy/gamut/tree/main/packages/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Gamut',
      logo: {
        alt: 'Gamut logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'getting-started/installation',
          position: 'left',
          label: 'Getting started',
        },
        {
          type: 'doc',
          docId: 'guides/theming-your-app',
          position: 'left',
          label: 'Guides',
        },
        {
          type: 'doc',
          docId: 'components/index',
          position: 'left',
          label: 'Components',
        },
        {
          type: 'doc',
          docId: 'reference/design-tokens',
          position: 'left',
          label: 'Reference',
        },
        {
          type: 'doc',
          docId: 'concepts/architecture-of-the-system',
          position: 'left',
          label: 'Concepts',
        },
        {
          href: 'https://github.com/Codecademy/gamut',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting started', to: '/getting-started/installation' },
            { label: 'Components', to: '/components' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/Codecademy/gamut' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Codecademy. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
