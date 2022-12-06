import { FillButton } from '@codecademy/gamut';
import { NumberBlocks } from '@codecademy/gamut-illustrations';
import { setupRtl } from '@codecademy/gamut-tests';

import { EmptySection } from '..';

const headingText = 'Empty section heading';
const bodyText = 'Body text';

const renderView = setupRtl(EmptySection, {
  headingText,
  bodyText,
  illustration: NumberBlocks,
  stretchDirection: 'left',
  children: <FillButton href="">Do it!</FillButton>,
});

describe('EmptySection', () => {
  it('renders the heading text in a heading role', () => {
    const { view } = renderView();
    expect(view.getByRole('heading').textContent).toBe(headingText);
  });

  it('renders the body text', () => {
    const { view } = renderView();
    expect(view.queryByText(bodyText));
  });
});
