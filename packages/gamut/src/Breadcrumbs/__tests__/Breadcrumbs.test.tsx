import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { Breadcrumbs } from '..';

const renderView = setupRtl(Breadcrumbs);

describe('Breadcrumbs', () => {
  it('renders crumbs without a path as text', () => {
    const { view } = renderView({
      crumbs: [{ title: 'one' }, { title: 'two' }, { title: 'three' }],
    });
    view.getByText('one');
    view.getByText('two');
    view.getByText('three');
    expect(view.queryByRole('link')).toBeNull();
  });

  it('renders crumbs with a path as links', () => {
    const { view } = renderView({
      crumbs: [
        { title: 'one', href: 'www.one.com/path' },
        { title: 'two', href: 'www.two.com/path' },
        { title: 'three', href: 'www.three.com/path' },
      ],
    });
    view.getByText('one');
    view.getByText('two');
    view.getByText('three');
    expect(view.getAllByRole('link')).toHaveLength(3);
  });

  it('passes payload to onClick if both are provided', async () => {
    const payload = { owo: 'hey' };
    const onClick = jest.fn();

    const { view } = renderView({
      crumbs: [{ title: 'one', href: '#one/path', payload }],
      onClick,
    });

    await userEvent.click(view.getByText('one'));

    expect(onClick).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ payload })
    );
  });

  it('forwards data-* and aria-* attributes to the nav element', () => {
    const { view } = renderView({
      crumbs: [{ title: 'one' }],
      'data-marker': 'probe',
      'aria-keyshortcuts': 'probeAria',
    } as any);

    const nav = view.getByRole('navigation');
    expect(nav).toHaveAttribute('data-marker', 'probe');
    expect(nav).toHaveAttribute('aria-keyshortcuts', 'probeAria');
  });

  it('defaults aria-label when the consumer does not supply one', () => {
    const { view } = renderView({ crumbs: [{ title: 'one' }] });

    expect(view.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'breadcrumbs'
    );
  });

  it('lets a consumer override the default aria-label', () => {
    const { view } = renderView({
      crumbs: [{ title: 'one' }],
      'aria-label': 'my trail',
    });

    expect(view.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'my trail'
    );
  });
});
