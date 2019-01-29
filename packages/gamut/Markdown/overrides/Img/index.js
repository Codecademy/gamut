import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

/**
 * Overrides image elements to prevent errors from images with closing tags
 * ie: <img src=""></img>
 */

// eslint-disable-next-line jsx-a11y/alt-text
const Img = ({ children, ...props }) => <img {...props} />;

Img.propTypes = propTypes;

export default Img;
