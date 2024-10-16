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
        { title: 'one', href: 'one/path' },
        { title: 'two', href: 'two/path' },
        { title: 'three', href: 'three/path' },
      ],
    });
    view.getByText('one');
    view.getByText('two');
    view.getByText('three');
    expect(view.getAllByRole('link')).toHaveLength(3);
  });

  it('passes payload to onClick if both are provided', async () => {
    const payload = 'owo';
    const onClick = jest.fn();

    const { view } = renderView({
      crumbs: [{ title: 'one', href: 'one/path', payload }],
      onClick,
    });
    await userEvent.click(view.getByText('one'));

    expect(onClick).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ payload })
    );
  });
});
