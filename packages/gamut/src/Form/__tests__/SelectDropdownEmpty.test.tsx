import { setupRtl } from '@codecademy/gamut-tests';

import { SelectDropdown } from '../SelectDropdown';

const renderView = setupRtl(SelectDropdown, {
  options: [],
  name: 'colors',
});

describe('SelectDropdown edge cases', () => {
  it('handles empty options gracefully', () => {
    const { view } = renderView({
      value: 'any',
    });

    // Should not crash and should show placeholder
    expect(view.getByText('Select an option')).toBeInTheDocument();
  });

  it('handles undefined options gracefully', () => {
    const { view } = renderView({
      options: undefined,
      value: 'any',
    });

    // Should not crash and should show placeholder
    expect(view.getByText('Select an option')).toBeInTheDocument();
  });
});
