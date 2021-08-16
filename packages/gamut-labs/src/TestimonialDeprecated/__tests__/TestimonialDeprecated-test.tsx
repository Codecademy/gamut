import { setupEnzyme } from '@codecademy/gamut-tests';

import { TestimonialDeprecated } from '..';

const exampleTestmonial = {
  firstName: 'Frank',
  lastName: 'Reynolds',
  occupation: "Co-Owner @ Paddy's Pub",
  quote:
    "I don't know how many years on this Earth I got left, I'm gonna get real weird with it.",
};

describe('Testimonial', () => {
  const renderWrapper = setupEnzyme(TestimonialDeprecated, {
    ...exampleTestmonial,
  });

  it('renders the Avatar component when an imageUrl prop is present', () => {
    const { wrapper } = renderWrapper({
      imageUrl: 'someCoolUrl',
      mode: 'dark',
    });

    expect(wrapper.find(`div[data-testid="avatar-container"]`)).toHaveLength(1);
  });

  it('does _not_ render the Avatar component when an imageUrl prop is _not_ present', () => {
    const { wrapper } = renderWrapper({
      mode: 'dark',
    });

    expect(wrapper.find(`div[data-testid="avatar-container"]`)).toHaveLength(0);
  });
});
