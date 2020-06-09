import { Column } from '@codecademy/gamut/src';
import { styled } from '@storybook/theming';
import { colors } from '@codecademy/gamut-styles/utils/variables';

// The normal import would be '@storybook/addon-links/react'
// but it is throwing a typescript error in the current alpha
import LinkTo from '@storybook/addon-links/dist/react/components/link';
import React from 'react';

export type Section = 'Atoms' | 'Molecules' | 'Organisms' | 'Foundations';

export type ExampleShape = {
  name: string;
  kind: string;
  text?: string;
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

const Heading = styled.h2`
  border-bottom: 1px solid ${colors.gray[200]};
  color: ${colors.gray[600]};
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
  category,
  story = 'About',
  label = 'Examples',
  title = kind || category,
}) => {
  const kindLink = [category, kind].filter(Boolean).join('|');
  return (
    <Column size={{ xs: 12, sm: 6, md: 4 }}>
      <div>
        <Heading>
          <LinkTo kind={kindLink} story={story}>
            <span role="presentation">{emoji}</span> {title}
          </LinkTo>
        </Heading>
        <Text>{children}</Text>
        {examples && (
          <Text>
            {label}:{' '}
            {examples.map((example, i) => {
              const exampleLink = [category, example.kind]
                .filter(Boolean)
                .join('|');
              return (
                <React.Fragment key={example.name}>
                  <LinkTo kind={exampleLink} story={example.name}>
                    {example.text || example.name}
                  </LinkTo>
                  {i !== examples.length - 1 && ', '}
                </React.Fragment>
              );
            })}
          </Text>
        )}
      </div>
    </Column>
  );
};

export default AboutCell;
