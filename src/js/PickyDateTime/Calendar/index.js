import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cx } from '../utils.js';
import { LOCALE } from '../locale.js';
import { WEEK_NUMBER, PREV_TRANSITION, NEXT_TRANSITION, SELECTOR_YEAR_SET_NUMBER, getDaysArray, getYearSet, formatDateString } from '../constValue';

const isValidDate = function(value, userFormat) {
  userFormat = userFormat || 'mm/dd/yyyy';
  const delimiter = /[^mdy]/.exec(userFormat)[0];
  const theFormat = userFormat.split(delimiter);
  const theDate = value.split(delimiter);

  function isDate(date, format) {
    let m,
      d,
      y,
      i = 0,
      len = format.length,
      f;
    for (i; i < len; i++) {
      f = format[i];
      if (/m/.test(f)) m = date[i];
      if (/d/.test(f)) d = date[i];
      if (/y/.test(f)) y = date[i];
    }
    return (
      m > 0 &&
      m < 13 &&
      y &&
      y.length === 4 &&
      d > 0 &&
      // Is it a valid day of the month?
      d <= new Date(y, m, 0).getDate()
    );
  }
  return isDate(theDate, theFormat);
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let dates = getDaysArray(year, month);

    let defaultDateDate = date;
    let defaultDateMonth = month;
    let defaultDateYear = year;

    let isDefaultDateValid = false;
    if (isValidDate(props.defaultDate)) {
      const dateStr = props.defaultDate.split('/');
      defaultDateMonth = Number(dateStr[0]);
      defaultDateDate = Number(dateStr[1]);
      defaultDateYear = Number(dateStr[2]);
      isDefaultDateValid = true;
      dates = getDaysArray(defaultDateYear, defaultDateMonth);
    } else {
      if (props.defaultDate != '') {
        console.error('The date you provide: ' + props.defaultDate + ' is not a valid date');
      }
    }

    this.state = {
      isDefaultDateValid,
      dates: dates,
      pickedYearMonth: {
        year: defaultDateYear,
        month: defaultDateMonth,
        string: `${formatDateString(defaultDateYear)}-${formatDateString(defaultDateMonth)}`,
      },
      defaultDate: {
        date: defaultDateDate,
        year: defaultDateYear,
        month: defaultDateMonth,
      },
      pickedDateInfo: {
        date: defaultDateDate,
        year: defaultDateYear,
        month: defaultDateMonth,
      },
      currentYearMonthDate: {
        date,
        year,
        month,
      },
      direction: NEXT_TRANSITION,
      yearSelectorPanelList: getYearSet(defaultDateYear),
      yearSelectorPanel: defaultDateYear,
      showMask: false,
      showSelectorPanel: false,
    };

    this.pageClick = this.pageClick.bind(this);
    this.pickDate = this.pickDate.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.showSelectorPanel = this.showSelectorPanel.bind(this);
  }

  componentDidMount() {
    if (document.addEventListener) {
      window.addEventListener('mousedown', this.pageClick, false);
      window.addEventListener('touchend', this.pageClick, false);
    } else {
      document.attachEvent('onmousedown', this.pageClick);
      document.attachEvent('touchend', this.pageClick);
    }
  }

  componentWillUnmount() {
    if (document.removeEventListener) {
      window.removeEventListener('mousedown', this.pageClick, false);
      window.removeEventListener('touchend', this.pageClick, false);
    } else {
      document.detachEvent('onmousedown', this.pageClick);
      document.detachEvent('touchend', this.pageClick);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pickedYearMonth != this.state.pickedYearMonth) {
      const dates = getDaysArray(Number(this.state.pickedYearMonth.year), Number(this.state.pickedYearMonth.month));
      this.setState({ dates });
    }
  }

  pageClick() {
    if (this.mouseIsDownOnSelectorPanelClicker) {
      return;
    }
    this.setState({
      showSelectorPanel: false,
      showMask: false,
    });
  }

  pickYear(year, direction) {
    if (direction == PREV_TRANSITION) {
      year = Number(year) - 1;
    } else {
      year = Number(year) + 1;
    }
    let { pickedYearMonth } = this.state;
    let { month } = pickedYearMonth;
    pickedYearMonth = { ...pickedYearMonth, year: year, string: `${year}-${month}` };
    this.setState({
      pickedYearMonth,
      direction,
    });
    this.props.onYearPicked({ year });
  }

  pickMonth(month, direction) {
    month = Number(month);
    let { pickedYearMonth } = this.state;
    let { year } = pickedYearMonth;
    if (direction == PREV_TRANSITION) {
      if (month == 1) {
        month = 12;
        year = Number(year) - 1;
      } else {
        month = month - 1;
      }
    } else {
      if (month == 12) {
        month = 1;
        year = Number(year) + 1;
      } else {
        month = month + 1;
      }
    }
    month = formatDateString(month);
    year = String(year);
    pickedYearMonth = { ...pickedYearMonth, year, month, string: `${year}-${month}` };
    this.setState({
      pickedYearMonth,
      direction,
    });
    this.props.onMonthPicked({ year, month });
  }

  pickDate(pickedDate) {
    let { pickedDateInfo, pickedYearMonth } = this.state;
    pickedDateInfo = { ...pickedDateInfo, year: pickedYearMonth.year, month: formatDateString(pickedYearMonth.month), date: formatDateString(pickedDate) };
    this.setState({ pickedDateInfo });
    this.props.onDatePicked(pickedDateInfo);
  }

  changeSelectorPanelYearSet(yearSelectorPanel, direction) {
    let yearSelectorPanelList = getYearSet(yearSelectorPanel);
    this.setState({ yearSelectorPanel, yearSelectorPanelList, direction });
  }

  showSelectorPanel() {
    let { showSelectorPanel, showMask } = this.state;
    this.setState({
      showSelectorPanel: !showSelectorPanel,
      showMask: !showMask,
    });
  }

  onMouseDown() {
    this.mouseIsDownOnSelectorPanelClicker = true;
  }

  onMouseUp() {
    this.mouseIsDownOnSelectorPanelClicker = false;
  }

  reset(today = false) {
    let { currentYearMonthDate, pickedDateInfo, pickedYearMonth, defaultDate } = this.state;
    let year, month, date;
    if (!today) {
      year = defaultDate.year;
      month = defaultDate.month;
      date = defaultDate.date;
    } else {
      year = currentYearMonthDate.year;
      month = currentYearMonthDate.month;
      date = currentYearMonthDate.date;
    }
    let direction = NEXT_TRANSITION;
    if (year < pickedYearMonth.year) {
      direction = PREV_TRANSITION;
    } else if (year == pickedYearMonth.year) {
      if (month < pickedYearMonth.month) {
        direction = PREV_TRANSITION;
      }
    }
    month = formatDateString(month);
    date = formatDateString(date);
    pickedDateInfo = { ...pickedDateInfo, year: year, month: month, date: date };
    pickedYearMonth = { ...pickedYearMonth, year: year, month: month, string: `${year}-${month}` };
    this.setState({
      pickedYearMonth: pickedYearMonth,
      pickedDateInfo: pickedDateInfo,
      yearSelectorPanel: year,
      direction: direction,
    });
    if (!today) {
      this.props.onResetDefaultDate(pickedDateInfo);
    } else {
      this.props.onResetDate(pickedDateInfo);
    }
    this.changeSelectorPanelYearSet(year, direction);
  }

  render() {
    let { size, locale } = this.props;
    let {
      isDefaultDateValid,

      dates,
      direction,
      showSelectorPanel,
      yearSelectorPanelList,
      yearSelectorPanel,
      currentYearMonthDate,
      pickedDateInfo,
      pickedYearMonth,
    } = this.state;
    let transitionContainerStyle;
    let content;

    if (dates.length) {
      let row = dates.length / WEEK_NUMBER;
      let rowIndex = 1;
      let rowObj = {};
      dates.map((item, key) => {
        if (key < rowIndex * WEEK_NUMBER) {
          if (!rowObj[rowIndex]) {
            rowObj[rowIndex] = [];
          }
          rowObj[rowIndex].push(item);
        } else {
          rowIndex = rowIndex + 1;
          if (!rowObj[rowIndex]) {
            rowObj[rowIndex] = [];
          }
          rowObj[rowIndex].push(item);
        }
      });
      content = (
        <CalendarBody
          size={size}
          data={rowObj}
          currentYearMonthDate={currentYearMonthDate}
          pickedYearMonth={pickedYearMonth}
          pickedDateInfo={pickedDateInfo}
          onClick={this.pickDate}
          key={pickedYearMonth.string}
        />
      );
      if (row == 6) {
        let height = 385;
        if (size == 'l') {
          height = 500;
        }
        if (size == 's') {
          height = 285;
        }
        if (size == 'xs') {
          height = 235;
        }
        transitionContainerStyle = {
          height: `${height}px`,
        };
      }
    }
    let captionHtml;
    captionHtml = LOCALE[locale].weeks.map((item, key) => {
      return (
        <div className={`picky-date-time-calendar__table-caption picky-date-time-calendar__table-cel no-border ${size}`} key={key}>
          {item}
        </div>
      );
    });
    let selectorPanelClass = cx('picky-date-time-dropdown', 'picky-date-time-calendar__selector-panel', showSelectorPanel && 'visible');
    let selectorPanelMonthHtml = LOCALE[locale].months.map((item, key) => {
      let itemMonth = key + 1;
      let monthItemClass = cx('picky-date-time-dropdown-calendar__month-item', itemMonth == pickedYearMonth.month && 'active');
      let month = itemMonth - 1;
      let direction = NEXT_TRANSITION;
      if (itemMonth < pickedYearMonth.month) {
        direction = PREV_TRANSITION;
        month = itemMonth + 1;
      }
      return (
        <div
          className={monthItemClass}
          onClick={
            itemMonth !== pickedYearMonth.month
              ? () => this.pickMonth(month, direction)
              : () => {
                  return;
                }
          }
          key={key}
        >
          <div className={size}>{item}</div>
        </div>
      );
    });
    let selectorPanelYearHtml;
    if (yearSelectorPanelList.length) {
      selectorPanelYearHtml = yearSelectorPanelList.map((item, key) => {
        let yearItemClass = cx('picky-date-time-dropdown-calendar__year-item', item == pickedYearMonth.year && 'active');
        let year = item - 1;
        let direction = NEXT_TRANSITION;
        if (item < pickedYearMonth.year) {
          direction = PREV_TRANSITION;
          year = item + 1;
        }
        return (
          <div
            className={yearItemClass}
            onClick={
              item !== pickedYearMonth.year
                ? () => this.pickYear(year, direction)
                : () => {
                    return;
                  }
            }
            key={key}
          >
            <div className={size}>{item}</div>
          </div>
        );
      });
    }
    return (
      <div className={`picky-date-time-calendar`}>
        <div className={`picky-date-time-calendar__header`}>
          <div
            className={`${selectorPanelClass}`}
            ref={ref => (this.monthSelectorPanel = ref)}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onTouchEnd={this.onMouseDown}
            onTouchCancel={this.onMouseUp}
          >
            <div className={`picky-date-time-dropdown-calendar__menu ${[size]}`}>
              <div className={`picky-date-time-dropdown-calendar__month`}>{selectorPanelMonthHtml}</div>
              <div style={{ height: '10px' }} />

              <div className={`picky-date-time__col picky-date-time__col-0-5`}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  style={{ verticalAlign: 'middle' }}
                  onClick={() => this.changeSelectorPanelYearSet(yearSelectorPanel - SELECTOR_YEAR_SET_NUMBER, PREV_TRANSITION)}
                >
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </div>
              <div className={`picky-date-time__col picky-date-time__col-9`}>
                <ReactCSSTransitionGroup
                  className="picky-date-time-calendar__selector-panel-year-set-container"
                  transitionName={direction == NEXT_TRANSITION ? 'forward' : 'backward'}
                  transitionAppearTimeout={500}
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                >
                  <div className={`picky-date-time-dropdown-calendar__year`} key={yearSelectorPanelList}>
                    {selectorPanelYearHtml}
                  </div>
                </ReactCSSTransitionGroup>
              </div>
              <div className={`picky-date-time__col picky-date-time__col-0-5`}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  style={{ verticalAlign: 'middle' }}
                  onClick={() => this.changeSelectorPanelYearSet(yearSelectorPanel + SELECTOR_YEAR_SET_NUMBER, NEXT_TRANSITION)}
                >
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </div>
            </div>
          </div>
          <div className={`picky-date-time__col picky-date-time__col-3`}>
            <div className={`picky-date-time__col picky-date-time-calendar__previous`} onClick={() => this.pickYear(pickedYearMonth.year, PREV_TRANSITION)}>
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
                <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
                <path fill="none" d="M24 24H0V0h24v24z" />
              </svg>
            </div>
            <div className={`picky-date-time__col picky-date-time-calendar__sub-previous`} onClick={() => this.pickMonth(pickedYearMonth.month, PREV_TRANSITION)}>
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </div>
          </div>
          <div className={`picky-date-time__col picky-date-time__col-6`}>
            <ReactCSSTransitionGroup
              className="picky-date-time-calendar__title-container"
              transitionName={direction == NEXT_TRANSITION ? 'forward' : 'backward'}
              transitionAppearTimeout={500}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              <div className={`picky-date-time-calendar__title`} key={pickedYearMonth.string}>
                <span className={`picky-date-time-calendar__clicker`} onClick={this.showSelectorPanel} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
                  <span className={`picky-date-time-calendar__clicker`}>
                    <span>{`${LOCALE[locale].months[pickedYearMonth.month - 1]}`}</span>
                  </span>
                  <span>&nbsp;</span>
                  <span className={`picky-date-time-calendar__clicker`}>
                    <span>{`${pickedYearMonth.year}`}</span>
                  </span>
                </span>
              </div>
            </ReactCSSTransitionGroup>
          </div>
          <div className={`picky-date-time__col picky-date-time__col-3`}>
            <div className={`picky-date-time__col picky-date-time-calendar__next`} onClick={() => this.pickMonth(pickedYearMonth.month, NEXT_TRANSITION)}>
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </div>
            <div className={`picky-date-time__col picky-date-time-calendar__sub-next`} onClick={() => this.pickYear(pickedYearMonth.year, NEXT_TRANSITION)}>
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
                <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
                <path fill="none" d="M0 0h24v24H0V0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className={`picky-date-time-calendar__content`}>
          <div className={`picky-date-time-calendar__table`}>
            <div className={`picky-date-time-calendar__table-row`}>{captionHtml}</div>
          </div>
          <ReactCSSTransitionGroup
            className={`picky-date-time-calendar__body-container ${size}`}
            transitionName={direction == NEXT_TRANSITION ? 'forward' : 'backward'}
            transitionAppearTimeout={500}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            style={transitionContainerStyle}
          >
            {content}
          </ReactCSSTransitionGroup>
        </div>
        <div className={`picky-date-time-calendar__button picky-date-time-calendar__today`} onClick={() => this.reset(true)}>
          <span className={`picky-date-time-calendar__inline-span`}>{LOCALE[locale]['today']}</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24" width="15" style={{ verticalAlign: 'middle' }}>
            <path
              fill="#868e96"
              d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
            />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </div>
        {isDefaultDateValid ? (
          <div className={`picky-date-time-calendar__button picky-date-time-calendar__default-day`} onClick={() => this.reset(false)}>
            <span className={`picky-date-time-calendar__inline-span`}>{LOCALE[locale]['reset-date']}</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24" width="15" style={{ verticalAlign: 'middle' }}>
              <path
                fill="#868e96"
                d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
              />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </div>
        ) : (
          ``
        )}
      </div>
    );
  }
}

