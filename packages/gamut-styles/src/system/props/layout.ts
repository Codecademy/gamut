import { DisplayTypes } from '../../variables/display';
import { identity } from 'lodash';
import { HandlerProps } from '../types';
import { compose, registerHandler } from '../system';

const displayConfig = {
  type: 'standard',
  scale: [] as DisplayTypes[],
  computeValue: identity,
  propName: 'display',
} as const;

const getDisplay = registerHandler(displayConfig);
type DisplayProps = HandlerProps<typeof getDisplay>;

const overflowConfig = {
  type: 'standard',
  scale: [] as ('visible' | 'hidden' | 'scroll')[],
  computeValue: identity,
  propName: ['overflow', 'overflowX', 'overflowY'],
} as const;

const getOverflow = registerHandler(overflowConfig);
type OverflowProps = HandlerProps<typeof getOverflow>;

export type LayoutProps = DisplayProps & OverflowProps;

export const getLayout = compose<LayoutProps>(getDisplay, getOverflow);
