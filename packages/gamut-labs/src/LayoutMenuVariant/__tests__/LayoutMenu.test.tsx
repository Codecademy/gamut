import { setupRtl } from '@codecademy/gamut-tests';
import { matchers } from '@emotion/jest';
import { fireEvent } from '@testing-library/dom';

import { LayoutMenu } from '../LayoutMenu';

jest.mock('react-use', () => ({
  ...jest.requireActual<{}>('react-use'),
  useMedia: () => false,
}));

expect.extend(matchers);

const renderView = setupRtl(LayoutMenu, {
  closeLabel: 'Close me',
  sections: [
    {
      title: 'main test title1',
      slug: 'test-slug1',
      items: [
        {
          title: 'sub title1',
          slug: 'sub-slug1',
          href: '',
          onClick: jest.fn(),
        },
      ],
    },
    {
      title: 'main test title2',
      slug: 'test-slug2',
      items: [
        {
          title: 'sub title2',
          slug: 'sub-slug2',
          href: '',
          onClick: jest.fn(),
        },
      ],
    },
  ],
  onSectionToggle: jest.fn(),
  mobileButtonText: 'test button',
});

describe('LayoutMenu', () => {
  it('renders all sections appropriately', () => {
    const { view, props } = renderView();
    props.sections.map((section) => view.getByText(section.title));
  });

  it('renders Codecademy logo in flyout', () => {
    const { view } = renderView();
    fireEvent.click(view.getByText('test button'));
    view.getByTitle('Codecademy Logo');
  });

  it('renders a top link section', () => {
    const { view } = renderView({
      topLinkSections: [
        {
          title: `Hello!`,
          slug: 'this-works-everybody',
          href: '',
          onClick: jest.fn(),
        },
      ],
    });

    view.getByText(`Hello!`);
  });

  it('has overflow style when menuHeight prop is passed', () => {
    const { view } = renderView({
      menuHeight: 'sm',
    });

    expect(view.getByTestId('desktop-menu')).toHaveStyleRule(
      'overflow-y',
      'auto'
    );
  });
});
