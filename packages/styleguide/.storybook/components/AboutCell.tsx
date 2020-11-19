import { styled } from '@storybook/theming';
import { swatches } from '@codecademy/gamut-styles';

// The normal import would be '@storybook/addon-links/react'
// but it is throwing a typescript error in the current alpha
import LinkTo from '@storybook/addon-links/dist/react/components/link';
import React from 'react';

export type Kinds =
  | 'Atoms'
  | 'Molecules'
  | 'Organisms'
  | 'Foundations'
  | 'Layouts'
  | 'Meta';

export type AboutCellProps = {
  emoji: string;
  examples?: string[];
  label?: string;
  kind: Kinds;
  story?: string;
  title?: string;
  category?: string;
};

const Heading = styled.h2`
  border-bottom: 1px solid ${swatches.gray[200]};
  color: ${swatches.gray[600]};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.25rem;
`;

const Text = styled.p`
  font-size: 0.8rem;
`;

export const AboutCell: React.FC<AboutCellProps> = ({
  children,
  emoji,
  examples,
  kind,
  story = 'About',
  label = 'Examples',
  title = kind,
}) => {
  return (
    <div>
      <Heading>
        <LinkTo kind={kind} story={story}>
          <span role="presentation">{emoji}</span> {title}
        </LinkTo>
      </Heading>
      <Text>{children}</Text>
      {examples && (
        <Text>
          {label}:{' '}
          {examples.map((example, i) => {
            return (
              <React.Fragment key={example}>
                <LinkTo kind={kind} story={example}>
                  {example}
                </LinkTo>
                {i !== examples.length - 1 && ', '}
              </React.Fragment>
            );
          })}
        </Text>
      )}
    </div>
  );
};
