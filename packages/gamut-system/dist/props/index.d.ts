declare const baseConfig: {
    typography: {
        readonly fontFamily: {
            readonly propName: "fontFamily";
        };
        readonly fontWeight: {
            readonly propName: "fontWeight";
        };
        readonly lineHeight: {
            readonly propName: "lineHeight";
        };
        readonly fontSize: {
            readonly propName: "fontSize";
        };
        readonly letterSpacing: {
            readonly propName: "letterSpacing";
        };
        readonly textAlign: {
            readonly propName: "textAlign";
        };
        readonly fontStyle: {
            readonly propName: "fontStyle";
        };
        readonly textDecoration: {
            readonly propName: "textDecoration";
        };
        readonly textTransform: {
            readonly propName: "textTransform";
        };
        readonly whiteSpace: {
            readonly propName: "whiteSpace";
        };
    };
    spacing: {
        readonly margin: {
            readonly propName: "margin";
            readonly dependentProps: readonly ["marginLeft", "marginRight", "marginTop", "marginBottom", "marginX", "marginY"];
            readonly type: "directional";
        };
        readonly padding: {
            readonly propName: "padding";
            readonly dependentProps: readonly ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "paddingX", "paddingY"];
            readonly type: "directional";
        };
    };
    border: {
        readonly borderWidth: {
            readonly propName: "borderWidth";
            readonly dependentProps: readonly ["borderWidthLeft", "borderWidthRight", "borderWidthTop", "borderWidthBottom", "borderWidthX", "borderWidthY"];
            readonly type: "directional";
        };
        readonly borderRadius: {
            readonly propName: "borderRadius";
        };
        readonly borderStyle: {
            readonly propName: "borderStyle";
            readonly dependentProps: readonly ["borderStyleLeft", "borderStyleRight", "borderStyleTop", "borderStyleBottom", "borderStyleX", "borderStyleY"];
            readonly type: "directional";
        };
    };
    layout: {
        readonly display: {
            readonly propName: "display";
        };
        readonly overflow: {
            readonly propName: "overflow";
        };
        readonly overflowX: {
            readonly propName: "overflowX";
        };
        readonly overflowY: {
            readonly propName: "overflowY";
        };
        readonly width: {
            readonly propName: "width";
            readonly transformValue: (value: string | number) => string | 0;
        };
        readonly minWidth: {
            readonly propName: "minWidth";
            readonly transformValue: (value: string | number) => string | 0;
        };
        readonly maxWidth: {
            readonly propName: "maxWidth";
            readonly transformValue: (value: string | number) => string | 0;
        };
        readonly height: {
            readonly propName: "height";
            readonly transformValue: (value: string | number) => string | 0;
        };
        readonly minHeight: {
            readonly propName: "minHeight";
            readonly transformValue: (value: string | number) => string | 0;
        };
        readonly maxHeight: {
            readonly propName: "maxHeight";
            readonly transformValue: (value: string | number) => string | 0;
        };
        readonly verticalAlign: {
            readonly propName: "verticalAlign";
        };
        readonly justifySelf: {
            readonly propName: "justifySelf";
        };
        readonly alignSelf: {
            readonly propName: "alignSelf";
        };
    };
    positioning: {
        readonly position: {
            readonly propName: "position";
        };
        readonly top: {
            readonly propName: "top";
            readonly transformValue: (value: string | number) => string | 0;
        };
        readonly right: {
            readonly propName: "right";
            readonly transformValue: (value: string | number) => string | 0;
        };
        readonly bottom: {
            readonly propName: "bottom";
            readonly transformValue: (value: string | number) => string | 0;
        };
        readonly left: {
            readonly propName: "left";
            readonly transformValue: (value: string | number) => string | 0;
        };
        readonly zIndex: {
            readonly propName: "zIndex";
        };
        readonly opacity: {
            readonly propName: "opacity";
        };
    };
    grid: {
        readonly gridAutoColumns: {
            readonly propName: "gridAutoColumns";
        };
        readonly gridAutoRows: {
            readonly propName: "gridAutoRows";
        };
        readonly gridTemplateColumns: {
            readonly propName: "gridTemplateColumns";
        };
        readonly gridTemplateRows: {
            readonly propName: "gridTemplateRows";
        };
        readonly gridAutoFlow: {
            readonly propName: "gridAutoFlow";
        };
        readonly rowGap: {
            readonly propName: "rowGap";
        };
        readonly columnGap: {
            readonly propName: "columnGap";
        };
        readonly gridColumn: {
            readonly propName: "gridColumn";
        };
        readonly gridRow: {
            readonly propName: "gridRow";
        };
        readonly gridColumnStart: {
            readonly propName: "gridColumnStart";
        };
        readonly gridRowStart: {
            readonly propName: "gridRowStart";
        };
        readonly gridColumnEnd: {
            readonly propName: "gridColumnEnd";
        };
        readonly gridRowEnd: {
            readonly propName: "gridRowEnd";
        };
    };
    flex: {
        readonly flexBasis: {
            readonly propName: "flexBasis";
            readonly transformValue: (value: string | number) => string | 0;
        };
        readonly flexDirection: {
            readonly propName: "flexDirection";
        };
        readonly flexWrap: {
            readonly propName: "flexWrap";
        };
        readonly flexShrink: {
            readonly propName: "flexShrink";
        };
        readonly flexGrow: {
            readonly propName: "flexGrow";
        };
        readonly order: {
            readonly propName: "order";
        };
        readonly justifyContent: {
            readonly propName: "justifyContent";
        };
        readonly justifyItems: {
            readonly propName: "justifyItems";
        };
        readonly alignItems: {
            readonly propName: "alignItems";
        };
        readonly alignContent: {
            readonly propName: "alignContent";
        };
    };
    background: {
        readonly backgroundImage: {
            readonly propName: "backgroundImage";
        };
        readonly backgroundSize: {
            readonly propName: "backgroundSize";
        };
        readonly backgroundRepeat: {
            readonly propName: "backgroundRepeat";
        };
        readonly backgroundPosition: {
            readonly propName: "backgroundPosition";
        };
    };
    shadow: {
        readonly boxShadow: {
            readonly propName: "boxShadow";
        };
        readonly textShadow: {
            readonly propName: "textShadow";
        };
    };
    color: {
        readonly textColor: {
            readonly propName: "textColor";
            readonly property: "color";
        };
        readonly borderColor: {
            readonly propName: "borderColor";
            readonly dependentProps: readonly ["borderColorLeft", "borderColorRight", "borderColorTop", "borderColorBottom", "borderColorX", "borderColorY"];
            readonly type: "directional";
        };
        readonly backgroundColor: {
            readonly propName: "backgroundColor";
        };
    };
};
export declare type BaseSystemConfig = typeof baseConfig;
export * from './typography';
export * from './spacing';
export * from './borders';
export * from './layout';
export * from './position';
export * from './grid';
export * from './flex';
export * from './background';
export * from './shadow';
export * from './colors';
