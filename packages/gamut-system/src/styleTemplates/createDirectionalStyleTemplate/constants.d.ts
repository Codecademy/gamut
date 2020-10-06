export declare const DIRECTIONS: readonly ['top', 'right', 'bottom', 'left'];
export declare type AllDirections = typeof DIRECTIONS[number];
export declare const DIRECTIONAL_PROPS: {
  readonly margin: {
    readonly left: 'marginLeft';
    readonly right: 'marginRight';
    readonly top: 'marginTop';
    readonly bottom: 'marginBottom';
  };
  readonly padding: {
    readonly left: 'paddingLeft';
    readonly right: 'paddingRight';
    readonly top: 'paddingTop';
    readonly bottom: 'paddingBottom';
  };
  readonly borderColor: {
    readonly left: 'borderLeftColor';
    readonly right: 'borderRightColor';
    readonly top: 'borderTopColor';
    readonly bottom: 'borderBottomColor';
  };
  readonly borderWidth: {
    readonly left: 'borderLeftWidth';
    readonly right: 'borderRightWidth';
    readonly top: 'borderTopWidth';
    readonly bottom: 'borderBottomWidth';
  };
};
