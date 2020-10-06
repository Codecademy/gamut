import { PropertyConfig, AbstractTheme, ThematicProps, Handler } from '../../types/system';
export declare const createHandler: <Theme extends AbstractTheme, Config extends PropertyConfig<Theme>, Props extends ThematicProps<Theme, Config>>(config: Config) => Handler<Props>;
