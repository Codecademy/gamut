import { ColorModes } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import React, { SVGProps } from 'react';
export declare type ProLabelProps = SVGProps<SVGSVGElement> & StyleProps<typeof logoStyles> & StyleProps<typeof placementVariants> & StyleProps<typeof modeVariants> & {
    mode?: ColorModes;
    height?: number;
};
declare const logoStyles: import("@codecademy/variance/dist/types/config").Parser<import("@codecademy/variance/dist/types/config").Compose<[import("@codecademy/variance/dist/types/config").Parser<import("@codecademy/variance/dist/types/config").TransformerMap<{
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
}>>]>>;
declare const placementVariants: (props: import("@codecademy/variance/dist/types/config").VariantProps<"placement", false | "inline"> & {
    theme?: import("@emotion/react").Theme | undefined;
}) => import("@codecademy/variance").CSSObject;
declare const modeVariants: (props: import("@codecademy/variance/dist/types/config").VariantProps<"mode", false | "dark" | "light"> & {
    theme?: import("@emotion/react").Theme | undefined;
}) => import("@codecademy/variance").CSSObject;
declare const Svg: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any> | undefined;
} & React.SVGProps<SVGSVGElement> & {
    p?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "padding";
        readonly scale: "spacing";
    }>;
    px?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "padding";
        readonly properties: readonly ["paddingLeft", "paddingRight"];
        readonly scale: "spacing";
    }>;
    py?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "padding";
        readonly properties: readonly ["paddingTop", "paddingBottom"];
        readonly scale: "spacing";
    }>;
    pt?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "paddingTop";
        readonly scale: "spacing";
    }>;
    pb?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "paddingBottom";
        readonly scale: "spacing";
    }>;
    pr?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "paddingRight";
        readonly scale: "spacing";
    }>;
    pl?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "paddingLeft";
        readonly scale: "spacing";
    }>;
    m?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "margin";
        readonly scale: "spacing";
    }>;
    mx?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "margin";
        readonly properties: readonly ["marginLeft", "marginRight"];
        readonly scale: "spacing";
    }>;
    my?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "margin";
        readonly properties: readonly ["marginTop", "marginBottom"];
        readonly scale: "spacing";
    }>;
    mt?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "marginTop";
        readonly scale: "spacing";
    }>;
    mb?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "marginBottom";
        readonly scale: "spacing";
    }>;
    mr?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "marginRight";
        readonly scale: "spacing";
    }>;
    ml?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "marginLeft";
        readonly scale: "spacing";
    }>;
    flexBasis?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "flexBasis";
    }>;
    flexShrink?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "flexShrink";
    }>;
    flexGrow?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "flexGrow";
    }>;
    order?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "order";
    }>;
    gridColumn?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "gridColumn";
    }>;
    gridRow?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "gridRow";
    }>;
    gridColumnStart?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "gridColumnStart";
    }>;
    gridRowStart?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "gridRowStart";
    }>;
    gridColumnEnd?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "gridColumnEnd";
    }>;
    gridRowEnd?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "gridRowEnd";
    }>;
    justifySelf?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "justifySelf";
    }>;
    alignSelf?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "alignSelf";
    }>;
    gridArea?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "gridArea";
    }>;
    display?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "display";
    }>;
    overflow?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "overflow";
    }>;
    overflowX?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "overflowX";
    }>;
    overflowY?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "overflowY";
    }>;
    dimensions?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "width";
        readonly properties: readonly ["width", "height"];
        readonly transform: (value: string | number) => string | 0;
    }>;
    width?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "width";
        readonly transform: (value: string | number) => string | 0;
    }>;
    minWidth?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "minWidth";
        readonly transform: (value: string | number) => string | 0;
    }>;
    maxWidth?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "maxWidth";
        readonly transform: (value: string | number) => string | 0;
    }>;
    height?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "height";
        readonly transform: (value: string | number) => string | 0;
    }>;
    minHeight?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "minHeight";
        readonly transform: (value: string | number) => string | 0;
    }>;
    maxHeight?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "maxHeight";
        readonly transform: (value: string | number) => string | 0;
    }>;
    verticalAlign?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "verticalAlign";
    }>;
    position?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "position";
    }>;
    inset?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "inset";
        readonly properties: readonly ["top", "right", "bottom", "left"];
        readonly transform: (value: string | number) => string | 0;
    }>;
    top?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "top";
        readonly transform: (value: string | number) => string | 0;
    }>;
    right?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "right";
        readonly transform: (value: string | number) => string | 0;
    }>;
    bottom?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "bottom";
        readonly transform: (value: string | number) => string | 0;
    }>;
    left?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "left";
        readonly transform: (value: string | number) => string | 0;
    }>;
    zIndex?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "zIndex";
    }>;
    opacity?: import("@codecademy/variance/dist/types/config").Scale<{
        readonly property: "opacity";
    }>;
} & {
    theme?: import("@emotion/react").Theme | undefined;
} & import("@codecademy/variance/dist/types/config").VariantProps<"placement", false | "inline"> & import("@codecademy/variance/dist/types/config").VariantProps<"mode", false | "dark" | "light"> & {
    mode?: "dark" | "light" | undefined;
    height?: number | undefined;
}, Pick<React.SVGProps<SVGSVGElement>, "string" | "children" | "className" | "style" | "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "id" | "lang" | "tabIndex" | "role" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDragCapture" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture" | "ref" | "key" | "scale" | "filter" | "fill" | "values" | "spacing" | "clipPath" | "cursor" | "direction" | "fontSizeAdjust" | "fontStretch" | "fontVariant" | "imageRendering" | "paintOrder" | "pointerEvents" | "rotate" | "textRendering" | "transform" | "unicodeBidi" | "visibility" | "wordSpacing" | "writingMode" | "mask" | "offset" | "min" | "max" | "end" | "path" | "azimuth" | "clip" | "alignmentBaseline" | "baselineShift" | "clipRule" | "colorInterpolation" | "colorRendering" | "dominantBaseline" | "fillOpacity" | "fillRule" | "floodColor" | "floodOpacity" | "glyphOrientationVertical" | "lightingColor" | "markerEnd" | "markerMid" | "markerStart" | "shapeRendering" | "stopColor" | "stopOpacity" | "stroke" | "strokeDasharray" | "strokeDashoffset" | "strokeLinecap" | "strokeLinejoin" | "strokeMiterlimit" | "strokeOpacity" | "strokeWidth" | "textAnchor" | "vectorEffect" | "alphabetic" | "hanging" | "ideographic" | "mathematical" | "media" | "method" | "name" | "target" | "type" | "crossOrigin" | "accentHeight" | "accumulate" | "additive" | "allowReorder" | "amplitude" | "arabicForm" | "ascent" | "attributeName" | "attributeType" | "autoReverse" | "baseFrequency" | "baseProfile" | "bbox" | "begin" | "bias" | "by" | "calcMode" | "capHeight" | "clipPathUnits" | "colorInterpolationFilters" | "colorProfile" | "contentScriptType" | "contentStyleType" | "cx" | "cy" | "d" | "decelerate" | "descent" | "diffuseConstant" | "divisor" | "dur" | "dx" | "dy" | "edgeMode" | "elevation" | "enableBackground" | "exponent" | "externalResourcesRequired" | "filterRes" | "filterUnits" | "focusable" | "format" | "fr" | "from" | "fx" | "fy" | "g1" | "g2" | "glyphName" | "glyphOrientationHorizontal" | "glyphRef" | "gradientTransform" | "gradientUnits" | "horizAdvX" | "horizOriginX" | "href" | "in2" | "in" | "intercept" | "k1" | "k2" | "k3" | "k4" | "k" | "kernelMatrix" | "kernelUnitLength" | "kerning" | "keyPoints" | "keySplines" | "keyTimes" | "lengthAdjust" | "limitingConeAngle" | "local" | "markerHeight" | "markerUnits" | "markerWidth" | "maskContentUnits" | "maskUnits" | "numOctaves" | "operator" | "orient" | "orientation" | "origin" | "overlinePosition" | "overlineThickness" | "panose1" | "pathLength" | "patternContentUnits" | "patternTransform" | "patternUnits" | "points" | "pointsAtX" | "pointsAtY" | "pointsAtZ" | "preserveAlpha" | "preserveAspectRatio" | "primitiveUnits" | "r" | "radius" | "refX" | "refY" | "renderingIntent" | "repeatCount" | "repeatDur" | "requiredExtensions" | "requiredFeatures" | "restart" | "result" | "rx" | "ry" | "seed" | "slope" | "specularConstant" | "specularExponent" | "speed" | "spreadMethod" | "startOffset" | "stdDeviation" | "stemh" | "stemv" | "stitchTiles" | "strikethroughPosition" | "strikethroughThickness" | "surfaceScale" | "systemLanguage" | "tableValues" | "targetX" | "targetY" | "textLength" | "to" | "u1" | "u2" | "underlinePosition" | "underlineThickness" | "unicode" | "unicodeRange" | "unitsPerEm" | "vAlphabetic" | "version" | "vertAdvY" | "vertOriginX" | "vertOriginY" | "vHanging" | "vIdeographic" | "viewBox" | "viewTarget" | "vMathematical" | "widths" | "x1" | "x2" | "x" | "xChannelSelector" | "xHeight" | "xlinkActuate" | "xlinkArcrole" | "xlinkHref" | "xlinkRole" | "xlinkShow" | "xlinkTitle" | "xlinkType" | "xmlBase" | "xmlLang" | "xmlns" | "xmlnsXlink" | "xmlSpace" | "y1" | "y2" | "y" | "yChannelSelector" | "z" | "zoomAndPan">, {}>;
export declare const ProLabel: React.FC<React.ComponentProps<typeof Svg>>;
export {};
