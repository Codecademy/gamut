import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles';

const propTypes = {
  option: PropTypes.any,
  selected: PropTypes.any,
  select: PropTypes.func,
  index: PropTypes.number
};

function DataListOption(props) {

  const className = cx(s.DataListOption, {
    [s.selected]: props.selected
  });

  const handleClick = () => {
    props.select(props.option);
  };

  return (
    <option className={className} onClick={handleClick}>{props.option}</option>
  );
}

DataListOption.propTypes = propTypes;

export default DataListOption;
