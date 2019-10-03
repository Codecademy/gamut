import { AlertIcon } from '@codecademy/gamut-icons';
import React from 'react';
import { Butterbar, ButterbarStyle } from './';

export default {
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
