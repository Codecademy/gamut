import { identity } from 'lodash';
import { createResponsiveProperty } from '..';
import {
  DEFAULT_MEDIA_QUERIES,
  directionalProperty,
  standardProperty,
} from '../../../propTemplates';
import { ThematicProps } from '../../../types/groups';

type Theme = {
  colors: {
    blue: 'blue';
    green: 'green';
  };
};

type PropConfig = { propName: 'height' };
type Props = ThematicProps<Theme, PropConfig>;

describe(createResponsiveProperty, () => {
  it('creates a style function', () => {
    const styleFunction = createResponsiveProperty<Theme, PropConfig, Props>({
      propName: 'height',
    });

    expect(styleFunction({ height: 'auto' })).toEqual({ height: 'auto' });
  });

  it('adds prop names the function is responsible for as a key on the function object', () => {
    const styleFunction = createResponsiveProperty<Theme, PropConfig, Props>({
      propName: 'height',
    });

    expect(styleFunction.propNames).toEqual(['height']);
  });

  it('adds altProps to the propName array', () => {
    const styleFunction = createResponsiveProperty<
      Theme,
      PropConfig & { altProps: ['maxHeight', 'minHeight'] },
      Props
    >({
      propName: 'height',
      altProps: ['maxHeight', 'minHeight'],
    });

    expect(styleFunction.propNames).toEqual([
      'height',
      'maxHeight',
      'minHeight',
    ]);
  });

  it('adds the the template functions to the templateFns key on the function object', () => {
    const { templateFns } = createResponsiveProperty<Theme, PropConfig, Props>({
      propName: 'height',
    });

    expect(Object.keys(templateFns)).toEqual(['height']);

    expect(templateFns.height?.toString()).toEqual(
      standardProperty({
        propName: 'height',
        computeValue: identity,
      }).toString()
    );
  });

  it('creates a directionalProperty if type is specified', () => {
    const { templateFns } = createResponsiveProperty<
      Theme,
      PropConfig & { type: 'directional' },
      Props
    >({
      propName: 'height',
      type: 'directional',
    });

    expect(templateFns.height?.toString()).toEqual(
      directionalProperty({
        propName: 'height',
        computeValue: identity,
      }).toString()
    );
  });

  it('returns a responsive property to handle media queries', () => {
    const styleFunction = createResponsiveProperty<Theme, PropConfig, Props>({
      propName: 'height',
    });

    expect(styleFunction({ height: [, 'auto'] })).toEqual({
      [DEFAULT_MEDIA_QUERIES['xs']]: {
        height: 'auto',
      },
    });
  });
});
