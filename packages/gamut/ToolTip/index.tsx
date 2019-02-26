import React, { ReactNode, Component } from 'react';
import s from './styles/index.scss';

type ToolTipProps = {
  tipElement?: ReactNode;
  children?: ReactNode | string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

const defaultProps = {
  position: 'bottom-right',
};

class ToolTip extends Component<ToolTipProps> {
  static defaultProps = defaultProps;

  state = {
    isVisible: false,
    tipElementHeight: 0,
  };

  componentDidMount() {
    const tipElementDimensions: {
      height: number;
    } = this.tipElementRef.getBoundingClientRect();

    this.setState({
      tipElementHeight: tipElementDimensions.height,
    });
  }

  onHover = () => this.setState({ isVisible: true });

  onLeave = () => this.setState({ isVisible: false });

  toggleToolTip = () =>
    this.setState((prev: { isVisible: boolean }) => ({
      isVisible: !prev.isVisible,
    }));

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

  tipElementRef: any = {};

  render() {
    const { children, tipElement, position } = this.props;
    const { isVisible } = this.state;
    return (
      <button
        onMouseEnter={this.onHover}
        onMouseLeave={this.onLeave}
        onClick={this.toggleToolTip}
        className={s.toolTipWrapper}
        aria-labelledby="tooltip"
        type="button"
      >
        <div
          ref={ref => (this.tipElementRef = ref)}
          className={s.tipElementContainer}
        >
          {tipElement}
        </div>
        {isVisible ? (
          <div
            className={s.toolTipContainer}
            style={this.getToolTipPosition(position)}
            role="tooltip"
            id="tooltip"
          >
            {children}
          </div>
        ) : null}
      </button>
    );
  }
}

export default ToolTip;