class CalendarBody extends Component {
  render() {
    let { size, data, currentYearMonthDate, pickedDateInfo, pickedYearMonth, onClick } = this.props;
    let { year, month, date } = currentYearMonthDate;
    let pickedDateYear = pickedDateInfo.year;
    let pickedDateMonth = pickedDateInfo.month;
    let pickedDate = pickedDateInfo.date;
    let pickedMonth = pickedYearMonth.month;

    let content = Object.keys(data).map(key => {
      let colHtml;
      if (data[key].length) {
        colHtml = data[key].map((item, key) => {
          let isPicked = pickedDate == item.name && pickedDateMonth == item.month && pickedDateYear == item.year;
          let isDisabled = pickedMonth != item.month;
          const datePickerItemClass = cx(
            'picky-date-time-calendar__table-cel',
            'picky-date-time-calendar__date-item',
            size,
            isDisabled && 'disabled',
            date == item.name && month == item.month && year == item.year && 'today',
            isPicked && 'active',
          );
          return <CalendarItem key={key} item={item} onClick={onClick} isPicked={isPicked} isDisabled={isDisabled} datePickerItemClass={datePickerItemClass} />;
        });
      }
      return (
        <div className={`picky-date-time-calendar__table-row`} key={key}>
          {colHtml}
        </div>
      );
    });
    return <div className={`picky-date-time-calendar__table slide`}>{content}</div>;
  }
}

