import {
  ButtonDeprecated,
  ButtonDeprecatedBaseProps,
} from '@codecademy/gamut/src';
import { ArrowChevronRightIcon } from '@codecademy/gamut-icons';
import cx from 'classnames';
import React from 'react';

import s from '../Sidebar/styles.scss';

export type SidebarButtonProps = ButtonDeprecatedBaseProps & {
  expanded: boolean;
  onClick: () => void;
  tab?: boolean;
  children?: React.ReactNode;
};

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  expanded,
  onClick,
  children,
  tab,
  ...baseProps
}) => {
  return children ? (
    React.cloneElement(children, {
      onClick: onClick,
    })
  ) : (
    <ButtonDeprecated
      className={s.arrowButton}
      aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
      aria-expanded={expanded}
      onClick={onClick}
      {...baseProps}
      theme={'navy'}
    >
      <ArrowChevronRightIcon
        height={25}
        width={25}
        className={cx(s.expansionIcon, expanded && s.expansionIconExpanded)}
        aria-hidden
      />
    </ButtonDeprecated>
  );
};
