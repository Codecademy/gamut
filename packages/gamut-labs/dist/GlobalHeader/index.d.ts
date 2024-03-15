import React from 'react';
import { AnonHeader, FreeHeader, LoadingHeader, ProHeader } from './types';
export declare type GlobalHeaderProps = AnonHeader | FreeHeader | ProHeader | LoadingHeader;
export declare const GlobalHeader: React.FC<GlobalHeaderProps>;
