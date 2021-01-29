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
};

export const ArrowButton: React.FC<SidebarButtonProps> = ({
  expanded,
  onClick,
  ...baseProps
}) => {
  return (
    <ButtonDeprecated
      className={s.arrowButton}
      aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
      aria-expanded={expanded}
      onClick={onClick}
      {...baseProps}
      key={'navy'}
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
