import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { cx } from './utils.js';
import Calendar from './Calendar/index.js';
import Clock from './Clock/index.js';
let STYLES = {};
try {
  STYLES = require('../../css/index.css');
  if (!STYLES) {
    console.log('');
  }
} catch (ex) {}
import { SIZE_RANGE, DEFAULT_SIZE } from './constValue.js';
import { LOCALE, DEFAULT_LACALE } from './locale.js';

const Index = memo(props => {
  let {
    size,
    defaultDate,
    defaultTime,
    show,
    locale,
    mode,
    markedDates,
    supportDateRange,
    onYearPicked,
    onMonthPicked,
    onDatePicked,
    onResetDate,
    onResetDefaultDate,
    onSecondChange,
    onMinuteChange,
    onHourChange,
    onMeridiemChange,
    onResetTime,
    onClearTime,
    onResetDefaultTime,
    onClose,
  } = props;
  const handleOnClose = useCallback(() => {
    onClose && onClose();
  }, []);
  const componentClass = cx('picky-date-time', show && 'visible');
  let calendarHtml;
  let breakerHtml;
  let clockHtml;

  size = size.toLowerCase();
  if (SIZE_RANGE.indexOf(size) == -1) {
    size = DEFAULT_SIZE;
  }

  locale = locale.toLowerCase();
  if (typeof LOCALE[locale] === 'undefined') {
    locale = DEFAULT_LACALE;
  }
  if (mode == 0) {
    calendarHtml = (
      <div className={`picky-date-time__calendar`}>
        <Calendar
          size={size}
          defaultDate={defaultDate}
          markedDates={markedDates}
          supportDateRange={supportDateRange}
          locale={locale}
          onYearPicked={onYearPicked}
          onMonthPicked={onMonthPicked}
          onDatePicked={onDatePicked}
          onResetDate={onResetDate}
          onResetDefaultDate={onResetDefaultDate}
        />
      </div>
    );
  }
  if (mode == 1) {
    calendarHtml = (
      <div className={`picky-date-time__calendar`}>
        <Calendar
          size={size}
          defaultDate={defaultDate}
          locale={locale}
          markedDates={markedDates}
          supportDateRange={supportDateRange}
          onYearPicked={onYearPicked}
          onMonthPicked={onMonthPicked}
          onDatePicked={onDatePicked}
          onResetDate={onResetDate}
          onResetDefaultDate={onResetDefaultDate}
        />
      </div>
    );
    breakerHtml = <span className={`picky-date-time__breaker ${[size]}`}>&nbsp;&nbsp;</span>;
    clockHtml = (
      <div className={`picky-date-time__clock ${[size]}`}>
        <Clock
          size={size}
          locale={locale}
          defaultTime={defaultTime}
          onSecondChange={onSecondChange}
          onMinuteChange={onMinuteChange}
          onHourChange={onHourChange}
          onMeridiemChange={onMeridiemChange}
          onResetTime={onResetTime}
          onClearTime={onClearTime}
          onResetDefaultTime={onResetDefaultTime}
        />
      </div>
    );
  }
  if (mode == 2) {
    clockHtml = (
      <div className={`picky-date-time__clock ${[size]}`}>
        <Clock
          size={size}
          locale={locale}
          defaultTime={defaultTime}
          onSecondChange={onSecondChange}
          onMinuteChange={onMinuteChange}
          onHourChange={onHourChange}
          onMeridiemChange={onMeridiemChange}
          onResetTime={onResetTime}
          onClearTime={onClearTime}
          onResetDefaultTime={onResetDefaultTime}
        />
      </div>
    );
  }
  return (
    <div className={`${componentClass}`}>
      <svg className="picky-date-time__close" viewBox="0 0 20 20" width="15" height="15" onClick={handleOnClose}>
        <path
          fill="#868e96"
          d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"
        />
      </svg>
      {calendarHtml}
      {breakerHtml}
      {clockHtml}
    </div>
  );
});
Index.propTypes = {
  mode: PropTypes.number,
  size: PropTypes.string,
  locale: PropTypes.string,
  markedDates: PropTypes.array,
  supportDateRange: PropTypes.array,
  defaultDate: PropTypes.string,
  defaultTime: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onYearPicked: PropTypes.func,
  onMonthPicked: PropTypes.func,
  onDatePicked: PropTypes.func,
  onResetDate: PropTypes.func,
  onSecondChange: PropTypes.func,
  onMinuteChange: PropTypes.func,
  onHourChange: PropTypes.func,
  onMeridiemChange: PropTypes.func,
  onResetTime: PropTypes.func,
  onClearTime: PropTypes.func,
  onResetDefaultDate: PropTypes.func,
  onResetDefaultTime: PropTypes.func,
};

Index.defaultProps = {
  locale: DEFAULT_LACALE,
  size: DEFAULT_SIZE,
  markedDates: [],
  supportDateRange: [],
  show: false,
  mode: 0,
  // GENERAL
  onClose: () => {},
  // CALENDAR
  defaultDate: '',
  onYearPicked: () => {},
  onMonthPicked: () => {},
  onDatePicked: () => {},
  onResetDate: () => {},
  onResetDefaultDate: () => {},
  // CLOCK
  defaultTime: '',
  onSecondChange: () => {},
  onMinuteChange: () => {},
  onHourChange: () => {},
  onMeridiemChange: () => {},
  onResetTime: () => {},
  onClearTime: () => {},
  onResetDefaultTime: () => {},
};
export default Index;
