import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {scrollbarSize} from '../utils';
import styles from './Weekdays.scss';

export default class Weekdays extends PureComponent {
  static propTypes = {
    locale: PropTypes.object,
    longWeekdays: PropTypes.bool,
    monthOverflow: PropTypes.bool,
    theme: PropTypes.object,
  };

  render() {
    const {longWeekdays, weekdaysShort, weekdays, weekStartsOn, theme} = this.props;
    const days = longWeekdays ? weekdays : weekdaysShort;
    const orderedWeekdays = [...days.slice(weekStartsOn, 7), ...days.slice(0, weekStartsOn)];

    return (
      <ul
        className={styles.root}
        style={{
          backgroundColor: theme.weekdayColor,
          color: theme.textColor.active,
          paddingRight: this.props.monthOverflow ? scrollbarSize : null,
        }}
        aria-hidden={true}
      >
        {orderedWeekdays.map((val, index) => (
          <li key={`Weekday-${index}`} className={styles.day}>{val}</li>
        ))}
      </ul>
    );
  }
}
