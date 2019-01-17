const isValidComponent = component =>
  typeof component === 'function' ||
  (typeof component === 'object' && 'render' in component);

export default isValidComponent;
