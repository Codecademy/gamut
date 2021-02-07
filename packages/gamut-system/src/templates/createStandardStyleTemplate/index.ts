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
  const { property, propName: prop, transformValue = (val) => val } = config;
  const getScaleFunction = createScaleValueTransformer(config);

  return Object.assign(
    (props: Props) => {
      const getScalarValue = getScaleFunction(props);
      const propValue = getScalarValue(props[prop]);

      return propValue !== undefined
        ? {
            [property || prop]: transformValue(propValue),
          }
        : propValue;
    },
    { type: 'standard' } as const
  );
};
