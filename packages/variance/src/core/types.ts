import { Prop } from '../types/config';

export type Arg<T extends (...args: any) => any> = Parameters<T>[0];
export interface PropConfig {
  props: {
    [i: string]: Prop;
  };
  groups: {
    [i: string]: string[];
  };
}
