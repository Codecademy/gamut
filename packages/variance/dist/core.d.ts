import { AbstractParser, AbstractPropTransformer, Parser, Prop, PropTransformer, TransformerMap } from './types/config';
import { AbstractTheme } from './types/props';
import { AllUnionKeys, KeyFromUnion } from './types/utils';
export declare const variance: {
    withTheme<T extends AbstractTheme>(): {
        createParser<Config extends Record<string, AbstractPropTransformer<T>>>(config: Config): Parser<T, Config>;
        createTransform<P extends string, Config_1 extends Prop<T>>(prop: P, config: Config_1): PropTransformer<T, P, Config_1>;
        compose<Args extends AbstractParser<T>[]>(...parsers: Args): Parser<T, { [K in AllUnionKeys<Args[number]["config"]>]: KeyFromUnion<Args[number]["config"], K>; }>;
        create<Config_2 extends Record<string, Prop<T>>>(config: Config_2): Parser<T, TransformerMap<T, Config_2>>;
    };
};
