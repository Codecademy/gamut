import React from 'react';
import cx from 'classnames';
import Tab from '../Tab';
import s from './styles.scss';
const defaultProps = {
  createBaseId: i => `${i}`,
  activeTabIndex: 0,
  onChange: () => {},
};
const TabList = ({
  activeTabIndex,
  center,
  children,
  className,
  createBaseId,
  maxWidth,
  onChange,
}) => {
  const classes = cx(s.tabList, className, { [s.center]: center });
  return React.createElement(
    'div',
    { className: classes, role: 'tablist', style: { maxWidth } },
    React.Children.toArray(children)
      .filter(c => c && c.type === Tab)
      .map((tab, index) => {
        const baseId = createBaseId ? createBaseId(index) : index;
        return React.cloneElement(tab, {
          active: activeTabIndex === index,
          tabIndex: index,
          onChange,
          id: baseId,
          key: baseId,
        });
      })
  );
};
TabList.defaultProps = defaultProps;
export default TabList;
//# sourceMappingURL=index.js.map
