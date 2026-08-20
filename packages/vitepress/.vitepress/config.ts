import { defineConfig } from 'vitepress';

// Sidebar/nav structure mirrors ADR 0001's information architecture:
// docs/adr/0001-documentation-site-information-architecture.md
export default defineConfig({
  title: 'Gamut',
  description: "Codecademy's design system documentation",
  cleanUrls: true,
  ignoreDeadLinks: true,

  themeConfig: {
    nav: [
      { text: 'Getting started', link: '/getting-started/installation' },
      { text: 'Guides', link: '/guides/' },
      { text: 'Components', link: '/components/' },
      { text: 'Reference', link: '/reference/' },
      { text: 'Concepts', link: '/concepts/' },
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting started',
          items: [
            { text: 'Installation', link: '/getting-started/installation' },
            {
              text: 'Build your first page',
              link: '/getting-started/build-your-first-page',
            },
            {
              text: 'Using this site',
              link: '/getting-started/using-this-site',
            },
          ],
        },
      ],

      '/guides/': [
        {
          text: 'Guides',
          items: [
            { text: 'Overview', link: '/guides/' },
            { text: 'Theming your app', link: '/guides/theming-your-app' },
            { text: 'Building forms', link: '/guides/building-forms' },
            {
              text: 'Supporting dark mode',
              link: '/guides/supporting-dark-mode',
            },
            { text: 'Writing UX copy', link: '/guides/writing-ux-copy' },
            {
              text: 'Migrating to logical properties',
              link: '/guides/migrating-to-logical-properties',
            },
            {
              text: 'Contributing to Gamut',
              link: '/guides/contributing-to-gamut',
            },
          ],
        },
      ],

      '/components/': [
        { text: 'All components', link: '/components/' },
        {
          text: 'Actions',
          items: [
            { text: 'Overview', link: '/components/actions/' },
            { text: 'FillButton', link: '/components/actions/fill-button' },
            { text: 'StrokeButton', link: '/components/actions/stroke-button' },
            { text: 'TextButton', link: '/components/actions/text-button' },
            { text: 'Button', link: '/components/actions/button' },
            { text: 'CTAButton', link: '/components/actions/cta-button' },
            { text: 'IconButton', link: '/components/actions/icon-button' },
            { text: 'Menu', link: '/components/actions/menu' },
            { text: 'Tag', link: '/components/actions/tag' },
          ],
        },
        {
          text: 'Containers',
          items: [{ text: 'Overview', link: '/components/containers/' }],
        },
        {
          text: 'Inputs & forms',
          items: [{ text: 'Overview', link: '/components/inputs-and-forms/' }],
        },
        {
          text: 'Navigation',
          items: [{ text: 'Overview', link: '/components/navigation/' }],
        },
        {
          text: 'Feedback',
          items: [{ text: 'Overview', link: '/components/feedback/' }],
        },
        {
          text: 'Status',
          items: [{ text: 'Overview', link: '/components/status/' }],
        },
        {
          text: 'Overlays',
          items: [{ text: 'Overview', link: '/components/overlays/' }],
        },
        {
          text: 'Data display',
          items: [{ text: 'Overview', link: '/components/data-display/' }],
        },
        {
          text: 'Typography',
          items: [{ text: 'Overview', link: '/components/typography/' }],
        },
        {
          text: 'Media & assets',
          items: [{ text: 'Overview', link: '/components/media-and-assets/' }],
        },
        {
          text: 'Utilities',
          items: [{ text: 'Overview', link: '/components/utilities/' }],
        },
      ],

      '/reference/': [
        {
          text: 'Reference',
          items: [{ text: 'Overview', link: '/reference/' }],
        },
      ],

      '/concepts/': [
        {
          text: 'Concepts',
          items: [{ text: 'Overview', link: '/concepts/' }],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Codecademy/gamut' },
    ],

    search: {
      provider: 'local',
    },
  },
});
