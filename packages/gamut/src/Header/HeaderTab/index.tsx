import React, { HTMLAttributes } from 'react';
import omitProps from '../../utils/omitProps';
import cx from 'classnames';
import s from './styles.module.scss';

export type HeaderTabProps = HTMLAttributes<HTMLElement> & {
  component?: any;
  href?: string;
  onClick?: (event: React.MouseEvent, params?: {}) => void;
  params?: {};
  className?: string;
};

export const HeaderTab: React.FC<HeaderTabProps> = props => {
  const handleClick: React.MouseEventHandler = (e: any) => {
    if (props.onClick) {
      props.onClick(e, props.params);
    }
  };

  let { component } = props;
  const { className, children, ...propsToTransfer } = props;

  if (!component) {
    component = props.href ? 'a' : 'div';
  }

  const classes = cx(s.headerTab, className);

  const TabComponent = React.createElement(
    component,
    {
      ...omitProps(['component'], propsToTransfer),
      onClick: handleClick,
      className: classes,
    },
    children
  );

  return <div key={props.id}>{TabComponent}</div>;
};

export default HeaderTab;
