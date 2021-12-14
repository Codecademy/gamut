import { AbstractTheme } from '../../types/config';
import { System, SystemConfig } from '../../types/system';
export declare const system: {
    create: <Config extends SystemConfig<{}>>(config: Config) => System<{}, Config>;
    withTheme: <Theme extends AbstractTheme>() => {
        create: <Config_1 extends SystemConfig<Theme>>(config: Config_1) => System<Theme, Config_1>;
    };
};
