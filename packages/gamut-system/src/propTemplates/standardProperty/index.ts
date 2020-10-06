import { get, isArray, isObject } from 'lodash';
import { AbstractPropertyConfig } from '../../types/props';
import { StyleTemplate, TemplateFactorySettings } from '../../types/templates';
import { TemplateConfig } from '../types';

/**
 * Creates a template function to compute the single CSS property
 * corresponding to a provided prop description.
 */
export const standardProperty = <
  Config extends TemplateConfig,
  Props extends Record<string, unknown>
>({
  computeValue,
  propName,
  scale,
}: TemplateConfig): StyleTemplate<Props> => {
  const getScaledValue = (initialValue: unknown) => {
    switch (typeof scale) {
      case 'number':
      case 'string':
        return initialValue;

      case 'object':
        scale[initialValue as number | string];
    }

    return initialValue;
  };

  return (props: Props) => {
    // let scaleShape = scale;
    // if (typeof scaleShape === 'string') {
    //   scaleShape = props.theme[scaleShape];
    // }

    // if (isObject(scaleShape)) {
    //   propValue = get(scaleShape, `${propValue}`, propValue);
    // }

    return {
      [propName]: computeValue(getScaledValue(props[propName])),
    };
  };
};
