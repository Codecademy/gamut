import { setupRtl } from '@codecademy/gamut-tests';

import { SelectDropdown } from '../SelectDropdown';

const renderView = setupRtl(SelectDropdown, {
  options: [],
  name: 'colors',
});

/** There is a state pollution issue with SelectDropdown and jest which is why these are broken up into their own file.
 *  Ticket to fix: https://skillsoftdev.atlassian.net/browse/GM-1297
 */

describe('SelectDropdown edge cases', () => {
  it('handles empty options gracefully', () => {
    const { view } = renderView({
      value: 'any',
    });

    // Should not crash and should show placeholder
    view.getByText('Select an option');
  });

  it('handles undefined options gracefully', () => {
    const { view } = renderView({
      options: undefined,
      value: 'any',
    });

    // Should not crash and should show placeholder
    view.getByText('Select an option');
  });
});
