import React from 'react';
const TabPanel = ({ children, active, renderAllPanels, id, className }) =>
  React.createElement(
    'div',
    {
      id: id,
      'aria-labelledby': id.replace('-panel', ''),
      role: 'tabpanel',
      style: { display: active ? 'block' : 'none' },
      className: className,
    },
    active || renderAllPanels ? children : null
  );
export default TabPanel;
//# sourceMappingURL=index.js.map
