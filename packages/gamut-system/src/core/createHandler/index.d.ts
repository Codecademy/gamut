import { AbstractTheme, Handler, PropertyConfig } from '../../types/system';
export declare const createHandler: <
  Theme extends AbstractTheme,
  Config extends PropertyConfig<Theme>,
  Props extends Partial<
    Record<
      Config['propName'] extends
        | 'borderColor'
        | 'borderWidth'
        | 'margin'
        | 'padding'
        ?
            | Config['propName']
            | import('@codecademy/gamut-system/src/types/properties').Props[Config['propName']]['dependentProps']
        : Config['propName'],
      import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
        import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
          Theme,
          Extract<
            Config,
            {
              propName: Config['propName'];
            }
          >
        >
      >
    >
  >
>(
  config: Config
) => Handler<Props>;
