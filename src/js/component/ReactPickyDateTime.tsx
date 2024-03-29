import React, { useCallback, memo, Fragment } from 'react';
import { cx } from './utils';
import Calendar from './Calendar/index';
import Clock from './Clock/index';
import '../../css/index.css';
import { SIZE_RANGE, DEFAULT_SIZE } from './constValue';
import { LOCALE, DEFAULT_LACALE } from './locale';

export interface ReactPickyDateTimeProps {
  mode: number;
  size: string;
  locale: string;
  markedDates?: Array<string>;
  supportDateRange?: Array<string>;
  defaultDate?: string;
  defaultTime?: string;
  show?: boolean;
  onClose?: () => void;
  onYearPicked?: (res: object) => void;
  onMonthPicked?: (res: object) => void;
  onDatePicked?: (res: object) => void;
  onResetDate?: (res: object) => void;
  onSecondChange?: (res: object) => void;
  onMinuteChange?: (res: object) => void;
  onHourChange?: (res: object) => void;
  onMeridiemChange?: (res: string) => void;
  onResetTime?: (res: object) => void;
  onClearTime?: (res: object) => void;
  onResetDefaultDate?: (res: object) => void;
  onResetDefaultTime?: (res: object) => void;
}

const ReactPickyDateTime: React.FC<ReactPickyDateTimeProps> = memo(
  ({
    locale = DEFAULT_LACALE,
    size = DEFAULT_SIZE,
    markedDates = [],
    supportDateRange = [],
    show = false,
    mode = 0,
    // GENERAL
    onClose = () => {},
    // CALENDAR
    defaultDate = '',
    onYearPicked = () => {},
    onMonthPicked = () => {},
    onDatePicked = () => {},
    onResetDate = () => {},
    onResetDefaultDate = () => {},
    // CLOCK
    defaultTime = '',
    onSecondChange = () => {},
    onMinuteChange = () => {},
    onHourChange = () => {},
    onMeridiemChange = () => {},
    onResetTime = () => {},
    onClearTime = () => {},
    onResetDefaultTime = () => {},
  }) => {
    const handleOnClose = useCallback(() => {
      onClose && onClose();
    }, []);
    const componentClass = cx('picky-date-time', show && 'visible');

    size = size.toLowerCase();
    if (SIZE_RANGE.indexOf(size) == -1) {
      size = DEFAULT_SIZE;
    }

    locale = locale.toLowerCase();
    if (typeof LOCALE[locale] === 'undefined') {
      locale = DEFAULT_LACALE;
    }

    const contentHtml = (
      <Fragment>
        <div className={`picky-date-time__calendar`}>
          {(mode === 0 || mode === 1) && (
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
          )}
        </div>
        {mode === 1 && <span className={`picky-date-time__breaker ${[size]}`}>&nbsp;&nbsp;</span>}
        {(mode === 1 || mode === 2) && (
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
        )}
      </Fragment>
    );
    return (
      <div className={`${componentClass}`}>
        <svg className="picky-date-time__close" viewBox="0 0 20 20" width="15" height="15" onClick={handleOnClose}>
          <path
            fill="#868e96"
            d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"
          />
        </svg>
        {contentHtml}
      </div>
    );
  },
);

export default ReactPickyDateTime;
