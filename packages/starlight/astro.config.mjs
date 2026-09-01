import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import liveCode from 'astro-live-code';
import starlightSidebarTopics from 'starlight-sidebar-topics';

// Sidebar structure follows docs/adr/0001-documentation-site-information-architecture.md.
// Top level maps to Diátaxis modes: Getting started (tutorials), Guides (how-to),
// Components + Reference (reference), Concepts (explanation).
// Each top-level section is its own topic (starlight-sidebar-topics), so its
// sidebar replaces the others instead of all five being stacked in one long list.
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
    liveCode(),
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
      customCss: ['./src/styles/gamut-core-theme.css'],
      plugins: [
        starlightSidebarTopics(
          [
            {
              label: 'Getting started',
              icon: 'rocket',
              link: '/getting-started/installation/',
              items: [{ autogenerate: { directory: 'getting-started' } }],
            },
            {
              label: 'Guides',
              icon: 'open-book',
              link: '/guides/',
              items: [{ autogenerate: { directory: 'guides' } }],
            },
            {
              label: 'Components',
              icon: 'puzzle',
              link: '/components/',
              items: [
                {
                  label: 'Overview',
                  slug: 'components',
                },
                {
                  label: 'Actions',
                  items: [
                    { autogenerate: { directory: 'components/actions' } },
                  ],
                },
                {
                  label: 'Containers',
                  items: [
                    { autogenerate: { directory: 'components/containers' } },
                  ],
                },
                {
                  label: 'Inputs & forms',
                  items: [
                    {
                      autogenerate: {
                        directory: 'components/inputs-and-forms',
                      },
                    },
                  ],
                },
                {
                  label: 'Navigation',
                  items: [
                    { autogenerate: { directory: 'components/navigation' } },
                  ],
                },
                {
                  label: 'Feedback',
                  items: [
                    { autogenerate: { directory: 'components/feedback' } },
                  ],
                },
                {
                  label: 'Status',
                  items: [{ autogenerate: { directory: 'components/status' } }],
                },
                {
                  label: 'Overlays',
                  items: [
                    { autogenerate: { directory: 'components/overlays' } },
                  ],
                },
                {
                  label: 'Data display',
                  items: [
                    {
                      autogenerate: { directory: 'components/data-display' },
                    },
                  ],
                },
                {
                  label: 'Typography',
                  items: [
                    { autogenerate: { directory: 'components/typography' } },
                  ],
                },
                {
                  label: 'Media & assets',
                  items: [
                    {
                      autogenerate: {
                        directory: 'components/media-and-assets',
                      },
                    },
                  ],
                },
                {
                  label: 'Utilities',
                  items: [
                    { autogenerate: { directory: 'components/utilities' } },
                  ],
                },
              ],
            },
            {
              label: 'Reference',
              icon: 'information',
              link: '/reference/',
              items: [{ autogenerate: { directory: 'reference' } }],
            },
            {
              label: 'Concepts',
              icon: 'document',
              link: '/concepts/',
              items: [{ autogenerate: { directory: 'concepts' } }],
            },
          ],
          {
            // The splash-template homepage has no topic of its own.
            exclude: ['/'],
          }
        ),
      ],
    }),
  ],
});
