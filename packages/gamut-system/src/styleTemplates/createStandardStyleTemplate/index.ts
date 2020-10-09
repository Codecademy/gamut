import { createScaleValueTransformer } from '../../transforms/transformScaleValues';
import {
  AbstractProps,
  AbstractPropertyConfig,
  StyleTemplate,
} from '../../types/config';

export const createStandardStyleTemplate = <
  Props extends AbstractProps,
  Config extends AbstractPropertyConfig &
    Required<Pick<AbstractPropertyConfig, 'propName' | 'transformValue'>>
>(
  config: Config
): StyleTemplate<Props> => {
  const { propName: prop, transformValue } = config;
  const getScaleFunction = createScaleValueTransformer(config);

  return (props: Props) => {
    const getScalarValue = getScaleFunction(props);
    const propValue = getScalarValue(props[prop]);

    return propValue !== undefined
      ? {
          [prop]: transformValue(propValue),
        }
      : propValue;
  };
};
