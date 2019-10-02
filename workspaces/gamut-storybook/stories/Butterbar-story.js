import { Butterbar } from '@codecademy/gamut';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { ButterbarStyle } from '@codecademy/gamut/dist/Butterbar';
import { AlertIcon } from '@codecademy/gamut-icons';
import styles from './Butterbar-story.scss';

storiesOf('Component/Butterbar', module)
  .add('Default Butterbar (Full Width)', () => (
    <Butterbar>Some butterbar content!</Butterbar>
  ))
  .add('Default Butterbar with Icon (Full Width)', () => (
    <Butterbar icon={<AlertIcon className={styles.icon} />}>
      Some butterbar content!
    </Butterbar>
  ))
  .add('Butterbar with Bottom Border', () => (
    <Butterbar displayStyle={ButterbarStyle.BorderBottom}>
      Some butterbar content!
    </Butterbar>
  ));
