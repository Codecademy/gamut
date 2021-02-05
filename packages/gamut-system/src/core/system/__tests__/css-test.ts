import { system } from '..';

describe('css', () => {
  const { css } = system.create({});

  it('works', () => {
    const fn = css({
      '&:hover': {
        textAlign: 'center',
      },
    });

    expect(fn).toBeDefined();
  });
});
