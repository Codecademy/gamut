import React from 'react';
import marked from 'marked';
import { storiesOf, action } from '@kadira/storybook';
import Button from './Button';
import Spinner from './Spinner';
import Form from './Form';
import Tabs from './Tabs';

const stories = storiesOf('Components')
  .addWithInfo('About Components', () => (
    <div
      dangerouslySetInnerHTML={{__html: marked(`
        Components are modular elements that can be used across our app. They include buttons, cards, etc.

        Requirements for components:
        1. placeholder
      `)}}
    />
  ))
  .addWithInfo(Button.title, Button.story, Button.options)
  .addWithInfo(Form.title, Form.story, Form.options)
  .addWithInfo(Spinner.title, Spinner.story, Spinner.options)
  .addWithInfo(Tabs.title, Tabs.story, Tabs.options);
