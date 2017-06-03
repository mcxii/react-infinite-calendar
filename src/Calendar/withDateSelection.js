import {
  compose,
  withProps,
  withPropsOnChange,
  withState,
} from 'recompose';
import {withDefaultProps} from './';
import {sanitizeDate, withImmutableProps} from '../utils';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

export const enhanceDay = withPropsOnChange(['selected'], props => ({
  isSelected: props.selected === props.date,
}));

const enhanceYear = withPropsOnChange(['selected'], ({selected}) => ({
  selected: parse(selected),
}));

// Enhancer to handle selecting and displaying a single date
export const withDateSelection = compose(
  withDefaultProps,
  withImmutableProps(({
    DayComponent,
    onSelect,
    onDayMouseDown,
    onDayMouseUp,
    onDayMouseEnter,
    setScrollDate,
    YearsComponent,
  }) => ({
    DayComponent: enhanceDay(DayComponent),
    YearsComponent: enhanceYear(YearsComponent),
  })),
  withState('scrollDate', 'setScrollDate', props => props.selected || new Date()),
  withProps(({
    onSelect,
    onDayMouseDown,
    onDayMouseEnter,
    onDayMouseUp,
    setScrollDate,
    ...props
  }) => {
    const selected = sanitizeDate(props.selected, props);

    return {
      passThrough: {
        Day: {
          onClick: onSelect,
          onMouseDown: onDayMouseDown,
          onMouseEnter: onDayMouseEnter,
          onMouseUp: onDayMouseUp,
        },
        Years: {
          onSelect: (year) => handleYearSelect(year, {onSelect, selected, setScrollDate}),
        },
      },
      selected: selected && format(selected, 'YYYY-MM-DD'),
    };
  }),
);

function handleYearSelect(date, {setScrollDate, selected, onSelect}) {
  const newDate = parse(date);

  onSelect(newDate);
  setScrollDate(newDate);
}
