import React, { Component, HTMLAttributes } from 'react';
import omitProps from '../../utils/omitProps';
import cx from 'classnames';
import s from './styles.module.scss';

export type HeaderTabProps = HTMLAttributes<HTMLElement> & {
  component?: any;
  href?: string;
  onClick?: (event: React.MouseEvent, params?: {}) => void;
  params?: {};
};

class HeaderTab extends Component<HeaderTabProps> {
  handleClick: React.MouseEventHandler = e => {
    if (this.props.onClick) {
      this.props.onClick(e, this.props.params);
    }
  };

  render() {
    let { component } = this.props;
    const { className, children, ...propsToTransfer } = this.props;

    if (!component) {
      component = this.props.href ? 'a' : 'div';
    }

    const classes = cx(s.headerTab, className);

    const TabComponent = React.createElement(
      component,
      {
        ...omitProps(['component'], propsToTransfer),
        onClick: this.handleClick,
        className: classes,
      },
      children
    );

    return <div key={this.props.id}>{TabComponent}</div>;
  }
}

export default HeaderTab;
