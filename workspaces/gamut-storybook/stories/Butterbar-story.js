import { Butterbar } from '@codecademy/gamut';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { ButterbarStyle } from '@codecademy/gamut/Butterbar';

storiesOf('Component/Butterbar', module)
  .add('Default Butterbar (Full Width)', () => (
    <Butterbar>Some butterbar content!</Butterbar>
  ))
  .add('Butterbar with Bottom Border', () => (
    <Butterbar displayStyle={ButterbarStyle.BorderBottom}>
      Some butterbar content!
    </Butterbar>
  ));
