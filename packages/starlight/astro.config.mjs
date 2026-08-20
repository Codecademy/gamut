import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// Sidebar structure follows docs/adr/0001-documentation-site-information-architecture.md.
// Top level maps to Diátaxis modes: Getting started (tutorials), Guides (how-to),
// Components + Reference (reference), Concepts (explanation).
export default defineConfig({
  site: 'https://gamut.codecademy.com',
  server: {
    port: 3333,
  },
  vite: {
    ssr: {
      // CommonJS modules imported with named imports inside @codecademy/gamut.
      // Vite must bundle (rather than externalize) them during dev SSR to
      // generate the named-export interop; without this the dev server fails
      // with "[vite] Named export '…' not found".
      noExternal: ['react-use'],
    },
  },
  integrations: [
    react(),
    starlight({
      title: 'Gamut',
      description: "Codecademy's design system for the web",
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Codecademy/gamut',
        },
      ],
      editLink: {
        baseUrl:
          'https://github.com/Codecademy/gamut/edit/main/packages/starlight/',
      },
      sidebar: [
        {
          label: 'Getting started',
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Components',
          items: [
            {
              label: 'Overview',
              slug: 'components',
            },
            {
              label: 'Actions',
              autogenerate: { directory: 'components/actions' },
            },
            {
              label: 'Containers',
              autogenerate: { directory: 'components/containers' },
            },
            {
              label: 'Inputs & forms',
              autogenerate: { directory: 'components/inputs-and-forms' },
            },
            {
              label: 'Navigation',
              autogenerate: { directory: 'components/navigation' },
            },
            {
              label: 'Feedback',
              autogenerate: { directory: 'components/feedback' },
            },
            {
              label: 'Status',
              autogenerate: { directory: 'components/status' },
            },
            {
              label: 'Overlays',
              autogenerate: { directory: 'components/overlays' },
            },
            {
              label: 'Data display',
              autogenerate: { directory: 'components/data-display' },
            },
            {
              label: 'Typography',
              autogenerate: { directory: 'components/typography' },
            },
            {
              label: 'Media & assets',
              autogenerate: { directory: 'components/media-and-assets' },
            },
            {
              label: 'Utilities',
              autogenerate: { directory: 'components/utilities' },
            },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
        {
          label: 'Concepts',
          autogenerate: { directory: 'concepts' },
        },
      ],
    }),
  ],
});
