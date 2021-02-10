// import { AbstractProps, AbstractTheme } from '../types/config';
// import { CSSObject } from '../types/css';
// import { Properties, PropName } from '../types/properties';

// // Configs

// export type BaseConfig<T extends AbstractTheme> = {
//   propName: Readonly<PropName>;
//   scale?: Readonly<keyof T>;
//   dependentProps?: Readonly<string[]>;
//   transform: (x: unknown) => string | number;
// };

// export type Configy<
//   T extends AbstractTheme,
//   X extends BaseConfig<T>
// > = X['scale'] extends keyof T
//   ? X
//   : {
//       transform: (
//         x: Properties[X['propName']]['defaultScale']
//       ) => string | number;
//     };

// type ConfigMap<
//   T extends AbstractProps,
//   X extends Record<string, BaseConfig<T>>
// > = {
//   [P in keyof X]: Configy<T, X[P]>;
// };

// // type Yolo = ConfigMap<{}, { margin: { propName: 'margin', transform: (x: number ) => string } }>

// export interface Config<T extends AbstractTheme, C extends BaseConfig<T>>
//   extends BaseConfig<T> {
//   propNames: PropKeys<T, C>[];
// }

// type OnlyStrings<T> = T extends string ? T : never;

// export type PropKeys<T extends AbstractTheme, C extends BaseConfig<T>> =
//   | C['propName']
//   | Extract<
//       C,
//       { dependentProps: Readonly<string[]> }
//     >['dependentProps'][number];

// // Props

// export interface MediaQuery<T> {
//   0?: T;
//   1?: T;
//   2?: T;
//   3?: T;
//   4?: T;
//   5?: T;
// }

// export interface MediaQueryMap<T> extends MediaQuery<T> {
//   base?: T;
//   xs?: T;
//   sm?: T;
//   md?: T;
//   lg?: T;
//   xl?: T;
// }

// export type ResponsiveProp<T> = T | MediaQueryMap<T>;

// export type AllProps<
//   T extends AbstractTheme,
//   C extends Record<string, BaseConfig<T>>
// > = {
//   [Prop in keyof C as OnlyStrings<PropKeys<T, C[Prop]>>]?: Scale<T, C[Prop]>;
// } &
//   ThemeProps<T>;

// /** Styles */
// export interface ThemeProps<T extends AbstractTheme> {
//   theme: T;
// }

// export type StyleProps<T extends AbstractTheme, C extends BaseConfig<T>> = {
//   [Prop in PropKeys<T, C> as `${OnlyStrings<Prop>}`]?: Scale<T, C>;
// } &
//   ThemeProps<T>;

// export type Scale<
//   T extends AbstractTheme,
//   C extends BaseConfig<T>
// > = ResponsiveProp<
//   C['scale'] extends keyof T
//     ? keyof T[C['scale']]
//     : Properties[C['propName']]['defaultScale']
// >;

// type PropFunction<
//   T extends AbstractTheme,
//   C extends Config<T, BaseConfig<T>>
// > = (props: StyleProps<T, C>) => CSSObject;

// export type StyleFn<
//   T extends AbstractTheme,
//   C extends Config<T, BaseConfig<T>>
// > = C & {
//   styleFn: PropFunction<T, C>;
// };

// export type ParserFn<
//   T extends AbstractTheme,
//   C extends Config<T, BaseConfig<T>>
// > = ((props: StyleProps<T, C>) => CSSObject) & StyleFn<T, C>;

// export interface WithTheme {
//   withTheme: {
//     <T extends AbstractTheme>(): {
//       bindMeta: BindMeta<T>;
//       createHandler: CreateHandler<T>;
//       createParser: CreateParser<T>;
//       withProps: WithProps<T>;
//     };
//   };
// }

// export interface CreateHandler<T extends AbstractTheme> {
//   <C extends Config<T, BaseConfig<T>>>(config: C): StyleFn<T, C>;
// }

// export interface CreateParser<T extends AbstractTheme> {
//   <C extends Config<T, BaseConfig<T>>, Fn extends StyleFn<T, C>>(
//     config: Fn
//   ): ParserFn<T, C>;
// }

// export interface BindMeta<T extends AbstractTheme> {
//   <C extends BaseConfig<T>>(config: C): Config<T, BaseConfig<T>>;
// }
// export interface WithProps<T extends AbstractTheme> {
//   <P extends AbstractProps>(): {
//     createVariants: Variant<T, P>;
//     createCss: Css<T, P>;
//   };
// }
// export interface Variant<T extends AbstractTheme, Props extends AbstractProps> {
//   (): {
//     <
//       Keys extends string,
//       Default extends Keys,
//       Prop extends Readonly<string> = 'variant'
//     >(config: {
//       prop?: Prop;
//       default?: Default;
//       variants: Readonly<Record<Keys, Omit<Props, 'theme'>>>;
//     }): {
//       (props: Partial<Record<Prop, Keys>> & ThemeProps<T>): CSSObject;
//     };
//   };
// }

// export interface Css<T extends AbstractTheme, Props extends AbstractProps> {
//   (): {
//     (config: Props): {
//       <Returned extends { theme: T }>(props: Returned): CSSObject;
//     };
//   };
// }
