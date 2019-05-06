import React, { SVGProps } from 'react';

export type IconProps = (IconPropsSized | IconPropsSquare) & {
  svgProps?: SVGProps<SVGSVGElement>;
};

export type IconPropsSized = {
  height: number;
  width: number;
};

export type IconPropsSquare = {
  size: number;
};

const defaultProps = {
  height: 24,
  width: 24,
};

const defaultSvgProps = {
  fill: 'currentColor',
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
};

export const wrapIcon = (Component: React.FC<SVGProps<SVGSVGElement>>) => {
  const wrappedComponent = (props: IconProps) => {
    const svgProps = {
      ...defaultSvgProps,
      ...props.svgProps,
    };

    if ('size' in props) {
      svgProps.height = props.size;
      svgProps.width = props.size;
    }

    return <Component {...svgProps} />;
  };

  wrappedComponent.defaultProps = defaultProps;

  return wrappedComponent;
};
