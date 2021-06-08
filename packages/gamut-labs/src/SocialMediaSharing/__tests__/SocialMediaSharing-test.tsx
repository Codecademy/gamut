import { setupRtl } from '@codecademy/gamut-tests';

import { SOCIAL_SHARING_PLATFORMS, SocialMediaSharing } from '..';

const url = 'https://easytofindurl.com';
const renderView = setupRtl(SocialMediaSharing, { url });

describe('SocialMediaSharing', () => {
  it('Renders share links when just given a URL', () => {
    const { view } = renderView();
    expect(view.getAllByRole('link')).toHaveLength(
      SOCIAL_SHARING_PLATFORMS.length
    );
  });

  it('Displays the contents of label prop', () => {
    const label = 'Easy to find label text';
    const { view } = renderView({ label });
    view.getByText(label);
  });

  it('Does not render element for label prop if label prop is undefined', () => {
    const { view } = renderView();
    expect(view.queryByTestId('social-sharing-label')).toBeNull();
  });

  it('Allows a sectionID to be passed down to each icon useful for when more than one component is needed for a11y reasons', () => {
    const { view } = renderView({ sectionId: 'header' });
    expect(
      view.container.querySelectorAll('[aria-labelledby*="header"]')
    ).toHaveLength(SOCIAL_SHARING_PLATFORMS.length);
  });
});
