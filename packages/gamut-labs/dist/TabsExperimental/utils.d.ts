import { ReactElement } from 'react';
import * as React from 'react';
import { TabPanelProps } from './types';
export declare const isTabPanelGuard: (child: React.ReactChild) => child is ReactElement<TabPanelProps, string | React.JSXElementConstructor<any>>;