class CalendarItem extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.onClick(this.props.item.name);
  }
  render() {
    const { item, isPicked, isDisabled, datePickerItemClass } = this.props;
    return (
      <div
        className={`${datePickerItemClass}`}
        onClick={
          !isDisabled
            ? this.onClick
            : () => {
                return;
              }
        }
      >
        {item.name}
        {isPicked ? (
          <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24" width="15">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </svg>
        ) : (
          ''
        )}
      </div>
    );
  }
}

CalendarItem.propTypes = {
  item: PropTypes.object,
  isPicked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  datePickerItemClass: PropTypes.string,
  onClick: PropTypes.func,
};

CalendarItem.defaultProps = {
  item: {},
  isPicked: false,
  isDisabled: false,
  datePickerItemClass: '',
  onClick: () => {},
};

CalendarBody.propTypes = {
  size: PropTypes.string,
  data: PropTypes.object,
  currentYearMonthDate: PropTypes.object,
  pickedDateInfo: PropTypes.object,
  pickedYearMonth: PropTypes.object,
  onClick: PropTypes.func,
};

CalendarBody.defaultProps = {
  size: 'm',
  data: {},
  currentYearMonthDate: {},
  pickedDateInfo: {},
  pickedYearMonth: {},
  onClick: () => {},
};

Calendar.propTypes = {
  size: PropTypes.string,
  locale: PropTypes.string,
  defaultDate: PropTypes.string,
  onYearPicked: PropTypes.func,
  onMonthPicked: PropTypes.func,
  onDatePicked: PropTypes.func,
  onResetDate: PropTypes.func,
  onResetDefaultDate: PropTypes.func,
};

Calendar.defaultProps = {
  size: 'm',
  locale: 'en-US',
  defaultDate: '',
  onYearPicked: () => {},
  onMonthPicked: () => {},
  onDatePicked: () => {},
  onResetDate: () => {},
  onResetDefaultDate: () => {},
};

export default Calendar;
