import React from 'react';
import s from './styles/Checkbox.scss';
const Checkbox = ({ className, label, htmlFor, ...inputProps }) =>
  React.createElement(
    'div',
    { className: className },
    React.createElement(
      'input',
      Object.assign(
        { id: htmlFor, type: 'checkbox', className: s.invisible },
        inputProps
      )
    ),
    React.createElement(
      'label',
      { htmlFor: htmlFor, className: s.checkboxLabel },
      React.createElement(
        'div',
        { className: s.checkbox },
        React.createElement(
          'svg',
          {
            width: '24px',
            height: '24px',
            viewBox: '0 0 20 20',
            className: s.checkboxVector,
          },
          React.createElement('path', {
            d:
              'M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z',
            className: s.squareVector,
            fill: 'none',
          }),
          React.createElement('polyline', {
            points: '4 11 8 15 16 6',
            className: s.checkVector,
          })
        )
      ),
      React.createElement('span', null, label)
    )
  );
export default Checkbox;
//# sourceMappingURL=Checkbox.js.map
