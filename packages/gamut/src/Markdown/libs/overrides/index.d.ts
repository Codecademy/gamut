import React from 'react';
export interface AttributesMap {
    [key: string]: string | boolean;
}
export interface HTMLToReactNode {
    data: string;
    type: string;
    name?: string;
    children?: HTMLToReactNode[];
    attribs?: any;
    next: HTMLToReactNode;
    prev: HTMLToReactNode;
    parent: HTMLToReactNode;
}
export declare type OverrideSettings = {
    component: React.ComponentType;
    allowedAttributes?: string[];
    processNode?: (node: HTMLToReactNode, props: object) => React.ReactNode;
    shouldProcessNode?: (node: HTMLToReactNode) => boolean;
};
export declare type ManyOverrideSettings = {
    [i: string]: OverrideSettings;
};
export declare const processAttributes: (attributes?: AttributesMap) => {};
export declare const createTagOverride: (tagName: string, Override: OverrideSettings) => {
    shouldProcessNode(node: HTMLToReactNode): boolean;
    processNode(node: HTMLToReactNode, children: HTMLToReactNode[], key: string | number): {};
};
export declare const createCodeBlockOverride: (tagName: string, Override: OverrideSettings) => {
    shouldProcessNode(node: HTMLToReactNode): boolean;
    processNode(node: HTMLToReactNode, children: HTMLToReactNode[], key: string | number): {};
};
export declare const standardOverrides: ({
    shouldProcessNode(node: HTMLToReactNode): boolean;
    processNode(node: HTMLToReactNode): string;
} | {
    shouldProcessNode(): boolean;
    processNode: any;
})[];
