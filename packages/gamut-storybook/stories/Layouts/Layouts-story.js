import React from 'react';
import marked from 'marked';
import { storiesOf, action } from '@kadira/storybook';

const stories = storiesOf('Layouts')
  .addWithInfo('About Layouts', () => (
    <div
      dangerouslySetInnerHTML={{__html: marked(`
        Layouts are combinations of many components.
      `)}}
    />
  ))
