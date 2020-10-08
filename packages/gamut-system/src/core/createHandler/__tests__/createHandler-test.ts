import { identity } from 'lodash';
import { createHandler } from '..';
import {
  createDirectionalStyleTemplate,
  createStandardStyleTemplate,
} from '../../../styleTemplates';
import { DEFAULT_MEDIA_QUERIES } from '../../../styleTemplates/createResponsiveStyleTemplate/constants';
import { ThematicProps } from '../../../types/config';

type Theme = {
  colors: {
    blue: 'blue';
    green: 'green';
  };
};

type PropConfig = { propName: 'height' };
type Props = ThematicProps<Theme, PropConfig>;

describe(createHandler, () => {
  it('creates a style function', () => {
    const styleFunction = createHandler<Theme, PropConfig, Props>({
      propName: 'height',
    });

    expect(styleFunction({ height: 'auto' })).toEqual({ height: 'auto' });
  });

  it('adds prop names the function is responsible for as a key on the function object', () => {
    const styleFunction = createHandler<Theme, PropConfig, Props>({
      propName: 'height',
    });

    expect(styleFunction.propNames).toEqual(['height']);
  });

  it('adds dependentProps to the propName array', () => {
    const styleFunction = createHandler<
      Theme,
      PropConfig & { dependentProps: ['maxHeight', 'minHeight'] },
      Props
    >({
      propName: 'height',
      dependentProps: ['maxHeight', 'minHeight'],
    });

    expect(styleFunction.propNames).toEqual([
      'height',
      'maxHeight',
      'minHeight',
    ]);
  });

  it('adds the the template functions to the styleTemplates key on the function object', () => {
    const { styleTemplates } = createHandler<Theme, PropConfig, Props>({
      propName: 'height',
    });

    expect(Object.keys(styleTemplates)).toEqual(['height']);

    expect(styleTemplates.height?.toString()).toEqual(
      createStandardStyleTemplate({
        propName: 'height',
        computeValue: identity,
      }).toString()
    );
  });

  it('creates a directional style template if type is specified', () => {
    const { styleTemplates } = createHandler<
      Theme,
      PropConfig & { type: 'directional' },
      Props
    >({
      propName: 'height',
      type: 'directional',
    });

    expect(styleTemplates.height?.toString()).toEqual(
      createDirectionalStyleTemplate({
        propName: 'height',
        computeValue: identity,
      }).toString()
    );
  });

  it('returns a responsive style template to handle media queries', () => {
    const styleFunction = createHandler<Theme, PropConfig, Props>({
      propName: 'height',
    });

    expect(styleFunction({ height: [, 'auto'] })).toEqual({
      [DEFAULT_MEDIA_QUERIES['xs']]: {
        height: 'auto',
      },
    });
  });
});
