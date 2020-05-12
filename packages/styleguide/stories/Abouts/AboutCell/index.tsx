import { Column } from '@codecademy/gamut/src';
// The normal import would be '@storybook/addon-links/react'
// but it is throwing a typescript error in the current alpha
import LinkTo from '@storybook/addon-links/dist/react/components/link';
import React from 'react';

import { Section } from '../../Templating';
import styles from './styles.module.scss';

export type ExampleShape = {
  name: string;
  kind: string;
};

export type AboutCellProps = {
  emoji: string;
  examples?: ExampleShape[];
  label?: string;
  kind: Section;
  story?: string;
  title?: string;
  category?: string;
};

export const AboutCell: React.FC<AboutCellProps> = ({
  children,
  emoji,
  examples,
  kind,
  category,
  label = 'Examples',
  story = 'About',
  title = kind || category,
}) => {
  const kindLink = [category, kind].filter(Boolean).join('|');
  return (
    <Column className={styles.aboutCell} size={{ xs: 12, sm: 6, md: 4 }}>
      <h2 className={styles.heading}>
        <LinkTo kind={kindLink} story={story}>
          <span role="presentation">{emoji}</span> {title}
        </LinkTo>
      </h2>
      <p className={styles.children}>{children}</p>
      {examples && (
        <div className={styles.examples}>
          {label}:{' '}
          {examples.map((example, i) => {
            const exampleLink = [category, example.kind]
              .filter(Boolean)
              .join('|');
            return (
              <React.Fragment key={example.name}>
                <LinkTo kind={exampleLink} story={example.name}>
                  {example.name || example}
                </LinkTo>
                {i !== examples.length - 1 && ', '}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </Column>
  );
};

export default AboutCell;
