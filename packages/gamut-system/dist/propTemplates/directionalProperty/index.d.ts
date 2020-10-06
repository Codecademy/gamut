import { AbstractProps, AbstractPropertyConfig, StyleTemplate } from '../../types/system';
/**
 * Directional props require destructuring of their values to ensure their order.  Instead
 * of sorting the styles to make overrides make sense we handle all of these props at once
 * and use upstream previous values to initialize downstream ones such that upstream specific
 * values will not be overriden by the CSS cascade erroneously.  We prefer this over manually
 * sorting properties at runtime and having consistent CSS for these particular props.
 */
export declare function directionalProperty<Props extends AbstractProps, Config extends AbstractPropertyConfig & Required<Pick<AbstractPropertyConfig, 'propName' | 'computeValue'>>>({ propName, scale, computeValue }: Config): StyleTemplate<Props>;
