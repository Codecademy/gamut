import { createScaleValueTransformer } from '../../transforms/transformScaleValues';
import {
  AbstractPropertyConfig,
  AbstractProps,
  StyleTemplate,
} from '../../types/config';

export const createStandardStyleTemplate = <
  Props extends AbstractProps,
  Config extends AbstractPropertyConfig
>(
  config: Config
): StyleTemplate<Props> => {
  const { propName: prop, property = prop, scale, transformValue } = config;
  const getScaleFunction = createScaleValueTransformer(config);

  const template = (props: Props) => {
    const getScalarValue = getScaleFunction(props);
    const propValue = getScalarValue(props[prop]);

    if (propValue !== undefined) {
      return {
        [property]: transformValue ? transformValue(propValue) : propValue,
      };
    }
  };

  return Object.assign(template, {
    type: 'standard',
    scale: scale as Readonly<string>,
  } as const);
};
