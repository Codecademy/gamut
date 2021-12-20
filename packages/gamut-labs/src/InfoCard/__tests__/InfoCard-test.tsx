import { setupRtl } from '@codecademy/gamut-tests';

import { InfoCard } from '..';

const topText = 'Portfolio Project';
const title = 'Make a Personal Website';
const subtitle = 'Javascript';
const body = 'Use this to create a personal website for your portfolio.';
const href = 'www.codecademy.com';
const renderView = setupRtl(InfoCard, { topText, title, subtitle, body, href });

const clickHandler = jest.fn();

describe('InfoCard', () => {
  it('onClick function is called when InfoCard is clicked', () => {
    const { view } = renderView({ onClick: clickHandler });
    view.getByText(topText).click();
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('renders with bottom tags when provided', () => {
    const { view } = renderView({
      bottomLeftText: '40 hrs',
      bottomRightTagText: 'Portfolio Ready',
    });
    view.getByText('40 hrs');
    view.getByText('Portfolio Ready');
  });

  it('does not render with bottom tags when not provided', () => {
    const { view } = renderView();
    expect(view.queryByText('40 hrs')).toBeNull();
    expect(view.queryByText('Portfolio Ready')).toBeNull();
  });
});
