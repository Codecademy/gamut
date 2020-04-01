import { createClassnames } from '../utilities';

describe('createClassnames', () => {
  const styleMap = {
    coolProp_sm__xsScreen: 'coolClass',
    coolProp_md__mdScreen: 'coolClassMedium',
    lessCoolProp_1__xsScreen: 'lessCoolClass',
  };

  it('handles string configurations', () => {
    const classList = createClassnames({ coolProp: 'sm' }, styleMap);

    expect(classList).toEqual(['coolClass']);
  });

  it('handles number configurations', () => {
    const classList = createClassnames({ lessCoolProp: 1 }, styleMap);

    expect(classList).toEqual(['lessCoolClass']);
  });

  it('handles screen size configurations', () => {
    const classList = createClassnames({ lessCoolProp: { xs: 1 } }, styleMap);

    expect(classList).toEqual([['lessCoolClass']]);
  });

  it('handles multiple configurations for different screen sizes', () => {
    const classList = createClassnames(
      { coolProp: { xs: 'sm', md: 'md' } },
      styleMap
    );

    expect(classList).toEqual([['coolClass', 'coolClassMedium']]);
  });

  it('handles multiple prop configs', () => {
    const classList = createClassnames(
      {
        coolProp: 'sm',
        lessCoolProp: 1,
      },
      styleMap
    );
    expect(classList).toEqual(['coolClass', 'lessCoolClass']);
  });

  it('returns an empty string if the configuration does not have a corresponding style', () => {
    const classList = createClassnames({ coolProp: 'lg' }, styleMap);

    expect(classList).toEqual([undefined]);
  });

  it('returns all valid configurations and omits invalid ones', () => {
    const classList = createClassnames(
      {
        coolProp: { lg: 'sm', md: 'md' },
        lessCoolProp: { lg: 'sm', xs: 1 },
      },
      styleMap
    );

    expect(classList).toEqual([
      [undefined, 'coolClassMedium'],
      [undefined, 'lessCoolClass'],
    ]);
  });
});
