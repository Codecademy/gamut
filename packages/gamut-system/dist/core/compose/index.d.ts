import { Handler, UnionToIntersection } from '../../types/system';
export declare const compose: <Handlers extends Handler<Record<string, unknown>>[], Props extends Partial<UnionToIntersection<Parameters<Handlers[number]>[0]>>>(...handlers: Handlers) => Handler<Props>;
