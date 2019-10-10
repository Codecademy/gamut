import React from 'react';
import cx from 'classnames';
import s from './styles/CardFooter.scss';
const defaultProps = {
  border: 'none',
  align: 'left',
  flex: true,
  standardPadding: true,
  standardHeight: true,
};
const CardFooter = ({
  children,
  border,
  align,
  flex,
  standardPadding,
  standardHeight,
  className,
}) => {
  const footerClasses = cx(
    s.footer,
    {
      [s.flex]: flex,
      [s.solidTopBorder]: border === 'solid',
      [s.dashedTopBorder]: border === 'dashed',
      [s.transparentTopBorder]: border === 'none',
      [s.leftAlign]: align === 'left',
      [s.centerAlign]: align === 'center',
      [s.rightAlign]: align === 'right',
      [s.standardPadding]: standardPadding,
      [s.standardHeight]: standardHeight,
    },
    className
  );
  return React.createElement('div', { className: footerClasses }, children);
};
CardFooter.defaultProps = defaultProps;
export default CardFooter;
//# sourceMappingURL=CardFooter.js.map
