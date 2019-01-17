import React from 'react';
import isValidComponent from '../isValidComponent';

class ClassComponent extends React.Component {
  render() {
    return <div />;
  }
}

const FunctionComponent = () => <div />;

const ForwardedRefComponent = React.forwardRef((props, ref) => (
  <button ref={ref}>{props.children}</button>
));

describe('isValidComponent', () => {
  it('validates class components', () => {
    expect(isValidComponent(ClassComponent)).toBeTruthy();
  });

  it('validates function components', () => {
    expect(isValidComponent(FunctionComponent)).toBeTruthy();
  });

  it('validates forwarded ref components', () => {
    expect(isValidComponent(ForwardedRefComponent)).toBeTruthy();
  });

  it('doesnt validate strings', () => {
    expect(isValidComponent('div')).toBeFalsy();
  });

  it('doesnt validate objects without a render method', () => {
    expect(isValidComponent({})).toBeFalsy();
  });

  it('doesnt validate arrays or other invalid data types', () => {
    expect(isValidComponent([])).toBeFalsy();
    expect(isValidComponent(new Set())).toBeFalsy();
    expect(isValidComponent(new Map())).toBeFalsy();
  });
});
