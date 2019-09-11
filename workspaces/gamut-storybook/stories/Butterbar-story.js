import { Butterbar } from '@codecademy/gamut';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { ButterbarStyle } from '@codecademy/gamut/Butterbar';
import AlertIcon from '@codecademy/gamut/Icon/icons/AlertIcon.tsx';

storiesOf('Component/Butterbar', module)
  .add('Default Butterbar (Full Width)', () => (
    <Butterbar
      icon={AlertIcon}
      iconProps={{ style: { color: 'turquoise', backgroundColor: 'white' } }}
    >
      Some butterbar content!
    </Butterbar>
  ))
  .add('Butterbar with Bottom Border', () => (
    <Butterbar displayStyle={ButterbarStyle.BorderBottom}>
      Some butterbar content!
    </Butterbar>
  ));
