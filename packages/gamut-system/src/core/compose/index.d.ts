import { Handler, StyleTemplate } from '../../types/system';
import { UnionToIntersection } from '../../types/utils';
export declare const compose: <
  Handlers extends Handler<Record<string, unknown>>[],
  Props extends Partial<UnionToIntersection<Parameters<Handlers[number]>[0]>>
>(
  ...handlers: Handlers
) => ((props: Props) => import('@emotion/serialize').CSSObject) & {
  propNames: (keyof Parameters<Handlers[number]>[0])[];
  styleTemplates: Partial<Record<keyof Props, StyleTemplate<Props>>>;
};
