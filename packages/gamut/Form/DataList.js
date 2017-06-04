import React from 'react';
import PropTypes from 'prop-types';
import { isArray, isObject, each } from 'lodash';
import cx from 'classnames';
import s from './styles/DataList.scss';

const DataList = (props) => {
  const className = cx(props.className);

  // Generate list of options
  const { options, ...propsToTransfer } = props;

  let listOptions = [];

  if (isArray(options)) {
    listOptions = options.map((option) => {
      return (
        <option key={option} value={option} className={s.option}>{option}</option>
      );
    });
  } else if (isObject(options)) {
    each(options, (val, key) => {
      listOptions.push(<option key={key} value={key} className={s.option}>{val}</option>);
    });
  }

  return (
    <div className={className}>
      <input {...propsToTransfer} className={s.DataList} list={props.htmlFor} />
      <datalist id={props.htmlFor}>
        {listOptions}
      </datalist>
    </div>
  );
};

DataList.propTypes = {
  className: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object
  ]),
  htmlFor: PropTypes.string.isRequired
};

export default DataList;
