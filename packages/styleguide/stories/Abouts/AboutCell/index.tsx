import { Column } from '@codecademy/gamut/src';
// The normal import would be '@storybook/addon-links/react'
// but it is throwing a typescript error in the current alpha
import LinkTo from '@storybook/addon-links/dist/react/components/link';
import React from 'react';

import { Section } from '../../Templating';
import styles from './styles.module.scss';

export type AboutCellProps = {
  emoji: string;
  examples?: string[];
  kind: Section;
  story?: string;
  title?: string;
};

export const AboutCell: React.FC<AboutCellProps> = ({
  children,
  emoji,
  examples,
  kind,
  story = 'About',
  title = kind,
}) => {
  return (
    <Column className={styles.aboutCell} size={{ xs: 12, sm: 6, md: 4 }}>
      <h2 className={styles.heading}>
        <LinkTo kind={kind} story={story}>
          <span role="presentation">{emoji}</span> {title}
        </LinkTo>
      </h2>
      <p className={styles.children}>{children}</p>
      {examples && (
        <div className={styles.examples}>
          Examples:{' '}
          {examples.map((example, i) => (
            <React.Fragment key={example}>
              <LinkTo kind={title} story={example}>
                {example}
              </LinkTo>
              {i !== examples.length - 1 && ', '}
            </React.Fragment>
          ))}
        </div>
      )}
    </Column>
  );
};

export default AboutCell;
