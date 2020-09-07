import { DisplayTypes } from '../../variables/display';
import { identity } from 'lodash';
import { SystemProps } from '../types';
import { system } from '../system';
import { composeSystem } from '../templating/responsiveProp';

const displayConfig = {
  type: 'default',
  scale: [] as DisplayTypes[],
  computeValue: identity,
  propName: 'display',
} as const;

export type DisplayProps = SystemProps<typeof displayConfig>;

export const getDisplay = system<DisplayProps>(displayConfig);

const overflowConfig = {
  type: 'default',
  scale: [] as ('visible' | 'hidden' | 'scroll')[],
  computeValue: identity,
  propName: ['overflow', 'overflowX', 'overflowY'],
} as const;

export type OverflowProps = SystemProps<typeof overflowConfig>;

export const getOverflow = system<DisplayProps>(overflowConfig);

export type LayoutProps = DisplayProps & OverflowProps;

export const getLayout = composeSystem<LayoutProps>(getDisplay, getOverflow);
