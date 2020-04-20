import { select, number } from '@storybook/addon-knobs';
import { Logo } from '@codecademy/brand-components/src';
import { Column, LayoutGrid } from '@codecademy/gamut/src';
import React from 'react';

import { selectableColors } from '../helpers';
import {
  decoratedStories,
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../Templating';

export default decoratedStories('Brand', Logo);

const types = [
  'pro',
  'proAlt',
  'proLockup',
  'proMono',
  'premium',
  'program',
  'default',
] as const;

export const logo = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Our proud logo. There is no &apos;a&apos; in the middle.
      <br />
      Use sparingly, and make sure it has a lot of visual disinction to stand
      out appropriately.
    </StoryDescription>
    <LayoutGrid columnGap="sm" rowGap="sm">
      {types.map(type => (
        <Column size={4} key={type}>
          <Logo height={256} type={type} width={256} />
        </Column>
      ))}
    </LayoutGrid>
  </StoryTemplate>
));

export const logoPlayground = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Variants of the Codecademy logo you can play around with. For now, use{' '}
      <code>style.color</code> to change the color of the logo.
    </StoryDescription>
    <Logo
      width={number('width', 256)}
      height={number('height', undefined)}
      type={select('type', types, 'default')}
      style={{
        color: select('color', selectableColors, selectableColors.black),
      }}
    />
  </StoryTemplate>
));
