import { AriaOnFocus } from 'react-select';

import { ExtendedOption } from '../types';
import { SelectDropdownTranslations } from './translations';

/**
 * Builds react-select's `onFocus` aria-live handler from the translated
 * `focusedOptionAnnouncement`, adapting the focused option to the translation fn.
 */
export const createOnFocus =
  (
    announce: SelectDropdownTranslations['focusedOptionAnnouncement']
  ): AriaOnFocus<ExtendedOption> =>
  ({ focused: { label, subtitle, rightLabel, disabled } }) =>
    announce({ label, subtitle, rightLabel, disabled });
