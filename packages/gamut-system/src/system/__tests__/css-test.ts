import { system } from '..';

describe('css', () => {
  describe('basic', () => {
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
  });

  describe('thematic', () => {
    const { css } = system.withTheme<{ fontSize: { sm: '14px' } }>().create({
      typography: {
        fontSize: { propName: 'fontSize', scale: 'fontSize' },
      },
    });

    it('works with themes', () => {
      const fn = css({
        '&:hover': {
          fontSize: 'sm',
        },
        '&:before': {
          content: '',
          fontSize: 'sm',
        },
      });

      expect(fn({ theme: { fontSize: { sm: '14px' } } })).toEqual({
        '&:hover': {
          fontSize: '14px',
        },
        '&:before': {
          content: '',
          fontSize: '14px',
        },
      });
    });
  });
});
