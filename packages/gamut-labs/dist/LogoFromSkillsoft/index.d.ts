import { StyleProps } from '@codecademy/variance';
import * as React from 'react';
declare const fromLogoStyles: import("@codecademy/variance/dist/types/config").Parser<import("@codecademy/variance/dist/types/config").Compose<[import("@codecademy/variance/dist/types/config").Parser<import("@codecademy/variance/dist/types/config").TransformerMap<{
    readonly flexBasis: {
        readonly property: "flexBasis";
    };
    readonly flexShrink: {
        readonly property: "flexShrink";
    };
    readonly flexGrow: {
        readonly property: "flexGrow";
    };
    readonly order: {
        readonly property: "order";
    };
    readonly gridColumn: {
        readonly property: "gridColumn";
    };
    readonly gridRow: {
        readonly property: "gridRow";
    };
    readonly gridColumnStart: {
        readonly property: "gridColumnStart";
    };
    readonly gridRowStart: {
        readonly property: "gridRowStart";
    };
    readonly gridColumnEnd: {
        readonly property: "gridColumnEnd";
    };
    readonly gridRowEnd: {
        readonly property: "gridRowEnd";
    };
    readonly justifySelf: {
        readonly property: "justifySelf";
    };
    readonly alignSelf: {
        readonly property: "alignSelf";
    };
    readonly gridArea: {
        readonly property: "gridArea";
    };
    readonly display: {
        readonly property: "display";
    };
    readonly overflow: {
        readonly property: "overflow";
    };
    readonly overflowX: {
        readonly property: "overflowX";
    };
    readonly overflowY: {
        readonly property: "overflowY";
    };
    readonly dimensions: {
        readonly property: "width";
        readonly properties: readonly ["width", "height"];
        readonly transform: (value: string | number) => string | 0;
    };
    readonly width: {
        readonly property: "width";
        readonly transform: (value: string | number) => string | 0;
    };
    readonly minWidth: {
        readonly property: "minWidth";
        readonly transform: (value: string | number) => string | 0;
    };
    readonly maxWidth: {
        readonly property: "maxWidth";
        readonly transform: (value: string | number) => string | 0;
    };
    readonly height: {
        readonly property: "height";
        readonly transform: (value: string | number) => string | 0;
    };
    readonly minHeight: {
        readonly property: "minHeight";
        readonly transform: (value: string | number) => string | 0;
    };
    readonly maxHeight: {
        readonly property: "maxHeight";
        readonly transform: (value: string | number) => string | 0;
    };
    readonly verticalAlign: {
        readonly property: "verticalAlign";
    };
}>>, import("@codecademy/variance/dist/types/config").Parser<import("@codecademy/variance/dist/types/config").TransformerMap<{
    readonly color: {
        readonly property: "color";
        readonly scale: "colors";
    };
    readonly textColor: {
        readonly property: "color";
        readonly scale: "colors";
    };
    readonly bg: {
        readonly property: "backgroundColor";
        readonly scale: "colors";
    };
    readonly borderColor: {
        readonly property: "borderColor";
        readonly scale: "colors";
    };
    readonly borderColorX: {
        readonly property: "borderColor";
        readonly properties: readonly ["borderLeftColor", "borderRightColor"];
        readonly scale: "colors";
    };
    readonly borderColorY: {
        readonly property: "borderColor";
        readonly properties: readonly ["borderTopColor", "borderBottomColor"];
        readonly scale: "colors";
    };
    readonly borderColorLeft: {
        readonly property: "borderLeftColor";
        readonly scale: "colors";
    };
    readonly borderColorRight: {
        readonly property: "borderRightColor";
        readonly scale: "colors";
    };
    readonly borderColorTop: {
        readonly property: "borderTopColor";
        readonly scale: "colors";
    };
    readonly borderColorBottom: {
        readonly property: "borderBottomColor";
        readonly scale: "colors";
    };
}>>, import("@codecademy/variance/dist/types/config").Parser<import("@codecademy/variance/dist/types/config").TransformerMap<{
    readonly p: {
        readonly property: "padding";
        readonly scale: "spacing";
    };
    readonly px: {
        readonly property: "padding";
        readonly properties: readonly ["paddingLeft", "paddingRight"];
        readonly scale: "spacing";
    };
    readonly py: {
        readonly property: "padding";
        readonly properties: readonly ["paddingTop", "paddingBottom"];
        readonly scale: "spacing";
    };
    readonly pt: {
        readonly property: "paddingTop";
        readonly scale: "spacing";
    };
    readonly pb: {
        readonly property: "paddingBottom";
        readonly scale: "spacing";
    };
    readonly pr: {
        readonly property: "paddingRight";
        readonly scale: "spacing";
    };
    readonly pl: {
        readonly property: "paddingLeft";
        readonly scale: "spacing";
    };
    readonly m: {
        readonly property: "margin";
        readonly scale: "spacing";
    };
    readonly mx: {
        readonly property: "margin";
        readonly properties: readonly ["marginLeft", "marginRight"];
        readonly scale: "spacing";
    };
    readonly my: {
        readonly property: "margin";
        readonly properties: readonly ["marginTop", "marginBottom"];
        readonly scale: "spacing";
    };
    readonly mt: {
        readonly property: "marginTop";
        readonly scale: "spacing";
    };
    readonly mb: {
        readonly property: "marginBottom";
        readonly scale: "spacing";
    };
    readonly mr: {
        readonly property: "marginRight";
        readonly scale: "spacing";
    };
    readonly ml: {
        readonly property: "marginLeft";
        readonly scale: "spacing";
    };
}>>, import("@codecademy/variance/dist/types/config").Parser<import("@codecademy/variance/dist/types/config").TransformerMap<{
    readonly position: {
        readonly property: "position";
    };
    readonly inset: {
        readonly property: "inset";
        readonly properties: readonly ["top", "right", "bottom", "left"];
        readonly transform: (value: string | number) => string | 0;
    };
    readonly top: {
        readonly property: "top";
        readonly transform: (value: string | number) => string | 0;
    };
    readonly right: {
        readonly property: "right";
        readonly transform: (value: string | number) => string | 0;
    };
    readonly bottom: {
        readonly property: "bottom";
        readonly transform: (value: string | number) => string | 0;
    };
    readonly left: {
        readonly property: "left";
        readonly transform: (value: string | number) => string | 0;
    };
    readonly zIndex: {
        readonly property: "zIndex";
    };
    readonly opacity: {
        readonly property: "opacity";
    };
}>>]>>;
export interface FromLogoIconStyleProps extends StyleProps<typeof fromLogoStyles> {
}
export interface FromLogoIconProps extends Omit<React.SVGProps<SVGSVGElement>, keyof FromLogoIconStyleProps>, FromLogoIconStyleProps {
}
export declare const LogoFromSkillsoft: React.FC<FromLogoIconProps>;
export {};
