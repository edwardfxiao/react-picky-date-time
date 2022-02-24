import React, { useState, useCallback, useMemo, useEffect, useRef, memo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { cx, isValidDates, useWillUnmount } from '../utils';
import { LOCALE } from '../locale';
import { WEEK_NUMBER, PREV_TRANSITION, NEXT_TRANSITION, SELECTOR_YEAR_SET_NUMBER, getDaysArray, getYearSet, formatDateString } from '../constValue';
const TODAY = new Date();
const YEAR = TODAY.getFullYear();
const MONTH = TODAY.getMonth() + 1;
const DATE = TODAY.getDate();
const isValidDate = (value: string) => {
  const userFormat = 'mm/dd/yyyy';
  const delimiter = /[^mdy]/.exec(userFormat)[0];
  const theFormat = userFormat.split(delimiter);
  const theDate = value.split(delimiter);

  function isDate(date: Array<string>, format: Array<string>) {
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
    const nm = Number(m);
    const nd = Number(d);
    const ny = Number(y);
    return (
      nm > 0 &&
      nm < 13 &&
      y &&
      y.length === 4 &&
      nd > 0 &&
      // Is it a valid day of the month?
      nd <= new Date(ny, nm, 0).getDate()
    );
  }
  return isDate(theDate, theFormat);
};
interface IObjectKeysAny {
  [key: string]: any;
}
interface IObjectKeysObject {
  [key: string]: object;
}
interface IObjectKeysBool {
  [key: string]: boolean;
}
interface IObjectKeysArray {
  [key: string]: Array<object>;
}
interface CalendarProps {
  size: string;
  locale: string;
  defaultDate: string;
  markedDates: Array<string>;
  supportDateRange: Array<string>;
  onYearPicked?: (res: object) => void;
  onMonthPicked?: (res: object) => void;
  onDatePicked?: (res: object) => void;
  onResetDate?: (res: object) => void;
  onResetDefaultDate?: (res: object) => void;
}
const Calendar: React.FC<CalendarProps> = memo(
  ({ size, locale, defaultDate, markedDates, supportDateRange, onYearPicked = () => {}, onMonthPicked = () => {}, onDatePicked = () => {}, onResetDate = () => {}, onResetDefaultDate = () => {} }) => {
    const isMouseIsDownOnSelectorPanelClicker = useRef(false);
    let defaultDateDate = DATE;
    let defaultDateMonth = MONTH;
    let defaultDateYear = YEAR;
    let defaultDates = getDaysArray(YEAR, MONTH);
    const isDefaultDateValid = useMemo(() => isValidDate(defaultDate), [defaultDate]);
    if (isDefaultDateValid) {
      const dateStr = defaultDate.split('/');
      // MM/DD/YYYY
      defaultDateYear = Number(dateStr[2]);
      defaultDateMonth = Number(dateStr[0]);
      defaultDateDate = Number(dateStr[1]);
      defaultDates = getDaysArray(defaultDateYear, defaultDateMonth);
    }
    const defaultYearStr = String(defaultDateYear);
    const defaultMonthStr = formatDateString(defaultDateMonth);
    const defaultDateStr = formatDateString(defaultDateDate);
    const [dates, setDates] = useState(defaultDates);

    const [pickedYearMonth, setPickedYearMonth] = useState({
      year: defaultYearStr,
      month: defaultMonthStr,
      string: `${defaultYearStr}-${defaultMonthStr}`,
    });
    const [pickedDateInfo, setPickedDateInfo] = useState({
      year: defaultYearStr,
      month: defaultMonthStr,
      date: defaultDateStr,
    });
    const [currentYearMonthDate] = useState({
      year: String(YEAR),
      month: String(MONTH),
      date: String(DATE),
    });
    const [direction, setDirection] = useState(NEXT_TRANSITION);
    const [yearSelectorPanelList, setYearSelectorPanelList] = useState(getYearSet(defaultDateYear));
    const [yearSelectorPanel, setYearSelectorPanel] = useState(defaultDateYear);
    const [showMask, setShowMask] = useState(false);
    const [showSelectorPanel, setShowSelectorPanel] = useState(false);

    const markedDatesHash: IObjectKeysBool = {};
    if (markedDates && isValidDates(markedDates)) {
      markedDates.forEach(d => {
        markedDatesHash[d] = true;
      });
    }
    const onMouseDown = useCallback(() => {
      isMouseIsDownOnSelectorPanelClicker.current = true;
    }, []);
    const onMouseUp = useCallback(() => {
      isMouseIsDownOnSelectorPanelClicker.current = false;
    }, []);
    const $monthSelectorPanel = useRef(null);
    useEffect(() => {
      setDates(getDaysArray(Number(pickedYearMonth.year), Number(pickedYearMonth.month)));
    }, [pickedYearMonth]);
    const minSupportDate = supportDateRange.length > 0 && isValidDate(supportDateRange[0]) ? supportDateRange[0] : '';
    const maxSupportDate = supportDateRange.length > 1 && isValidDate(supportDateRange[1]) ? supportDateRange[1] : '';

    const pickYear = useCallback(
      (year, direction) => {
        year = Number(year);
        if (direction === PREV_TRANSITION) {
          year = year - 1;
        } else {
          year = year + 1;
        }
        setPickedYearMonth({ ...pickedYearMonth, year, string: `${year}-${pickedYearMonth.month}` });
        setDirection(direction);
        onYearPicked({ year });
      },
      [pickedYearMonth],
    );
    const pickMonth = useCallback(
      (month, direction) => {
        month = Number(month);
        let year = Number(pickedYearMonth.year);
        if (direction === PREV_TRANSITION) {
          if (month === 1) {
            month = 12;
            year = year - 1;
          } else {
            month = month - 1;
          }
        } else {
          if (month === 12) {
            month = 1;
            year = year + 1;
          } else {
            month = month + 1;
          }
        }
        const yearStr = String(year);
        const monthStr = formatDateString(month);
        setPickedYearMonth({ ...pickedYearMonth, year: yearStr, month: monthStr, string: `${yearStr}-${monthStr}` });
        setDirection(direction);
        onMonthPicked({ year: yearStr, month: monthStr });
      },
      [pickedYearMonth],
    );
    const pickDate = useCallback(
      pickedDate => {
        const newPickedDateInfo = {
          ...pickedDateInfo,
          year: pickedYearMonth.year,
          month: pickedYearMonth.month,
          date: formatDateString(Number(pickedDate)),
        };
        setPickedDateInfo(newPickedDateInfo);
        onDatePicked(newPickedDateInfo);
      },
      [pickedYearMonth, pickedDateInfo],
    );
    const reset = useCallback(
      (today = false) => {
        let year = YEAR;
        let month = MONTH;
        let date = DATE;
        if (!today) {
          const dateStr = defaultDate.split('/');
          // MM/DD/YYYY
          year = Number(dateStr[2]);
          month = Number(dateStr[0]);
          date = Number(dateStr[1]);
        }
        let direction = NEXT_TRANSITION;
        if (year < Number(pickedYearMonth.year)) {
          direction = PREV_TRANSITION;
        } else if (year === Number(pickedYearMonth.year)) {
          if (month < Number(pickedYearMonth.month)) {
            direction = PREV_TRANSITION;
          }
        }
        const yearStr = formatDateString(year);
        const monthStr = formatDateString(month);
        const dateStr = formatDateString(date);
        setPickedDateInfo({
          ...pickedDateInfo,
          year: yearStr,
          month: monthStr,
          date: dateStr,
        });
        setPickedYearMonth({
          ...pickedYearMonth,
          year: yearStr,
          month: monthStr,
          string: `${yearStr}-${monthStr}`,
        });
        changeSelectorPanelYearSet(year, direction);
        if (!today) {
          onResetDefaultDate(pickedDateInfo);
        } else {
          onResetDate(pickedDateInfo);
        }
      },
      [pickedYearMonth],
    );
    const changeSelectorPanelYearSet = useCallback((yearSelectorPanel, direction) => {
      setDirection(direction);
      setYearSelectorPanel(yearSelectorPanel);
      setYearSelectorPanelList(getYearSet(yearSelectorPanel));
    }, []);
    const handleShowSelectorPanel = useCallback(() => {
      setShowSelectorPanel(!showSelectorPanel);
      setShowMask(!showMask);
    }, [showSelectorPanel, showMask]);

    let transitionContainerStyle;
    let content;

    if (dates.length) {
      let row = dates.length / WEEK_NUMBER;
      let rowIndex = 1;
      let rowObj: IObjectKeysArray = {};
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
          onClick={pickDate}
          key={pickedYearMonth.string}
          markedDatesHash={markedDatesHash}
          minSupportDate={minSupportDate}
          maxSupportDate={maxSupportDate}
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

    const captionHtml = LOCALE[locale].weeks.map((item: string, key: string) => {
      return (
        <div className={`picky-date-time-calendar__table-caption picky-date-time-calendar__table-cel no-border ${size}`} key={key}>
          {item}
        </div>
      );
    });
    let selectorPanelClass = cx('picky-date-time-dropdown', 'picky-date-time-calendar__selector-panel', showSelectorPanel && 'visible');
    let selectorPanelMonthHtml = LOCALE[locale].months.map((item: string, key: string) => {
      let itemMonth: number = Number(key) + 1;
      const numberMonth = Number(pickedYearMonth.month);
      let monthItemClass = cx('picky-date-time-dropdown-calendar__month-item', itemMonth == numberMonth && 'active');
      let month = itemMonth - 1;
      let direction = NEXT_TRANSITION;
      if (itemMonth < numberMonth) {
        direction = PREV_TRANSITION;
        month = itemMonth + 1;
      }
      return (
        <div
          className={monthItemClass}
          onClick={
            itemMonth !== numberMonth
              ? () => pickMonth(month, direction)
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
        const numberYearMonth = Number(pickedYearMonth.year);
        let yearItemClass = cx('picky-date-time-dropdown-calendar__year-item', item == numberYearMonth && 'active');
        let year = item - 1;
        let direction = NEXT_TRANSITION;
        if (item < numberYearMonth) {
          direction = PREV_TRANSITION;
          year = item + 1;
        }
        return (
          <div
            className={yearItemClass}
            onClick={
              item !== numberYearMonth
                ? () => pickYear(year, direction)
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
    const classNames = direction == NEXT_TRANSITION ? 'forward' : 'backward';

    const pageClick = useCallback(() => {
      if (isMouseIsDownOnSelectorPanelClicker.current) {
        return;
      }
      setShowSelectorPanel(false);
      setShowMask(false);
    }, []);

    useEffect(() => {
      window.addEventListener('mousedown', pageClick, false);
      window.addEventListener('touchend', pageClick, false);
    }, []);

    useWillUnmount(() => {
      window.removeEventListener('mousedown', pageClick, false);
      window.removeEventListener('touchend', pageClick, false);
    });
    return (
      <div className={`picky-date-time-calendar`}>
        <div className={`picky-date-time-calendar__header`}>
          <div className={`${selectorPanelClass}`} ref={$monthSelectorPanel} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onTouchEnd={onMouseDown} onTouchCancel={onMouseUp}>
            <div className={`picky-date-time-dropdown-calendar__menu ${[size]}`}>
              <div className={`picky-date-time-dropdown-calendar__month`}>{selectorPanelMonthHtml}</div>
              <div style={{ height: '10px' }} />

              <div className={`picky-date-time__col picky-date-time__col-0-5`}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  style={{ verticalAlign: 'middle' }}
                  onClick={() => changeSelectorPanelYearSet(yearSelectorPanel - SELECTOR_YEAR_SET_NUMBER, PREV_TRANSITION)}
                >
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </div>
              <div className={`picky-date-time__col picky-date-time__col-9`}>
                <TransitionGroup className="picky-date-time-calendar__selector-panel-year-set-container" childFactory={child => React.cloneElement(child, { classNames })}>
                  <CSSTransition key={yearSelectorPanelList.join('-')} timeout={{ enter: 300, exit: 300 }} className={`picky-date-time-dropdown-calendar__year`} classNames={classNames}>
                    <div>{selectorPanelYearHtml}</div>
                  </CSSTransition>
                </TransitionGroup>
              </div>
              <div className={`picky-date-time__col picky-date-time__col-0-5`}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  style={{ verticalAlign: 'middle' }}
                  onClick={() => changeSelectorPanelYearSet(yearSelectorPanel + SELECTOR_YEAR_SET_NUMBER, NEXT_TRANSITION)}
                >
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </div>
            </div>
          </div>
          <div className={`picky-date-time__col picky-date-time__col-3`}>
            <div className={`picky-date-time__col picky-date-time-calendar__previous`} onClick={() => pickYear(pickedYearMonth.year, PREV_TRANSITION)}>
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
                <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
                <path fill="none" d="M24 24H0V0h24v24z" />
              </svg>
            </div>
            <div className={`picky-date-time__col picky-date-time-calendar__sub-previous`} onClick={() => pickMonth(pickedYearMonth.month, PREV_TRANSITION)}>
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </div>
          </div>
          <div className={`picky-date-time__col picky-date-time__col-6`}>
            <TransitionGroup className="picky-date-time-calendar__title-container" childFactory={child => React.cloneElement(child, { classNames })}>
              <CSSTransition key={pickedYearMonth.string} timeout={{ enter: 300, exit: 300 }} className={`picky-date-time-calendar__title`} style={{ left: '0' }} classNames={classNames}>
                <span className={`picky-date-time-calendar__clicker`} onClick={handleShowSelectorPanel} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
                  <span className={`picky-date-time-calendar__clicker`}>
                    <span>{`${LOCALE[locale].months[Number(pickedYearMonth.month) - 1]}`}</span>
                  </span>
                  <span>&nbsp;</span>
                  <span className={`picky-date-time-calendar__clicker`}>
                    <span>{`${pickedYearMonth.year}`}</span>
                  </span>
                </span>
              </CSSTransition>
            </TransitionGroup>
          </div>
          <div className={`picky-date-time__col picky-date-time__col-3`}>
            <div className={`picky-date-time__col picky-date-time-calendar__next`} onClick={() => pickMonth(pickedYearMonth.month, NEXT_TRANSITION)}>
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </div>
            <div className={`picky-date-time__col picky-date-time-calendar__sub-next`} onClick={() => pickYear(pickedYearMonth.year, NEXT_TRANSITION)}>
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
          <TransitionGroup className={`picky-date-time-calendar__body-container ${size}`} style={transitionContainerStyle} childFactory={child => React.cloneElement(child, { classNames })}>
            <CSSTransition key={pickedYearMonth.string} timeout={{ enter: 300, exit: 300 }} classNames={classNames}>
              {content}
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div className={`picky-date-time-calendar__button picky-date-time-calendar__today`} onClick={() => reset(true)}>
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
          <div className={`picky-date-time-calendar__button picky-date-time-calendar__default-day`} onClick={() => reset(false)}>
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
  },
);
interface pickedDateInfo {
  date: string;
  month: string;
  year: string;
}
interface pickedYearMonth {
  month: string;
  year: string;
}
interface CalendarBodyProps {
  size?: string;
  data?: IObjectKeysArray;
  currentYearMonthDate: pickedDateInfo;
  pickedDateInfo?: pickedDateInfo;
  pickedYearMonth?: pickedYearMonth;
  markedDatesHash: IObjectKeysBool;
  minSupportDate: string;
  maxSupportDate: string;
  onClick?: (res: string) => void;
}
const CalendarBody: React.FC<CalendarBodyProps> = memo(({ size = 'm', data = {}, currentYearMonthDate, pickedDateInfo, pickedYearMonth, onClick, markedDatesHash, minSupportDate, maxSupportDate }) => {
  const { year, month, date } = currentYearMonthDate;
  const pickedDate = `${Number(pickedDateInfo.month)}/${Number(pickedDateInfo.date)}/${Number(pickedDateInfo.year)}`;
  const pickedMonth = pickedYearMonth.month;
  const content = Object.keys(data).map(key => {
    let colHtml;
    if (data[key].length) {
      colHtml = data[key].map((item: { [k: string]: any }, key: any) => {
        const itemDate = `${Number(item.month)}/${Number(item.name)}/${item.year}`;
        const isPicked = pickedDate === itemDate;
        let isDisabled = pickedMonth != item.month;
        if (minSupportDate) {
          if (new Date(itemDate) < new Date(minSupportDate)) {
            isDisabled = true;
          }
        }
        if (maxSupportDate) {
          if (new Date(itemDate) > new Date(maxSupportDate)) {
            isDisabled = true;
          }
        }
        const datePickerItemClass = cx(
          'picky-date-time-calendar__table-cel',
          'picky-date-time-calendar__date-item',
          size,
          isDisabled && 'disabled',
          date == item.name && month == item.month && year == item.year && 'today',
          markedDatesHash[itemDate] && 'marked',
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
});
interface CalendarItemProps {
  item?: IObjectKeysAny;
  isPicked?: boolean;
  isDisabled?: boolean;
  datePickerItemClass?: string;
  onClick?: (res: string) => void;
}
const CalendarItem: React.FC<CalendarItemProps> = memo(({ item = {}, isPicked = false, isDisabled = false, datePickerItemClass = '', onClick = () => {} }) => {
  const handleOnClick = useCallback(() => {
    onClick(item.name);
  }, [item.name]);
  return (
    <div
      className={`${datePickerItemClass}`}
      onClick={
        !isDisabled
          ? handleOnClick
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
});
export default Calendar;
