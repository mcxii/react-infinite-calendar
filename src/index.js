import React, {Component} from 'react';
import Calendar from './Calendar';
import {withDateSelection} from './Calendar/withDateSelection';

export {default as Calendar} from './Calendar';
export {withDateSelection} from './Calendar/withDateSelection';
export {withKeyboardSupport} from './Calendar/withKeyboardSupport';
export {withMultipleDates, defaultMultipleDateInterpolation} from './Calendar/withMultipleDates';
export {withRange, EVENT_TYPE} from './Calendar/withRange';

/*
 * By default, Calendar is a controlled component.
 * Export a sensible default for minimal setup
 */
export default class DefaultCalendar extends Component {
  static defaultProps = {
    Component: withDateSelection(Calendar),
    interpolateSelection: (selected) => selected,
  };
  state = {
    selected: typeof this.props.selected !== 'undefined'
      ? this.props.selected
      : new Date(),
  };
  componentWillReceiveProps({selected}) {
    if (selected !== this.props.selected) {
      this.setState({selected});
    }
  }
  handleSelect = (selected, event) => {
    const {onSelect, interpolateSelection} = this.props;

    if (typeof onSelect === 'function') { onSelect(selected, event); }

    this.setState({selected: interpolateSelection(selected, this.state.selected)});
  }

  handleDayMouseEnter = (selected, event) => {
    const {onDayMouseEnter} = this.props;
    if (typeof onDayMouseEnter === 'function') { onDayMouseEnter(selected, event); }
  };

  handleDayMouseDown = (selected, event) => {
    const {onDayMouseDown} = this.props;
    if (typeof onDayMouseDown === 'function') { onDayMouseDown(selected, event); }
  };

  handleDayMouseUp = (selected, event) => {
    const {onDayMouseUp} = this.props;
    if (typeof onDayMouseUp === 'function') { onDayMouseUp(selected, event); }
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const {Component, interpolateSelection, ...props} = this.props;

    return (
      <Component
        {...props}
        onSelect={this.handleSelect}
        onMouseDown={this.handleDayMouseDown}
        onMouseEnter={this.handleDayMouseEnter}
        onMouseUp={this.handleDayMouseUp}
        selected={this.state.selected}
      />
    );
  }
}
