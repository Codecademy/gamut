import { system } from '..';

describe('system', () => {
  const { css } = system.create({});

  it('works', () => {
    const fn = css({
      ':hover': {
        textAlign: 'center',
      },
    });

    expect(fn).toBeDefined();
  });
});
