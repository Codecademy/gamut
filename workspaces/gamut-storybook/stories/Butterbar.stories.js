import { Butterbar } from 'gamut';
import React from 'react';
import { ButterbarStyle } from 'gamut/Butterbar';
import { AlertIcon } from '@codecademy/gamut-icons';
import styles from './Butterbar-story.scss';

export default {
  component: Butterbar,
  title: 'Component/Butterbar',
};

export const defaultButterbarFullWidth = () => (
  <Butterbar>Some butterbar content!</Butterbar>
);

defaultButterbarFullWidth.story = {
  name: 'Default Butterbar (Full Width)',
};

export const defaultButterbarWithIconFullWidth = () => (
  <Butterbar icon={<AlertIcon className={styles.icon} />}>
    Some butterbar content!
  </Butterbar>
);

defaultButterbarWithIconFullWidth.story = {
  name: 'Default Butterbar with Icon (Full Width)',
};

export const butterbarWithBottomBorder = () => (
  <Butterbar displayStyle={ButterbarStyle.BorderBottom}>
    Some butterbar content!
  </Butterbar>
);

butterbarWithBottomBorder.story = {
  name: 'Butterbar with Bottom Border',
};
