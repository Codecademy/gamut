import { AbstractProps, Handler } from '../../types/config';
import { UnionToIntersection } from '../../types/utils';
export declare const compose: <Handlers extends Handler<AbstractProps>[], Props extends Partial<UnionToIntersection<Parameters<Handlers[number]>[0]>>>(...handlers: Handlers) => Handler<Props>;
