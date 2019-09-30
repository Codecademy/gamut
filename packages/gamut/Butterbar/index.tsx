import cx from 'classnames';
import React, { Component } from 'react';
import styles from './styles.scss';
import Button from '../Button';
import CloseIcon from '../Icon/icons/CloseIcon';

const CLOSED = 'closed';

export enum ButterbarStyle {
  BorderBottom = 'border-bottom',
  FullWidth = 'full-width',
}

export type ButterbarProps = {
  classNames?: {
    container?: string;
    content?: string;
  };
  displayStyle?: ButterbarStyle;
  storage?: ButterbarStorage;
  icon?: React.ReactNode;
};

export type ButterbarStorage = {
  key: string;
  local: Pick<Storage, 'getItem' | 'setItem'>;
};

type ButterbarState = {
  closed: boolean;
  rendered: boolean;
};

class Butterbar extends Component<ButterbarProps, ButterbarState> {
  state = { closed: false, rendered: false };

  closeButterbar = (event: React.SyntheticEvent, storage: ButterbarStorage) => {
    event.stopPropagation();
    storage.local.setItem(storage.key, CLOSED);
    this.setState({ closed: true });
  };

  componentDidMount() {
    const { storage } = this.props;

    this.setState({
      closed: storage && storage.local.getItem(storage.key) === CLOSED,
      rendered: true,
    });
  }

  render() {
    if (this.state.closed || !this.state.rendered) return null;

    const {
      children,
      classNames = {},
      displayStyle = ButterbarStyle.FullWidth,
      storage,
      icon,
    } = this.props;

    return (
      <div
        className={cx(
          styles.container,
          classNames.container,
          displayStyle === ButterbarStyle.FullWidth
            ? styles.containerFullWidth
            : styles.containerBordered
        )}
      >
        {icon && <div data-testid="icon-id">{icon}</div>}
        <div className={cx(styles.content, classNames.content)}>{children}</div>
        {storage && (
          <Button
            onClick={event => this.closeButterbar(event, storage)}
            className={styles.closeButton}
          >
            <CloseIcon />
          </Button>
        )}
      </div>
    );
  }
}

export default Butterbar;
