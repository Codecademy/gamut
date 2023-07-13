import { Attributes, ReactHTML } from 'react';
import * as React from 'react';

/**
 * Simple tag string, component class, or functional component for a render prop.
 */
export type ChildComponentDescriptor = string | React.ComponentClass | React.FC;
