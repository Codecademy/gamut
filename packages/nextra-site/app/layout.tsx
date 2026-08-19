import 'nextra-theme-docs/style.css';

import type { Metadata } from 'next';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';

export const metadata: Metadata = {
  title: {
    default: 'Gamut',
    template: '%s – Gamut',
  },
  description: "Codecademy's design system documentation",
};

const navbar = (
  <Navbar
    logo={<b>Gamut</b>}
    projectLink="https://github.com/Codecademy/gamut"
  />
);

const footer = (
  <Footer>
    MIT {new Date().getFullYear()} © Codecademy. Built from{' '}
    <a href="https://github.com/Codecademy/gamut/blob/main/docs/adr/0001-documentation-site-information-architecture.md">
      ADR 0001
    </a>
    .
  </Footer>
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/Codecademy/gamut/tree/main/packages/nextra-site"
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
