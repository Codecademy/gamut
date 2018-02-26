import i18n, { t, translate, localize, pluralize } from '../index';

i18n.translations = {
  en: {
    test: 'this is a translation',
    bike: {
      one: 'bike',
      other: 'bikes',
    },
  },
};

describe('i18n-js', () => {
  it('binds translate shorthand function', () => {
    const actual = t('test');
    const expected = 'this is a translation';

    expect(actual).toEqual(expected);
  });

  it('binds translate function', () => {
    const actual = translate('test');
    const expected = 'this is a translation';

    expect(actual).toEqual(expected);
  });

  it('binds localize function', () => {
    const actual = localize('currency', 1990.99);
    const expected = '$1,990.99';

    expect(actual).toEqual(expected);
  });

  it('binds pluralize function', () => {
    const actual = pluralize(2, 'bike');
    const expected = 'bikes';

    expect(actual).toEqual(expected);
  });
});
