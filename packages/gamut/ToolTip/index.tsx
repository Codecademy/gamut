import React, { ReactNode, Component } from 'react';
import cx from 'classnames';
import { CardShell, CardBody } from '../Card';
import s from './styles/index.scss';

type ToolTipProps = {
  target?: ReactNode;
  children?: ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  tipClassName?: string;
  id: string;
};

class ToolTip extends Component<ToolTipProps> {
  static defaultProps = {
    position: 'top-right',
  };

  render() {
    const { children, target, position, id, tipClassName } = this.props;

    const positionClass = tipClassName || s[position];

    return (
      <div className={s.toolTipWrapper}>
        <button
          aria-labelledby={id}
          type="button"
          className={s.targetContainer}
        >
          {target}
        </button>
        <CardShell
          className={cx(s.toolTipContainer, positionClass)}
          role="tooltip"
          id={id}
        >
          <CardBody className={s.toolTipBody}>{children}</CardBody>
        </CardShell>
      </div>
    );
  }
}

export default ToolTip;
