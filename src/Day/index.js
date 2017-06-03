import React, {PureComponent} from 'react';
import classNames from 'classnames';
import parse from 'date-fns/parse';
import styles from './Day.scss';

export default class Day extends PureComponent {
  handleClick = (event) => {
    const {date, isDisabled, onClick} = this.props;
    if (!isDisabled && typeof onClick === 'function') {
      onClick(parse(date), event);
    }
  };

  handleDayMouseEnter = (event) => {
    const {date, isDisabled, onMouseEnter} = this.props;
    if (!isDisabled && typeof onMouseEnter === 'function') {
      onMouseEnter(parse(date), event);
    }
  };

  handleDayMouseDown = (event) => {
    const {date, isDisabled, onMouseDown} = this.props;
    if (!isDisabled && typeof onMouseDown === 'function') {
      onMouseDown(parse(date), event);
    }
  };

  handleDayMouseUp = (event) => {
    const {date, isDisabled, onMouseUp} = this.props;
    if (!isDisabled && typeof onMouseUp === 'function') {
      onMouseUp(parse(date), event);
    }
  };

  renderSelection(selectionColor) {
    const {
      day,
      date,
      isToday,
      locale: {todayLabel},
      monthShort,
    } = this.props;

    return (
      <div
        className={styles.selection}
        data-date={date}
      >
        <span className={styles.month}>
          {isToday ? todayLabel.short || todayLabel.long : monthShort}
        </span>
        <span className={styles.day}>{day}</span>
      </div>
    );
  }

  render() {
    const {
      className,
      currentYear,
      date,
      day,
      handlers,
      isDisabled,
      isHighlighted,
      isToday,
      isSelected,
      monthShort,
      renderMonthDay,
      year,
    } = this.props;

    return (
      <li
        className={classNames(styles.root, {
          [styles.today]: isToday,
          [styles.highlighted]: isHighlighted,
          [styles.selected]: isSelected,
          [styles.disabled]: isDisabled,
          [styles.enabled]: !isDisabled,
        }, className)}
        onClick={this.handleClick}
        onMouseDown={this.handleDayMouseDown}
        onMouseEnter={this.handleDayMouseEnter}
        onMouseUp={this.handleDayMouseUp}
        data-date={date}
        {...handlers}
      >
        <span className={styles.day}>{day}</span>
        { typeof renderMonthDay === 'function' && renderMonthDay(date) }
        { day === 1 &&
          <span className={styles.month}>
            { monthShort }
            {(day === 1 && currentYear !== year) &&
              <span className={styles.year}>{ year }</span>
            }
          </span>
        }
      </li>
    );
  }
}
