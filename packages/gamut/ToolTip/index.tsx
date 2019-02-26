import React, { ReactNode, Component } from 'react';
import cx from 'classnames';
import { CardShell, CardBody } from '../Card';
import s from './styles/index.scss';

type ToolTipProps = {
  tipElement?: ReactNode;
  children?: ReactNode | string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  id: string;
};

const defaultProps = {
  position: 'top-right',
};

class ToolTip extends Component<ToolTipProps> {
  private tipElementRef = React.createRef<HTMLButtonElement>();

  constructor(props) {
    super(props);
    this.tipElementRef = React.createRef();
  }

  static defaultProps = defaultProps;

  state = {
    tipElementHeight: 0,
  };

  componentDidMount() {
    const tipElementDimensions: {
      height: number;
    } = this.tipElementRef.current.getBoundingClientRect();

    this.setState({
      tipElementHeight: tipElementDimensions.height,
    });
  }

  getToolTipPosition = position => {
    const { tipElementHeight } = this.state;

    const translateX = 0;
    const translateY = tipElementHeight;

    const positions = {
      'top-left': {
        bottom: translateY,
        right: translateX,
      },
      'top-right': {
        bottom: translateY,
        left: translateX,
      },
      'bottom-left': {
        top: translateY,
        right: translateX,
      },
      'bottom-right': {
        top: translateY,
        left: translateX,
      },
    };

    return positions[position];
  };

  render() {
    const { children, tipElement, position, id } = this.props;
    return (
      <div className={s.toolTipWrapper}>
        <button
          aria-labelledby={id}
          type="button"
          ref={this.tipElementRef}
          className={s.tipElementContainer}
        >
          {tipElement}
        </button>
        <CardShell
          className={s.toolTipContainer}
          style={this.getToolTipPosition(position)}
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
