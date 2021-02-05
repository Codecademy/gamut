import { system } from '..';

describe('css', () => {
  const { css } = system.create({});

  it('works', () => {
    const fn = css({
      '&:hover': {
        textAlign: 'center',
      },
      '&:before': {
        content: '',
        backgroundColor: 'blue',
      },
    });

    expect(fn).toBeDefined();
  });

  it('works with themes', () => {
    const { css } = system.withTheme<{ fontSize: { sm: '14px' } }>().create({
      typography: {
        fontSize: { propName: 'fontSize', scale: 'fontSize' },
      },
    });

    const fn = css({
      '&:hover': {
        fontSize: 'sm',
      },
      '&:before': {
        content: '',
        fontSize: 'sm',
      },
    });

    expect(fn).toBeDefined();
  });
});
