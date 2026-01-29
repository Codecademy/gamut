import { generateResponsiveClassnames } from '../generateResponsiveClassnames';

describe('generateResponsiveClassnames', () => {
  const styleMap = {
    coolProp_sm__xs: 'coolClass',
    coolProp_md__md: 'coolClassMedium',
    lessCoolProp_1__xs: 'lessCoolClass',
  };

  it('handles string configurations', () => {
    const classList = generateResponsiveClassnames(
      { coolProp: 'sm' },
      styleMap
    );

    expect(classList).toEqual(['coolClass']);
  });

  it('handles number configurations', () => {
    const classList = generateResponsiveClassnames(
      { lessCoolProp: 1 },
      styleMap
    );

    expect(classList).toEqual(['lessCoolClass']);
  });

  it('handles screen size configurations', () => {
    const classList = generateResponsiveClassnames(
      { lessCoolProp: { xs: 1 } },
      styleMap
    );

    expect(classList).toEqual(['lessCoolClass']);
  });

  it('handles multiple configurations for different screen sizes', () => {
    const classList = generateResponsiveClassnames(
      { coolProp: { xs: 'sm', md: 'md' } },
      styleMap
    );

    expect(classList).toEqual(['coolClass', 'coolClassMedium']);
  });

  it('handles multiple prop configs', () => {
    const classList = generateResponsiveClassnames(
      {
        coolProp: 'sm',
        lessCoolProp: 1,
      },
      styleMap
    );

    expect(classList).toEqual(['coolClass', 'lessCoolClass']);
  });

  it('returns an empty string if the configuration does not have a corresponding style', () => {
    const classList = generateResponsiveClassnames(
      { coolProp: 'lg' },
      styleMap
    );

    expect(classList).toEqual([]);
  });

  it('returns all valid configurations and omits invalid ones', () => {
    const classList = generateResponsiveClassnames(
      {
        coolProp: { lg: 'sm', md: 'md' },
        lessCoolProp: { lg: 'sm', xs: 1 },
      },
      styleMap
    );

    expect(classList).toEqual(['coolClassMedium', 'lessCoolClass']);
  });
});
