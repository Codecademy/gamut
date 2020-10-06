import {
  AbstractTheme,
  PropertyConfig,
  Handler,
  ThematicProps,
} from '../../types/system';
import * as BaseProps from '../../props';
import { CSSObject } from '@emotion/core';
import { UnionToIntersection, WeakRecord } from '../../types/utils';
export declare const system: <
  Config extends Record<string, Record<string, PropertyConfig<Theme>>>,
  Theme extends AbstractTheme
>(
  config?: Config | undefined
) => {
  variant: {
    <Prop extends string, Keys extends string>(config: {
      prop: Prop;
      variants: Readonly<
        Record<
          Keys,
          UnionToIntersection<
            {
              [PropGroup_1 in keyof {
                [PropGroup in keyof (Config extends {}
                  ? typeof BaseProps & Config
                  : typeof BaseProps)]: {
                  handlers: {
                    [Property in keyof (Config extends {}
                      ? typeof BaseProps & Config
                      : typeof BaseProps)[PropGroup]]: Handler<
                      Partial<
                        Record<
                          (Config extends {}
                            ? typeof BaseProps & Config
                            : typeof BaseProps)[PropGroup][Property]['propName'] extends
                            | 'borderColor'
                            | 'borderWidth'
                            | 'margin'
                            | 'padding'
                            ?
                                | (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property]['propName']
                                | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property]['propName']]['dependentProps']
                            : (Config extends {}
                                ? typeof BaseProps & Config
                                : typeof BaseProps)[PropGroup][Property]['propName'],
                          import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                            import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                              Theme,
                              Extract<
                                (Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property],
                                {
                                  propName: (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property]['propName'];
                                }
                              >
                            >
                          >
                        >
                      >
                    >;
                  };
                  /** All possible prop type signatures  */
                  props: {
                    [Property_1 in keyof (Config extends {}
                      ? typeof BaseProps & Config
                      : typeof BaseProps)[PropGroup]]: Partial<
                      Record<
                        (Config extends {}
                          ? typeof BaseProps & Config
                          : typeof BaseProps)[PropGroup][Property_1]['propName'] extends
                          | 'borderColor'
                          | 'borderWidth'
                          | 'margin'
                          | 'padding'
                          ?
                              | (Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property_1]['propName']
                              | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property_1]['propName']]['dependentProps']
                          : (Config extends {}
                              ? typeof BaseProps & Config
                              : typeof BaseProps)[PropGroup][Property_1]['propName'],
                        import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                          import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                            Theme,
                            Extract<
                              (Config extends {}
                                ? typeof BaseProps & Config
                                : typeof BaseProps)[PropGroup][Property_1],
                              {
                                propName: (Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property_1]['propName'];
                              }
                            >
                          >
                        >
                      >
                    >;
                  };
                };
              }]: UnionToIntersection<
                {
                  [PropGroup in keyof (Config extends {}
                    ? typeof BaseProps & Config
                    : typeof BaseProps)]: {
                    handlers: {
                      [Property in keyof (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup]]: Handler<
                        Partial<
                          Record<
                            (Config extends {}
                              ? typeof BaseProps & Config
                              : typeof BaseProps)[PropGroup][Property]['propName'] extends
                              | 'borderColor'
                              | 'borderWidth'
                              | 'margin'
                              | 'padding'
                              ?
                                  | (Config extends {}
                                      ? typeof BaseProps & Config
                                      : typeof BaseProps)[PropGroup][Property]['propName']
                                  | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                                      ? typeof BaseProps & Config
                                      : typeof BaseProps)[PropGroup][Property]['propName']]['dependentProps']
                              : (Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property]['propName'],
                            import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                              import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                                Theme,
                                Extract<
                                  (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property],
                                  {
                                    propName: (Config extends {}
                                      ? typeof BaseProps & Config
                                      : typeof BaseProps)[PropGroup][Property]['propName'];
                                  }
                                >
                              >
                            >
                          >
                        >
                      >;
                    };
                    /** All possible prop type signatures  */
                    props: {
                      [Property_1 in keyof (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup]]: Partial<
                        Record<
                          (Config extends {}
                            ? typeof BaseProps & Config
                            : typeof BaseProps)[PropGroup][Property_1]['propName'] extends
                            | 'borderColor'
                            | 'borderWidth'
                            | 'margin'
                            | 'padding'
                            ?
                                | (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property_1]['propName']
                                | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property_1]['propName']]['dependentProps']
                            : (Config extends {}
                                ? typeof BaseProps & Config
                                : typeof BaseProps)[PropGroup][Property_1]['propName'],
                          import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                            import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                              Theme,
                              Extract<
                                (Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property_1],
                                {
                                  propName: (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property_1]['propName'];
                                }
                              >
                            >
                          >
                        >
                      >;
                    };
                  };
                }[PropGroup_1]['props'][keyof {
                  [PropGroup in keyof (Config extends {}
                    ? typeof BaseProps & Config
                    : typeof BaseProps)]: {
                    handlers: {
                      [Property in keyof (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup]]: Handler<
                        Partial<
                          Record<
                            (Config extends {}
                              ? typeof BaseProps & Config
                              : typeof BaseProps)[PropGroup][Property]['propName'] extends
                              | 'borderColor'
                              | 'borderWidth'
                              | 'margin'
                              | 'padding'
                              ?
                                  | (Config extends {}
                                      ? typeof BaseProps & Config
                                      : typeof BaseProps)[PropGroup][Property]['propName']
                                  | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                                      ? typeof BaseProps & Config
                                      : typeof BaseProps)[PropGroup][Property]['propName']]['dependentProps']
                              : (Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property]['propName'],
                            import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                              import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                                Theme,
                                Extract<
                                  (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property],
                                  {
                                    propName: (Config extends {}
                                      ? typeof BaseProps & Config
                                      : typeof BaseProps)[PropGroup][Property]['propName'];
                                  }
                                >
                              >
                            >
                          >
                        >
                      >;
                    };
                    /** All possible prop type signatures  */
                    props: {
                      [Property_1 in keyof (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup]]: Partial<
                        Record<
                          (Config extends {}
                            ? typeof BaseProps & Config
                            : typeof BaseProps)[PropGroup][Property_1]['propName'] extends
                            | 'borderColor'
                            | 'borderWidth'
                            | 'margin'
                            | 'padding'
                            ?
                                | (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property_1]['propName']
                                | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property_1]['propName']]['dependentProps']
                            : (Config extends {}
                                ? typeof BaseProps & Config
                                : typeof BaseProps)[PropGroup][Property_1]['propName'],
                          import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                            import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                              Theme,
                              Extract<
                                (Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property_1],
                                {
                                  propName: (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property_1]['propName'];
                                }
                              >
                            >
                          >
                        >
                      >;
                    };
                  };
                }[PropGroup_1]['props']]
              >;
            }[keyof (Config extends {}
              ? typeof BaseProps & Config
              : typeof BaseProps)]
          >
        >
      >;
    }): (
      props: Partial<Record<Prop, Keys>> & {
        theme?: Theme | undefined;
      }
    ) => CSSObject;
    <Keys_1 extends string>(
      config: Readonly<
        Record<
          Keys_1,
          UnionToIntersection<
            {
              [PropGroup_1 in keyof {
                [PropGroup in keyof (Config extends {}
                  ? typeof BaseProps & Config
                  : typeof BaseProps)]: {
                  handlers: {
                    [Property in keyof (Config extends {}
                      ? typeof BaseProps & Config
                      : typeof BaseProps)[PropGroup]]: Handler<
                      Partial<
                        Record<
                          (Config extends {}
                            ? typeof BaseProps & Config
                            : typeof BaseProps)[PropGroup][Property]['propName'] extends
                            | 'borderColor'
                            | 'borderWidth'
                            | 'margin'
                            | 'padding'
                            ?
                                | (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property]['propName']
                                | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property]['propName']]['dependentProps']
                            : (Config extends {}
                                ? typeof BaseProps & Config
                                : typeof BaseProps)[PropGroup][Property]['propName'],
                          import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                            import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                              Theme,
                              Extract<
                                (Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property],
                                {
                                  propName: (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property]['propName'];
                                }
                              >
                            >
                          >
                        >
                      >
                    >;
                  };
                  /** All possible prop type signatures  */
                  props: {
                    [Property_1 in keyof (Config extends {}
                      ? typeof BaseProps & Config
                      : typeof BaseProps)[PropGroup]]: Partial<
                      Record<
                        (Config extends {}
                          ? typeof BaseProps & Config
                          : typeof BaseProps)[PropGroup][Property_1]['propName'] extends
                          | 'borderColor'
                          | 'borderWidth'
                          | 'margin'
                          | 'padding'
                          ?
                              | (Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property_1]['propName']
                              | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property_1]['propName']]['dependentProps']
                          : (Config extends {}
                              ? typeof BaseProps & Config
                              : typeof BaseProps)[PropGroup][Property_1]['propName'],
                        import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                          import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                            Theme,
                            Extract<
                              (Config extends {}
                                ? typeof BaseProps & Config
                                : typeof BaseProps)[PropGroup][Property_1],
                              {
                                propName: (Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property_1]['propName'];
                              }
                            >
                          >
                        >
                      >
                    >;
                  };
                };
              }]: UnionToIntersection<
                {
                  [PropGroup in keyof (Config extends {}
                    ? typeof BaseProps & Config
                    : typeof BaseProps)]: {
                    handlers: {
                      [Property in keyof (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup]]: Handler<
                        Partial<
                          Record<
                            (Config extends {}
                              ? typeof BaseProps & Config
                              : typeof BaseProps)[PropGroup][Property]['propName'] extends
                              | 'borderColor'
                              | 'borderWidth'
                              | 'margin'
                              | 'padding'
                              ?
                                  | (Config extends {}
                                      ? typeof BaseProps & Config
                                      : typeof BaseProps)[PropGroup][Property]['propName']
                                  | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                                      ? typeof BaseProps & Config
                                      : typeof BaseProps)[PropGroup][Property]['propName']]['dependentProps']
                              : (Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property]['propName'],
                            import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                              import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                                Theme,
                                Extract<
                                  (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property],
                                  {
                                    propName: (Config extends {}
                                      ? typeof BaseProps & Config
                                      : typeof BaseProps)[PropGroup][Property]['propName'];
                                  }
                                >
                              >
                            >
                          >
                        >
                      >;
                    };
                    /** All possible prop type signatures  */
                    props: {
                      [Property_1 in keyof (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup]]: Partial<
                        Record<
                          (Config extends {}
                            ? typeof BaseProps & Config
                            : typeof BaseProps)[PropGroup][Property_1]['propName'] extends
                            | 'borderColor'
                            | 'borderWidth'
                            | 'margin'
                            | 'padding'
                            ?
                                | (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property_1]['propName']
                                | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property_1]['propName']]['dependentProps']
                            : (Config extends {}
                                ? typeof BaseProps & Config
                                : typeof BaseProps)[PropGroup][Property_1]['propName'],
                          import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                            import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                              Theme,
                              Extract<
                                (Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property_1],
                                {
                                  propName: (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property_1]['propName'];
                                }
                              >
                            >
                          >
                        >
                      >;
                    };
                  };
                }[PropGroup_1]['props'][keyof {
                  [PropGroup in keyof (Config extends {}
                    ? typeof BaseProps & Config
                    : typeof BaseProps)]: {
                    handlers: {
                      [Property in keyof (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup]]: Handler<
                        Partial<
                          Record<
                            (Config extends {}
                              ? typeof BaseProps & Config
                              : typeof BaseProps)[PropGroup][Property]['propName'] extends
                              | 'borderColor'
                              | 'borderWidth'
                              | 'margin'
                              | 'padding'
                              ?
                                  | (Config extends {}
                                      ? typeof BaseProps & Config
                                      : typeof BaseProps)[PropGroup][Property]['propName']
                                  | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                                      ? typeof BaseProps & Config
                                      : typeof BaseProps)[PropGroup][Property]['propName']]['dependentProps']
                              : (Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property]['propName'],
                            import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                              import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                                Theme,
                                Extract<
                                  (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property],
                                  {
                                    propName: (Config extends {}
                                      ? typeof BaseProps & Config
                                      : typeof BaseProps)[PropGroup][Property]['propName'];
                                  }
                                >
                              >
                            >
                          >
                        >
                      >;
                    };
                    /** All possible prop type signatures  */
                    props: {
                      [Property_1 in keyof (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup]]: Partial<
                        Record<
                          (Config extends {}
                            ? typeof BaseProps & Config
                            : typeof BaseProps)[PropGroup][Property_1]['propName'] extends
                            | 'borderColor'
                            | 'borderWidth'
                            | 'margin'
                            | 'padding'
                            ?
                                | (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property_1]['propName']
                                | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property_1]['propName']]['dependentProps']
                            : (Config extends {}
                                ? typeof BaseProps & Config
                                : typeof BaseProps)[PropGroup][Property_1]['propName'],
                          import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                            import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                              Theme,
                              Extract<
                                (Config extends {}
                                  ? typeof BaseProps & Config
                                  : typeof BaseProps)[PropGroup][Property_1],
                                {
                                  propName: (Config extends {}
                                    ? typeof BaseProps & Config
                                    : typeof BaseProps)[PropGroup][Property_1]['propName'];
                                }
                              >
                            >
                          >
                        >
                      >;
                    };
                  };
                }[PropGroup_1]['props']]
              >;
            }[keyof (Config extends {}
              ? typeof BaseProps & Config
              : typeof BaseProps)]
          >
        >
      >
    ): (
      props: Partial<Record<'variant', Keys_1>> & {
        theme?: Theme | undefined;
      }
    ) => CSSObject;
  };
  properties: UnionToIntersection<
    {
      [PropGroup in keyof (Config extends {}
        ? typeof BaseProps & Config
        : typeof BaseProps)]: {
        handlers: {
          [Property in keyof (Config extends {}
            ? typeof BaseProps & Config
            : typeof BaseProps)[PropGroup]]: Handler<
            Partial<
              Record<
                (Config extends {}
                  ? typeof BaseProps & Config
                  : typeof BaseProps)[PropGroup][Property]['propName'] extends
                  | 'borderColor'
                  | 'borderWidth'
                  | 'margin'
                  | 'padding'
                  ?
                      | (Config extends {}
                          ? typeof BaseProps & Config
                          : typeof BaseProps)[PropGroup][Property]['propName']
                      | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                          ? typeof BaseProps & Config
                          : typeof BaseProps)[PropGroup][Property]['propName']]['dependentProps']
                  : (Config extends {}
                      ? typeof BaseProps & Config
                      : typeof BaseProps)[PropGroup][Property]['propName'],
                import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                  import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                    Theme,
                    Extract<
                      (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property],
                      {
                        propName: (Config extends {}
                          ? typeof BaseProps & Config
                          : typeof BaseProps)[PropGroup][Property]['propName'];
                      }
                    >
                  >
                >
              >
            >
          >;
        };
        /** All possible prop type signatures  */
        props: {
          [Property_1 in keyof (Config extends {}
            ? typeof BaseProps & Config
            : typeof BaseProps)[PropGroup]]: Partial<
            Record<
              (Config extends {}
                ? typeof BaseProps & Config
                : typeof BaseProps)[PropGroup][Property_1]['propName'] extends
                | 'borderColor'
                | 'borderWidth'
                | 'margin'
                | 'padding'
                ?
                    | (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property_1]['propName']
                    | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property_1]['propName']]['dependentProps']
                : (Config extends {}
                    ? typeof BaseProps & Config
                    : typeof BaseProps)[PropGroup][Property_1]['propName'],
              import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                  Theme,
                  Extract<
                    (Config extends {}
                      ? typeof BaseProps & Config
                      : typeof BaseProps)[PropGroup][Property_1],
                    {
                      propName: (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property_1]['propName'];
                    }
                  >
                >
              >
            >
          >;
        };
      };
    }[keyof (Config extends {}
      ? typeof BaseProps & Config
      : typeof BaseProps)]['handlers']
  >;
} & {
  [PropGroup_2 in keyof {
    [PropGroup in keyof (Config extends {}
      ? typeof BaseProps & Config
      : typeof BaseProps)]: {
      handlers: {
        [Property in keyof (Config extends {}
          ? typeof BaseProps & Config
          : typeof BaseProps)[PropGroup]]: Handler<
          Partial<
            Record<
              (Config extends {}
                ? typeof BaseProps & Config
                : typeof BaseProps)[PropGroup][Property]['propName'] extends
                | 'borderColor'
                | 'borderWidth'
                | 'margin'
                | 'padding'
                ?
                    | (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property]['propName']
                    | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property]['propName']]['dependentProps']
                : (Config extends {}
                    ? typeof BaseProps & Config
                    : typeof BaseProps)[PropGroup][Property]['propName'],
              import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                  Theme,
                  Extract<
                    (Config extends {}
                      ? typeof BaseProps & Config
                      : typeof BaseProps)[PropGroup][Property],
                    {
                      propName: (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property]['propName'];
                    }
                  >
                >
              >
            >
          >
        >;
      };
      /** All possible prop type signatures  */
      props: {
        [Property_1 in keyof (Config extends {}
          ? typeof BaseProps & Config
          : typeof BaseProps)[PropGroup]]: Partial<
          Record<
            (Config extends {}
              ? typeof BaseProps & Config
              : typeof BaseProps)[PropGroup][Property_1]['propName'] extends
              | 'borderColor'
              | 'borderWidth'
              | 'margin'
              | 'padding'
              ?
                  | (Config extends {}
                      ? typeof BaseProps & Config
                      : typeof BaseProps)[PropGroup][Property_1]['propName']
                  | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                      ? typeof BaseProps & Config
                      : typeof BaseProps)[PropGroup][Property_1]['propName']]['dependentProps']
              : (Config extends {}
                  ? typeof BaseProps & Config
                  : typeof BaseProps)[PropGroup][Property_1]['propName'],
            import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
              import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                Theme,
                Extract<
                  (Config extends {}
                    ? typeof BaseProps & Config
                    : typeof BaseProps)[PropGroup][Property_1],
                  {
                    propName: (Config extends {}
                      ? typeof BaseProps & Config
                      : typeof BaseProps)[PropGroup][Property_1]['propName'];
                  }
                >
              >
            >
          >
        >;
      };
    };
  }]: Handler<
    {
      [PropGroup in keyof (Config extends {}
        ? typeof BaseProps & Config
        : typeof BaseProps)]: {
        handlers: {
          [Property in keyof (Config extends {}
            ? typeof BaseProps & Config
            : typeof BaseProps)[PropGroup]]: Handler<
            Partial<
              Record<
                (Config extends {}
                  ? typeof BaseProps & Config
                  : typeof BaseProps)[PropGroup][Property]['propName'] extends
                  | 'borderColor'
                  | 'borderWidth'
                  | 'margin'
                  | 'padding'
                  ?
                      | (Config extends {}
                          ? typeof BaseProps & Config
                          : typeof BaseProps)[PropGroup][Property]['propName']
                      | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                          ? typeof BaseProps & Config
                          : typeof BaseProps)[PropGroup][Property]['propName']]['dependentProps']
                  : (Config extends {}
                      ? typeof BaseProps & Config
                      : typeof BaseProps)[PropGroup][Property]['propName'],
                import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                  import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                    Theme,
                    Extract<
                      (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property],
                      {
                        propName: (Config extends {}
                          ? typeof BaseProps & Config
                          : typeof BaseProps)[PropGroup][Property]['propName'];
                      }
                    >
                  >
                >
              >
            >
          >;
        };
        /** All possible prop type signatures  */
        props: {
          [Property_1 in keyof (Config extends {}
            ? typeof BaseProps & Config
            : typeof BaseProps)[PropGroup]]: Partial<
            Record<
              (Config extends {}
                ? typeof BaseProps & Config
                : typeof BaseProps)[PropGroup][Property_1]['propName'] extends
                | 'borderColor'
                | 'borderWidth'
                | 'margin'
                | 'padding'
                ?
                    | (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property_1]['propName']
                    | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property_1]['propName']]['dependentProps']
                : (Config extends {}
                    ? typeof BaseProps & Config
                    : typeof BaseProps)[PropGroup][Property_1]['propName'],
              import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                  Theme,
                  Extract<
                    (Config extends {}
                      ? typeof BaseProps & Config
                      : typeof BaseProps)[PropGroup][Property_1],
                    {
                      propName: (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property_1]['propName'];
                    }
                  >
                >
              >
            >
          >;
        };
      };
    }[PropGroup_2]['props'][keyof {
      [PropGroup in keyof (Config extends {}
        ? typeof BaseProps & Config
        : typeof BaseProps)]: {
        handlers: {
          [Property in keyof (Config extends {}
            ? typeof BaseProps & Config
            : typeof BaseProps)[PropGroup]]: Handler<
            Partial<
              Record<
                (Config extends {}
                  ? typeof BaseProps & Config
                  : typeof BaseProps)[PropGroup][Property]['propName'] extends
                  | 'borderColor'
                  | 'borderWidth'
                  | 'margin'
                  | 'padding'
                  ?
                      | (Config extends {}
                          ? typeof BaseProps & Config
                          : typeof BaseProps)[PropGroup][Property]['propName']
                      | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                          ? typeof BaseProps & Config
                          : typeof BaseProps)[PropGroup][Property]['propName']]['dependentProps']
                  : (Config extends {}
                      ? typeof BaseProps & Config
                      : typeof BaseProps)[PropGroup][Property]['propName'],
                import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                  import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                    Theme,
                    Extract<
                      (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property],
                      {
                        propName: (Config extends {}
                          ? typeof BaseProps & Config
                          : typeof BaseProps)[PropGroup][Property]['propName'];
                      }
                    >
                  >
                >
              >
            >
          >;
        };
        /** All possible prop type signatures  */
        props: {
          [Property_1 in keyof (Config extends {}
            ? typeof BaseProps & Config
            : typeof BaseProps)[PropGroup]]: Partial<
            Record<
              (Config extends {}
                ? typeof BaseProps & Config
                : typeof BaseProps)[PropGroup][Property_1]['propName'] extends
                | 'borderColor'
                | 'borderWidth'
                | 'margin'
                | 'padding'
                ?
                    | (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property_1]['propName']
                    | import('@codecademy/gamut-system/src/types/properties').Props[(Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property_1]['propName']]['dependentProps']
                : (Config extends {}
                    ? typeof BaseProps & Config
                    : typeof BaseProps)[PropGroup][Property_1]['propName'],
              import('@codecademy/gamut-system/src/types/system').ResponsiveProp<
                import('@codecademy/gamut-system/src/types/system').ThematicScaleValue<
                  Theme,
                  Extract<
                    (Config extends {}
                      ? typeof BaseProps & Config
                      : typeof BaseProps)[PropGroup][Property_1],
                    {
                      propName: (Config extends {}
                        ? typeof BaseProps & Config
                        : typeof BaseProps)[PropGroup][Property_1]['propName'];
                    }
                  >
                >
              >
            >
          >;
        };
      };
    }[PropGroup_2]['props']]
  >;
};
