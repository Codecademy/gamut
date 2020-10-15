import * as CSS from 'csstype';

export type Properties = {
  /** Backgrounds */
  backgroundImage: {
    defaultScale: CSS.Properties['backgroundImage'];
  };
  backgroundSize: {
    defaultScale: CSS.Properties['backgroundSize'];
  };
  backgroundRepeat: {
    defaultScale: CSS.Properties['backgroundRepeat'];
  };
  backgroundPosition: {
    defaultScale: CSS.Properties['backgroundPosition'];
  };

  /** Borders  */

  borderWidth: {
    defaultScale: CSS.Properties['borderWidth'];
    dependentProps:
      | 'borderWidthLeft'
      | 'borderWidthRight'
      | 'borderWidthTop'
      | 'borderWidthBottom'
      | 'borderWidthX'
      | 'borderWidthY';
  };
  borderRadius: {
    defaultScale: CSS.Properties['borderRadius'];
  };
  borderStyle: {
    // Import fails on some peer versions this ensures that the type exists.  Enabling dependentProps causes union overflow
    defaultScale: CSS.Property.BorderTopStyle;
    // dependentProps:
    //   | 'borderStyleLeft'
    //   | 'borderStyleRight'
    //   | 'borderStyleTop'
    //   | 'borderStyleBottom'
    //   | 'borderStyleX'
    //   | 'borderStyleY';
  };

  /** Shadows */
  boxShadow: {
    defaultScale: CSS.Properties['boxShadow'];
  };
  textShadow: {
    defaultScale: CSS.Properties['textShadow'];
  };

  /** Typography */
  fontFamily: {
    defaultScale: CSS.Properties['fontFamily'];
  };
  fontSize: {
    defaultScale: CSS.Properties['fontSize'];
  };
  fontWeight: {
    defaultScale: CSS.Properties['fontWeight'];
  };
  fontStyle: {
    defaultScale: CSS.Properties['fontStyle'];
  };
  lineHeight: {
    defaultScale: CSS.Properties['lineHeight'];
  };
  letterSpacing: {
    defaultScale: CSS.Properties['letterSpacing'];
  };
  textAlign: {
    defaultScale: CSS.Properties['textAlign'];
  };
  textDecoration: {
    defaultScale: CSS.Properties['textDecoration'];
  };

  /** Spacing */
  margin: {
    defaultScale: CSS.Properties['margin'];
    dependentProps:
      | 'marginLeft'
      | 'marginRight'
      | 'marginTop'
      | 'marginBottom'
      | 'marginX'
      | 'marginY';
  };
  padding: {
    defaultScale: CSS.Properties['padding'];
    dependentProps:
      | 'paddingLeft'
      | 'paddingRight'
      | 'paddingTop'
      | 'paddingBottom'
      | 'paddingX'
      | 'paddingY';
  };
  /** Layout */
  display: {
    defaultScale: CSS.Properties['display'];
  };
  overflow: {
    defaultScale: CSS.Properties['overflow'];
  };
  overflowX: {
    defaultScale: CSS.Properties['overflowX'];
  };
  overflowY: {
    defaultScale: CSS.Properties['overflowY'];
  };
  width: {
    defaultScale: CSS.Properties['width'];
  };
  minWidth: {
    defaultScale: CSS.Properties['minWidth'];
  };
  maxWidth: {
    defaultScale: CSS.Properties['maxWidth'];
  };
  height: {
    defaultScale: CSS.Properties['height'];
  };
  minHeight: {
    defaultScale: CSS.Properties['minHeight'];
  };
  maxHeight: {
    defaultScale: CSS.Properties['maxHeight'];
  };
  verticalAlign: {
    defaultScale: CSS.Properties['verticalAlign'];
  };

  /** Positioning */
  position: {
    defaultScale: CSS.Properties['position'];
  };
  top: {
    defaultScale: CSS.Properties['top'];
  };
  bottom: {
    defaultScale: CSS.Properties['bottom'];
  };
  left: {
    defaultScale: CSS.Properties['left'];
  };
  right: {
    defaultScale: CSS.Properties['right'];
  };
  zIndex: {
    defaultScale: CSS.Properties['zIndex'];
  };
  /** Grid */
  gridAutoColumns: {
    defaultScale: CSS.Properties['gridAutoColumns'];
  };
  gridAutoRows: {
    defaultScale: CSS.Properties['gridAutoRows'];
  };
  gridTemplateColumns: {
    defaultScale: CSS.Properties['gridTemplateColumns'];
  };
  gridTemplateRows: {
    defaultScale: CSS.Properties['gridTemplateRows'];
  };
  gridAutoFlow: {
    defaultScale: CSS.Properties['gridAutoFlow'];
  };
  rowGap: {
    defaultScale: CSS.Properties['rowGap'];
  };
  columnGap: {
    defaultScale: CSS.Properties['columnGap'];
  };
  gridColumn: {
    defaultScale: CSS.Properties['gridColumn'];
  };
  gridRow: {
    defaultScale: CSS.Properties['gridRow'];
  };
  gridColumnStart: {
    defaultScale: CSS.Properties['gridColumnStart'];
  };
  gridRowStart: {
    defaultScale: CSS.Properties['gridRowStart'];
  };
  gridColumnEnd: {
    defaultScale: CSS.Properties['gridColumnEnd'];
  };
  gridRowEnd: {
    defaultScale: CSS.Properties['gridRowEnd'];
  };
  justifySelf: {
    defaultScale: CSS.Properties['justifySelf'];
  };
  justifyContent: {
    defaultScale: CSS.Properties['justifyContent'];
  };
  justifyItems: {
    defaultScale: CSS.Properties['justifyItems'];
  };
  alignSelf: {
    defaultScale: CSS.Properties['alignSelf'];
  };
  alignItems: {
    defaultScale: CSS.Properties['alignItems'];
  };
  alignContent: {
    defaultScale: CSS.Properties['alignContent'];
  };
  /** Flex */
  flexBasis: {
    defaultScale: CSS.Properties['flexBasis'];
  };
  flexDirection: {
    defaultScale: CSS.Properties['flexDirection'];
  };
  flexWrap: {
    defaultScale: CSS.Properties['flexWrap'];
  };
  flexShrink: {
    defaultScale: CSS.Properties['flexShrink'];
  };
  flexGrow: {
    defaultScale: CSS.Properties['flexGrow'];
  };
  order: {
    defaultScale: CSS.Properties['order'];
  };

  /** Colors */
  textColor: {
    property: 'color';
    defaultScale: CSS.Properties['color'];
  };
  borderColor: {
    defaultScale: CSS.Properties['borderColor'];
    dependentProps:
      | 'borderColorLeft'
      | 'borderColorRight'
      | 'borderColorTop'
      | 'borderColorBottom'
      | 'borderColorX'
      | 'borderColorY';
  };
  backgroundColor: {
    defaultScale: CSS.Properties['backgroundColor'];
  };
};

export type PropertyUnion = {
  [P in keyof Properties]: {
    propName: P;
  } & Properties[P];
}[keyof Properties];

export type PropName = PropertyUnion['propName'];

export type Property =
  | Exclude<PropertyUnion, { property: string }>['propName']
  | Extract<PropertyUnion, { property: string }>['property'];

export type DirectionalProperty = Extract<
  PropertyUnion,
  { dependentProps: string }
>['propName'];

export type AllPropertiesAndDependents =
  | PropertyUnion['propName']
  | Extract<PropertyUnion, { dependentProps: string }>['dependentProps'];
