import { BaseProperty } from '../types/config';
/**
 * Orders all properties by the most dependent props
 * @param config
 */
export declare const orderPropNames: (config: Record<string, BaseProperty>) => string[];
