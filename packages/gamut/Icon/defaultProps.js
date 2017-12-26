export default function defaultProps(props) {
  return {
    width: props.width || 16,
    height: props.height || 16,
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-labelledby': 'title',
    ...props,
  };
}
