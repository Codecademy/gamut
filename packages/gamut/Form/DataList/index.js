import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles';
import DataListOption from './DataListOption';

class DataList extends Component {

  state = {
    filter: this.props.defaultValue || '',
    hide: true,
    selected: false,
    options: []
  }

  componentDidMount() {
    this.setState({
      options: this.props.options
    });
  }

  prepareListOptions() {
    return this.state.options.map((option, index) => {
      return (
        <DataListOption
          key={option}
          index={index}
          option={option}
          className={s.option}
          select={this.selectOption}
          selected={this.state.selected === index}
        />
      );
    });
  }

  handleInputBlur = () => {
    setTimeout(() => {
      this.setState({ hide: true });
    }, 100);
  }

  handleInputClick = () => {
    this.setState({ hide: false });
  }

  handleInputChange = (e) => {
    this.setState({
      filter: e.target.value,
      selected: false,
      hide: false,
      options: this.filterOptions(e.target.value)
    });
  }

  filterOptions = (filterBy) => {
    if (!filterBy) {
      return this.props.options;
    }

    return this.props.options.filter(option => option.toLowerCase().includes(filterBy));
  }

  handleInputKeyDown = (event) => {
    switch (event.which) {

    // DOWN Arrow
    case 40:
      let newSelectedIndex = this.state.selected === false ? 0 : this.state.selected + 1;
      let availableOptions = this.filterOptions(this.state.filter);
      if (newSelectedIndex >= availableOptions.length) newSelectedIndex = availableOptions.length - 1;
      this.setState({
        selected: newSelectedIndex,
        hide: false
      });
      break;

    // UP arrow
    case 38:
      let upArrowSelectedIndex = this.state.selected > 0 ? this.state.selected - 1 : 0;
      this.setState({selected: upArrowSelectedIndex});
      break;

    // ENTER
    case 13:
      this.selectOption(this.filterOptions(this.state.filter)[this.state.selected]);
      break;
    }
  }

  handleInputKeyUp = (event) => {
    switch (event.which) {
    // ESC
    case 27:
      this.setState({
        selected: false,
        hide: true,
        filter: this.state.hide ? '' : this.state.filter
      });
      break;
    }
  }

  selectOption = (value) => {
    let selectedOption;
    this.props.options.forEach((option) => {
      if (option.toLowerCase() === value.toLowerCase()) {
        selectedOption = option;
      }
    });

    this.setState({
      filter: selectedOption,
      selected: false,
      hide: true
    });
  }

  render() {
    const optionWrapperClassNames = cx(s.optionWrapper, {
      [s.hide]: this.state.hide
    });
    return (
      <div>
        <input
          autoComplete="off"
          id={this.props.htmlFor}
          className={s.DataListInput}
          value={this.state.filter}
          onBlur={this.handleInputBlur}
          onKeyUp={this.handleInputKeyUp}
          onClick={this.handleInputClick}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
        />
        <div className={optionWrapperClassNames}>
          {this.prepareListOptions()}
        </div>
      </div>
    );
  }
}

DataList.propTypes = {
  className: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object
  ]),
  htmlFor: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onOptionSelected: PropTypes.func
};

export default DataList;
