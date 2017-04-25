import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Calendar from './Calendar';
import Clock from './Clock';

import {
  SIZE_RANGE,
  LOCALE_RANGE,
  DEFAULT_LACALE,
  DEFAULT_SIZE
} from './constValue';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onClose() {
    const { onClose } = this.props;
    onClose && onClose();
  }
  // CALENDAR
  onYearPicked(yearInfo) {
    this.props.onYearPicked(yearInfo);
  }
  onMonthPicked(monthInfo) {
    this.props.onMonthPicked(monthInfo);
  }
  onDatePicked(dateInfo) {
    this.props.onDatePicked(dateInfo);
  }
  onResetDate(dateInfo) {
    this.props.onResetDate(dateInfo);
  }
  onResetDefaultDate(dateInfo) {
    this.props.onResetDefaultDate(dateInfo);
  }
  // CLOCK
  onSecondChange(secondInfo) {
    this.props.onSecondChange(secondInfo);
  }

  onMinuteChange(minuteInfo) {
    this.props.onMinuteChange(minuteInfo);
  }

  onHourChange(hourInfo) {
    this.props.onHourChange(hourInfo);
  }

  onMeridiemChange(meridiemInfo) {
    this.props.onMeridiemChange(meridiemInfo);
  }

  onResetTime(Info) {
    this.props.onResetTime(Info);
  }

  onClearTime(Info) {
    this.props.onClearTime(Info);
  }

  onResetDefaultTime(Info) {
    this.props.onResetDefaultTime(Info);
  }

  render() {
    let { size, defaultDate, defaultTime, show, locale, mode } = this.props;
    const componentClass = cx('picky-date-time', show && 'visible');
    let calendarHtml;
    let breakerHtml;
    let clockHtml;

    size = size.toLowerCase();
    if (SIZE_RANGE.indexOf(size) == -1) {
      size = DEFAULT_SIZE;
    }

    locale = locale.toLowerCase();
    if (LOCALE_RANGE.indexOf(locale) == -1) {
      locale = DEFAULT_LACALE;
    }

    if (mode == 0) {
      calendarHtml = (
        <div className={`picky-date-time__calendar`}>
          <Calendar
            size={size}
            defaultDate={defaultDate}
            locale={locale}
            onYearPicked={this.onYearPicked.bind(this)}
            onMonthPicked={this.onMonthPicked.bind(this)}
            onDatePicked={this.onDatePicked.bind(this)}
            onResetDate={this.onResetDate.bind(this)}
            onResetDefaultDate={this.onResetDefaultDate.bind(this)}
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
            onYearPicked={this.onYearPicked.bind(this)}
            onMonthPicked={this.onMonthPicked.bind(this)}
            onDatePicked={this.onDatePicked.bind(this)}
            onResetDate={this.onResetDate.bind(this)}
            onResetDefaultDate={this.onResetDefaultDate.bind(this)}
          />
        </div>
      );
      breakerHtml = (
        <span className={`picky-date-time__breaker ${[size]}`}>
          &nbsp;&nbsp;
        </span>
      );
      clockHtml = (
        <div className={`picky-date-time__clock ${[size]}`}>
          <Clock
            size={size}
            locale={locale}
            defaultTime={defaultTime}
            onSecondChange={this.onSecondChange.bind(this)}
            onMinuteChange={this.onMinuteChange.bind(this)}
            onHourChange={this.onHourChange.bind(this)}
            onMeridiemChange={this.onMeridiemChange.bind(this)}
            onResetTime={this.onResetTime.bind(this)}
            onClearTime={this.onClearTime.bind(this)}
            onResetDefaultTime={this.onResetDefaultTime.bind(this)}
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
            onSecondChange={this.onSecondChange.bind(this)}
            onMinuteChange={this.onMinuteChange.bind(this)}
            onHourChange={this.onHourChange.bind(this)}
            onMeridiemChange={this.onMeridiemChange.bind(this)}
            onResetTime={this.onResetTime.bind(this)}
            onClearTime={this.onClearTime.bind(this)}
            onResetDefaultTime={this.onResetDefaultTime.bind(this)}
          />
        </div>
      );
    }
    return (
      <div className={`${componentClass}`}>
        <span
          className={`picky-date-time__close picky-date-time-highlight_off`}
          onClick={this.onClose.bind(this)}
        />
        {calendarHtml}
        {breakerHtml}
        {clockHtml}
      </div>
    );
  }
}

Index.propTypes = {
  mode: PropTypes.number,
  size: PropTypes.string,
  locale: PropTypes.string,
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
  onResetDefaultTime: PropTypes.func,
};

Index.defaultProps = {
  locale: DEFAULT_LACALE,
  size: DEFAULT_SIZE,
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
