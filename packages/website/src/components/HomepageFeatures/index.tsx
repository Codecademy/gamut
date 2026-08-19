import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import type { ReactNode } from 'react';

import styles from './styles.module.css';

type SectionItem = {
  title: string;
  mode: string;
  description: ReactNode;
  to: string;
};

const SectionList: SectionItem[] = [
  {
    title: 'Getting started',
    mode: 'Tutorial',
    description: 'Go from zero to a working page.',
    to: '/getting-started/installation',
  },
  {
    title: 'Guides',
    mode: 'How-to',
    description: 'Accomplish a specific task — theming, forms, dark mode.',
    to: '/guides/theming-your-app',
  },
  {
    title: 'Components',
    mode: 'Reference',
    description: 'Every component, grouped by what it does.',
    to: '/components/',
  },
  {
    title: 'Reference',
    mode: 'Reference',
    description: 'Design tokens, themes, system props, tooling.',
    to: '/reference/design-tokens',
  },
  {
    title: 'Concepts',
    mode: 'Explanation',
    description: 'Why Gamut works the way it does.',
    to: '/concepts/architecture-of-the-system',
  },
];

function Section({ title, mode, description, to }: SectionItem) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <Link to={to} className={styles.card}>
        <span className={styles.cardMode}>{mode}</span>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {SectionList.map((props) => (
            <Section key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
