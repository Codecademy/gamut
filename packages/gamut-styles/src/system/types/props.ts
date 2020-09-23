import * as CSS from 'csstype';

export type Props = {
  /** Backgrounds */
  backgroundImage: {
    defaultValue: CSS.Properties['backgroundImage'];
  };
  backgroundSize: {
    defaultValue: CSS.Properties['backgroundSize'];
  };
  backgroundRepeat: {
    defaultValue: CSS.Properties['backgroundRepeat'];
  };
  backgroundPosition: {
    defaultValue: CSS.Properties['backgroundPosition'];
  };

  /** Borders  */

  borderWidth: {
    defaultValue: CSS.Properties['borderWidth'];
    altProps:
      | 'borderWidthLeft'
      | 'borderWidthRight'
      | 'borderWidthTop'
      | 'borderWidthBottom'
      | 'borderWidthX'
      | 'borderWidthY';
  };
  borderRadius: {
    defaultValue: CSS.Properties['borderRadius'];
  };
  borderStyle: {
    defaultValue: CSS.Property.BorderTopStyle; // Dumb Hack
  };

  /** Shadows */
  boxShadow: {
    defaultValue: CSS.Properties['boxShadow'];
  };
  textShadow: {
    defaultValue: CSS.Properties['textShadow'];
  };

  /** Typography */
  fontFamily: {
    defaultValue: CSS.Properties['fontFamily'];
  };
  fontSize: {
    defaultValue: CSS.Properties['fontSize'];
  };
  fontWeight: {
    defaultValue: CSS.Properties['fontWeight'];
  };
  fontStyle: {
    defaultValue: CSS.Properties['fontStyle'];
  };
  lineHeight: {
    defaultValue: CSS.Properties['lineHeight'];
  };
  letterSpacing: {
    defaultValue: CSS.Properties['letterSpacing'];
  };
  textAlign: {
    defaultValue: CSS.Properties['textAlign'];
  };

  /** Spacing */
  margin: {
    defaultValue: CSS.Properties['margin'];
    altProps:
      | 'marginLeft'
      | 'marginRight'
      | 'marginTop'
      | 'marginBottom'
      | 'marginX'
      | 'marginY';
  };
  padding: {
    defaultValue: CSS.Properties['padding'];
    altProps:
      | 'paddingLeft'
      | 'paddingRight'
      | 'paddingTop'
      | 'paddingBottom'
      | 'paddingX'
      | 'paddingY';
  };
  /** Layout */
  display: {
    defaultValue: CSS.Properties['display'];
  };
  overflow: {
    defaultValue: CSS.Properties['overflow'];
  };
  overflowX: {
    defaultValue: CSS.Properties['overflowX'];
  };
  overflowY: {
    defaultValue: CSS.Properties['overflowY'];
  };
  width: {
    defaultValue: CSS.Properties['width'];
  };
  minWidth: {
    defaultValue: CSS.Properties['minWidth'];
  };
  maxWidth: {
    defaultValue: CSS.Properties['maxWidth'];
  };
  height: {
    defaultValue: CSS.Properties['height'];
  };
  minHeight: {
    defaultValue: CSS.Properties['minHeight'];
  };
  maxHeight: {
    defaultValue: CSS.Properties['maxHeight'];
  };
  verticalAlign: {
    defaultValue: CSS.Properties['verticalAlign'];
  };

  /** Positioning */
  position: {
    defaultValue: CSS.Properties['position'];
  };
  top: {
    defaultValue: CSS.Properties['top'];
  };
  bottom: {
    defaultValue: CSS.Properties['bottom'];
  };
  left: {
    defaultValue: CSS.Properties['left'];
  };
  right: {
    defaultValue: CSS.Properties['right'];
  };
  zIndex: {
    defaultValue: CSS.Properties['zIndex'];
  };
  /** Grid */
  gridAutoColumns: {
    defaultValue: CSS.Properties['gridAutoColumns'];
  };
  gridAutoRows: {
    defaultValue: CSS.Properties['gridAutoRows'];
  };
  gridTemplateColumns: {
    defaultValue: CSS.Properties['gridTemplateColumns'];
  };
  gridTemplateRows: {
    defaultValue: CSS.Properties['gridTemplateRows'];
  };
  gridAutoFlow: {
    defaultValue: CSS.Properties['gridAutoFlow'];
  };
  rowGap: {
    defaultValue: CSS.Properties['rowGap'];
  };
  columnGap: {
    defaultValue: CSS.Properties['columnGap'];
  };
  gridColumn: {
    defaultValue: CSS.Properties['gridColumn'];
  };
  gridRow: {
    defaultValue: CSS.Properties['gridRow'];
  };
  gridColumnStart: {
    defaultValue: CSS.Properties['gridColumnStart'];
  };
  gridRowStart: {
    defaultValue: CSS.Properties['gridRowStart'];
  };
  gridColumnEnd: {
    defaultValue: CSS.Properties['gridColumnEnd'];
  };
  gridRowEnd: {
    defaultValue: CSS.Properties['gridRowEnd'];
  };
  justifySelf: {
    defaultValue: CSS.Properties['justifySelf'];
  };
  justifyContent: {
    defaultValue: CSS.Properties['justifyContent'];
  };
  justifyItems: {
    defaultValue: CSS.Properties['justifyItems'];
  };
  alignSelf: {
    defaultValue: CSS.Properties['alignSelf'];
  };
  alignItems: {
    defaultValue: CSS.Properties['alignItems'];
  };
  alignContent: {
    defaultValue: CSS.Properties['alignContent'];
  };
  /** Flex */
  flexBasis: {
    defaultValue: CSS.Properties['flexBasis'];
  };
  flexDirection: {
    defaultValue: CSS.Properties['flexDirection'];
  };
  flexWrap: {
    defaultValue: CSS.Properties['flexWrap'];
  };
  flexShrink: {
    defaultValue: CSS.Properties['flexShrink'];
  };
  flexGrow: {
    defaultValue: CSS.Properties['flexGrow'];
  };
  order: {
    defaultValue: CSS.Properties['order'];
  };

  /** Colors */
  color: {
    defaultValue: CSS.Properties['color'];
  };
  borderColor: {
    defaultValue: CSS.Properties['borderColor'];
    altProps:
      | 'borderColorLeft'
      | 'borderColorRight'
      | 'borderColorTop'
      | 'borderColorBottom'
      | 'borderColorX'
      | 'borderColorY';
  };
  backgroundColor: {
    defaultValue: CSS.Properties['backgroundColor'];
  };
};

