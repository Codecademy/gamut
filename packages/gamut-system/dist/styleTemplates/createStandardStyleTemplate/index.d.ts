import { AbstractPropertyConfig, AbstractProps, StyleTemplate } from '../../types/config';
export declare const createStandardStyleTemplate: <Props extends AbstractProps, Config extends AbstractPropertyConfig & Required<Pick<AbstractPropertyConfig, "propName" | "transformValue">>>(config: Config) => StyleTemplate<Props>;
