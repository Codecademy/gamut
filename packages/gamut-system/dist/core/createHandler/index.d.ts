import { AbstractTheme, Handler, PropertyConfig, ThematicProps } from '../../types/config';
export declare const createHandler: <Theme extends AbstractTheme, Config extends PropertyConfig<Theme>>(config: Config) => Handler<ThematicProps<Theme, Config>>;
