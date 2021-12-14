import { AbstractPropertyConfig, AbstractProps, ScaleArray, ScaleMap } from '../../types/config';
export declare const deriveScaleFunction: (scale: ScaleMap | ScaleArray | undefined) => (value: unknown) => any;
export declare const createScaleValueTransformer: <Config extends AbstractPropertyConfig, Props extends AbstractProps>({ scale, }: Config) => (props: Props) => (value: unknown) => any;
