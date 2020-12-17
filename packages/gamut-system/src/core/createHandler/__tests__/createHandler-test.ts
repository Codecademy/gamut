import { identity } from 'lodash';

import {
  createDirectionalStyleTemplate,
  createStandardStyleTemplate,
} from '../../../styleTemplates';
import { DEFAULT_MEDIA_QUERIES } from '../../../styleTemplates/createResponsiveStyleTemplate/constants';
import { createHandler } from '..';

type Theme = {
  colors: {
    blue: 'blue';
    green: 'green';
  };
};

type PropConfig = { propName: 'height' };

describe(createHandler, () => {
  it('creates a style function', () => {
    const styleFunction = createHandler<Theme, PropConfig>({
      propName: 'height',
    });

    expect(styleFunction({ height: 'auto' })).toEqual({ height: 'auto' });
  });

  it('adds prop names the function is responsible for as a key on the function object', () => {
    const styleFunction = createHandler<Theme, PropConfig>({
      propName: 'height',
    });

    expect(styleFunction.propNames).toEqual(['height']);
  });

  it('adds dependentProps to the propName array', () => {
    const styleFunction = createHandler<
      Theme,
      PropConfig & { dependentProps: ['maxHeight', 'minHeight'] }
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
    const { styleTemplates } = createHandler<Theme, PropConfig>({
      propName: 'height',
    });

    expect(Object.keys(styleTemplates)).toEqual(['height']);

    expect(styleTemplates.height?.toString()).toEqual(
      createStandardStyleTemplate({
        propName: 'height',
        transformValue: identity,
      }).toString()
    );
  });

  it('creates a directional style template if type is specified', () => {
    const { styleTemplates } = createHandler<
      Theme,
      PropConfig & { type: 'directional' }
    >({
      propName: 'height',
      type: 'directional',
    });

    expect(styleTemplates.height?.toString()).toEqual(
      createDirectionalStyleTemplate({
        propName: 'height',
        transformValue: identity,
      }).toString()
    );
  });

  it('returns a responsive style template to handle media queries', () => {
    const styleFunction = createHandler<Theme, PropConfig>({
      propName: 'height',
    });

    expect(styleFunction({ height: [, 'auto'] })).toEqual({
      [DEFAULT_MEDIA_QUERIES['xs']]: {
        height: 'auto',
      },
    });
  });
});
