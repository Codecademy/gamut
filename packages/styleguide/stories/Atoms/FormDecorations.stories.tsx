import React from 'react';
import { FormGroupDescription, FormGroupLabel } from '@codecademy/gamut/src';

import {
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../Templating';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Gamut|Atoms/Form Decorations',
  component: 'Form Decorations',
  decorators: [withKnobs],
};

export const formInputs = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Ancillary descriptions for input atoms tied 1:1 with values to be
      submitted in a form.
      <br />
      You should generally never use these directly as a Gamut consumer;
      instead, use <code>GridForm</code> to auto-generate these for you.
    </StoryDescription>
  </StoryTemplate>
));

export const formGroupDescription = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Longer form label visually associated with any form input atom.
    </StoryDescription>
    <FormGroupDescription>
      Secure, unique password for your account.
    </FormGroupDescription>
  </StoryTemplate>
));

export const formGroupLabel = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Primary label visually associated with any form input atom.
    </StoryDescription>
    <FormGroupLabel>Password</FormGroupLabel>
  </StoryTemplate>
));
