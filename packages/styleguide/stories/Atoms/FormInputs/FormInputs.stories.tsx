import {
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Select,
  TextArea,
} from '@codecademy/gamut/src';
import {
  select as selectKnob,
  boolean,
  number,
  withKnobs,
} from '@storybook/addon-knobs';
import React from 'react';

import {
  StoryStatus,
  StoryTemplate,
  StoryDescription,
  decoratedStory,
} from '../../Templating';
import styles from './styles.module.scss';

export default {
  title: 'Gamut|Atoms/Form Inputs',
  component: 'Form Inputs',
  decorators: [withKnobs],
};

export const formInputs = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Input atoms tied 1:1 with values to be submitted in a form.
      <br />
      You should generally never use these directly as a Gamut consumer;
      instead, use <code>GridForm</code> to auto-generate these for you.
    </StoryDescription>
  </StoryTemplate>
));

export const checkbox = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>Toggles a named boolean input value.</StoryDescription>
    <div>
      <Checkbox htmlFor="html-css" label="HTML & CSS" />
      <Checkbox htmlFor="javascript" label="JavaScript" />
      <Checkbox htmlFor="ruby" label="Ruby" />
    </div>
  </StoryTemplate>
));

export const input = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Sets a short-form text-based value. It can be configured as a native HTML{' '}
      <code>&lt;input/&gt;</code>, such as limiting to numbers.
      <br />
      If the <code>error</code> prop is passed, it has a red outline.
    </StoryDescription>
    <div className={styles.inputArea}>
      <Input
        htmlFor="name"
        defaultValue="Default value"
        error={boolean('error', false)}
        type={selectKnob('type', ['number', 'text'], 'text')}
      />
    </div>
  </StoryTemplate>
));

export const radioGroup = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Sets a value to one of a finite set of known values.
    </StoryDescription>
    <RadioGroup
      htmlForPrefix="why-are-you-learning"
      name="why-are-you-learning"
    >
      <Radio
        label="Skills to communicate with developers and other technical people"
        value="skills"
      />
      <Radio
        label="A better understanding of web development in general"
        value="understanding"
      />
    </RadioGroup>
  </StoryTemplate>
));

export const select = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Chooses a single value from multiple predefined values.
    </StoryDescription>
    <div className={styles.inputArea}>
      <Select
        htmlFor="select"
        options={['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Eggplant']}
      />
    </div>
  </StoryTemplate>
));

export const textArea = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Sets a long-form text-based value. It can be configured as a native HTML{' '}
      <code>&lt;textarea/&gt;</code>, such as adjusting number of rows.
      <br />
      If the <code>error</code> prop is passed, it has a red outline.
    </StoryDescription>
    <div className={styles.inputArea}>
      <TextArea
        htmlFor="about"
        error={boolean('error', false)}
        rows={number('rows', 8)}
      />
    </div>
  </StoryTemplate>
));
