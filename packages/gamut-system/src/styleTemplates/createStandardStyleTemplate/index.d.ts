import { AbstractPropertyConfig, StyleTemplate } from '../../types/system';
export declare const createStandardStyleTemplate: <
  Props extends Record<string, unknown>,
  Config extends AbstractPropertyConfig &
    Required<Pick<AbstractPropertyConfig, 'propName' | 'computeValue'>>
>({
  propName,
  scale,
  computeValue,
}: Config) => StyleTemplate<Props>;
