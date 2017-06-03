var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import parse from 'date-fns/parse';
var styles = {
  'root': 'Cal__Day__root',
  'enabled': 'Cal__Day__enabled',
  'highlighted': 'Cal__Day__highlighted',
  'today': 'Cal__Day__today',
  'disabled': 'Cal__Day__disabled',
  'selected': 'Cal__Day__selected',
  'month': 'Cal__Day__month',
  'year': 'Cal__Day__year',
  'selection': 'Cal__Day__selection',
  'day': 'Cal__Day__day',
  'range': 'Cal__Day__range',
  'start': 'Cal__Day__start',
  'end': 'Cal__Day__end',
  'betweenRange': 'Cal__Day__betweenRange'
};

var Day = function (_PureComponent) {
  _inherits(Day, _PureComponent);

  function Day() {
    var _temp, _this, _ret;

    _classCallCheck(this, Day);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleClick = function (event) {
      var _this$props = _this.props,
          date = _this$props.date,
          isDisabled = _this$props.isDisabled,
          onClick = _this$props.onClick;

      if (!isDisabled && typeof onClick === 'function') {
        onClick(parse(date), event);
      }
    }, _this.handleDayMouseEnter = function (event) {
      var _this$props2 = _this.props,
          date = _this$props2.date,
          isDisabled = _this$props2.isDisabled,
          onMouseEnter = _this$props2.onMouseEnter;

      if (!isDisabled && typeof onMouseEnter === 'function') {
        onMouseEnter(parse(date), event);
      }
    }, _this.handleDayMouseDown = function (event) {
      var _this$props3 = _this.props,
          date = _this$props3.date,
          isDisabled = _this$props3.isDisabled,
          onMouseDown = _this$props3.onMouseDown;

      if (!isDisabled && typeof onMouseDown === 'function') {
        onMouseDown(parse(date), event);
      }
    }, _this.handleDayMouseUp = function (event) {
      var _this$props4 = _this.props,
          date = _this$props4.date,
          isDisabled = _this$props4.isDisabled,
          onMouseUp = _this$props4.onMouseUp;

      if (!isDisabled && typeof onMouseUp === 'function') {
        onMouseUp(parse(date), event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Day.prototype.renderSelection = function renderSelection(selectionColor) {
    var _props = this.props,
        day = _props.day,
        date = _props.date,
        isToday = _props.isToday,
        todayLabel = _props.locale.todayLabel,
        monthShort = _props.monthShort;


    return React.createElement(
      'div',
      {
        className: styles.selection,
        'data-date': date
      },
      React.createElement(
        'span',
        { className: styles.month },
        isToday ? todayLabel.short || todayLabel.long : monthShort
      ),
      React.createElement(
        'span',
        { className: styles.day },
        day
      )
    );
  };

  Day.prototype.render = function render() {
    var _classNames;

    var _props2 = this.props,
        className = _props2.className,
        currentYear = _props2.currentYear,
        date = _props2.date,
        day = _props2.day,
        handlers = _props2.handlers,
        isDisabled = _props2.isDisabled,
        isHighlighted = _props2.isHighlighted,
        isToday = _props2.isToday,
        isSelected = _props2.isSelected,
        monthShort = _props2.monthShort,
        renderMonthDay = _props2.renderMonthDay,
        year = _props2.year;


    return React.createElement(
      'li',
      _extends({
        className: classNames(styles.root, (_classNames = {}, _classNames[styles.today] = isToday, _classNames[styles.highlighted] = isHighlighted, _classNames[styles.selected] = isSelected, _classNames[styles.disabled] = isDisabled, _classNames[styles.enabled] = !isDisabled, _classNames), className),
        onClick: this.handleClick,
        onMouseDown: this.handleDayMouseDown,
        onMouseEnter: this.handleDayMouseEnter,
        onMouseUp: this.handleDayMouseUp,
        'data-date': date
      }, handlers),
      React.createElement(
        'span',
        { className: styles.day },
        day
      ),
      typeof renderMonthDay === 'function' && renderMonthDay(date),
      day === 1 && React.createElement(
        'span',
        { className: styles.month },
        monthShort,
        day === 1 && currentYear !== year && React.createElement(
          'span',
          { className: styles.year },
          year
        )
      )
    );
  };

  return Day;
}(PureComponent);

export { Day as default };