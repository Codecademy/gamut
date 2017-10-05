import React from 'react';
import marked from 'marked'
import { storiesOf } from '@kadira/storybook';
import Colors from './Colors';
import Type from './Type';
import FlexGrid from './FlexGrid';

const stories = storiesOf('Visuals')
  .addWithInfo('About Visuals', () =>
    <div
      dangerouslySetInnerHTML={{__html: marked(`
        Visuals are the general style definitions. They include colors, type, etc.
      `)}}
    />
  )
  .addWithInfo(Colors.title, Colors.story, Colors.options)
  .addWithInfo(Type.title, Type.story, Type.options)
  .addWithInfo(FlexGrid.title, FlexGrid.story, FlexGrid.options);