type Alignments =
  | 'justifySelf'
  | 'justifyContent'
  | 'justifyItems'
  | 'alignSelf'
  | 'alignItems'
  | 'alignContent';

type FlexProps =
  | 'flexBasis'
  | 'flexDirection'
  | 'flexWrap'
  | 'flexShrink'
  | 'flexGrow'
  | 'order'
  | Alignments;

type GridProps =
  | 'gridAutoColumns'
  | 'gridAutoRows'
  | 'gridTemplateColumns'
  | 'gridTemplateRows'
  | 'gridAutoFlow'
  | 'rowGap'
  | 'columnGap'
  | 'gridColumn'
  | 'gridRow'
  | 'gridColumnStart'
  | 'gridRowStart'
  | 'gridColumnEnd'
  | 'gridRowEnd'
  | Alignments;

type LayoutProps =
  | 'display'
  | 'overflow'
  | 'overflowX'
  | 'overflowY'
  | 'width'
  | 'minWidth'
  | 'maxWidth'
  | 'height'
  | 'minHeight'
  | 'maxHeight'
  | 'verticalAlign';

type Positioning = 'position' | 'top' | 'bottom' | 'left' | 'right' | 'zIndex';

type SpacingProps = 'margin' | 'padding';

type TypographyProps =
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'fontStyle'
  | 'lineHeight'
  | 'letterSpacing'
  | 'textAlign';

type ShadowProps = 'boxShadow' | 'textShadow';

type BorderProps =
  | 'borderColor'
  | 'borderWidth'
  | 'borderRadius'
  | 'borderStyle';

type BackgroundProps =
  | 'backgroundImage'
  | 'backgroundSize'
  | 'backgroundRepeat'
  | 'backgroundPosition';

export type ConfigShape = {
  background?: Pick<Props, BackgroundProps>;
  typography?: Pick<Props, TypographyProps>;
  layout?: Pick<Props, LayoutProps>;
  flex?: Pick<Props, FlexProps>;
  grid?: Pick<Props, GridProps>;
  spacing?: Pick<Props, SpacingProps>;
  positioning?: Pick<Props, Positioning>;
  border?: Pick<Props, BorderProps>;
  shadow?: Pick<Props, ShadowProps>;
};
