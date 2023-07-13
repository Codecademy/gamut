import { setupRtl } from '@codecademy/gamut-tests';

import { TestimonialDeprecated } from '..';

const renderView = setupRtl(TestimonialDeprecated, {
  firstName: 'Frank',
  lastName: 'Reynolds',
  occupation: "Co-Owner @ Paddy's Pub",
  quote:
    "I don't know how many years on this Earth I got left, I'm gonna get real weird with it.",
});

describe('TestimonialDeprecated', () => {
  it('renders the Avatar component when an imageUrl prop is present', () => {
    const { view } = renderView({
      imageUrl: 'someCoolUrl',
      mode: 'dark',
    });

    view.getByTestId('avatar-container');
  });

  it('does _not_ render the Avatar component when an imageUrl prop is _not_ present', () => {
    const { view } = renderView({
      mode: 'dark',
    });

    expect(view.queryByTestId('avatar-container')).toBeNull();
  });
});
