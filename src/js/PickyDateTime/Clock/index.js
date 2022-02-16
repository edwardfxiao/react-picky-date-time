import React, { useState, useRef, memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { cx, usePrevious } from '../utils.js';
import { LOCALE } from '../locale.js';
import {
  R2D,
  SECOND_DEGREE_NUMBER,
  MINUTE_DEGREE_NUMBER,
  HOUR_DEGREE_NUMBER,
  QUARTER,
  TIME_SELECTION_FIRST_CHAR_POS_LIST,
  TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST,
  TIME_SELECTION_SECOND_CHAR_POS_LIST,
  TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST,
  TIME_JUMP_CHAR_POS_LIST,
  TIME_CURSOR_POSITION_OBJECT,
  TIME_TYPE,
} from '../constValue';
const isDragging = hash => {
  let draggingItem = '';
  Object.keys(hash).forEach(key => {
    if (hash[key] === true) {
      draggingItem = key;
    }
  });
  return draggingItem;
};
const updateClockHandObj = (o, value, degree, startAngle, angle, isMouseOver = false) => {
  o = { ...o, value, degree, startAngle, angle, isMouseOver };
  return o;
};

const TRANSLATE_FIRST_SIZE = {
  l: '-2px, -1px',
  m: '-2px, -1px',
  s: '-2px, -1px',
  xs: '0px, -1px',
};

const TRANSLATE_SECOND_SIZE = {
  l: '0px, 155px',
  m: '0px, 125px',
  s: '0px, 95px',
  xs: '0px, 85px',
};

const TRANSLATE_QUARTER_SECOND_SIZE = {
  l: '0px, -3px',
  m: '0px, -3px',
  s: '0px, -3px',
  xs: '0px, -3px',
};

const SECONDS_TRANSLATE_FIRST_SIZE = {
  l: '-1px, -34.5px',
  m: '-1px, -34.5px',
  s: '-1px, -34.5px',
  xs: '-1px, -34.5px',
};

const SECONDS_TRANSLATE_SECOND_SIZE = {
  l: '0px, -22.5px',
  m: '0px, -22.5px',
  s: '0px, -22.5px',
  xs: '0px, -22.5px',
};

const MINUTES_TRANSLATE_FIRST_SIZE = {
  l: '-1px, -32.5px',
  m: '-1px, -32.5px',
  s: '-1px, -32.5px',
  xs: '-1px, -32.5px',
};

const MINUTES_TRANSLATE_SECOND_SIZE = {
  l: '0px, -20.5px',
  m: '0px, -20.5px',
  s: '0px, -20.5px',
  xs: '0px, -20.5px',
};

const HOURS_TRANSLATE_FIRST_SIZE = {
  l: '-1.5px, -24.5px',
  m: '-1.5px, -24.5px',
  s: '-1.5px, -24.5px',
  xs: '-1.5px, -24.5px',
};

const HOURS_TRANSLATE_SECOND_SIZE = {
  l: '0px, -14.5px',
  m: '0px, -14.5px',
  s: '0px, -14.5px',
  xs: '0px, -14.5px',
};

const emptyFn = () => {};

const isValidTime = function (value) {
  // Checks if time is in HH:MM:SS AM/PM format.
  // The seconds and AM/PM are optional.
  if (value == '') {
    return false;
  }
  let timePat = /^(\d{1,2}):(\d{2})(:(\d{2}))?(\s?(AM|am|PM|pm))?$/;

  let matchArray = value.match(timePat);
  if (matchArray == null) {
    console.error('Time is not in a valid format.');
    return false;
  }
  let hour = matchArray[1];
  let minute = matchArray[2];
  let second = matchArray[4];
  let meridiem = matchArray[6];

  if (second == '') {
    second = null;
  }
  if (meridiem == '') {
    meridiem = null;
  }

  if (hour < 0 || hour > 23) {
    console.error('Hour must be between 1 and 12.');
    return false;
  }
  if (hour <= 12 && meridiem == null) {
    console.error('You must specify AM or PM.');
    return false;
  }
  if (hour > 12 && meridiem != null) {
    console.error("You can't specify AM or PM for military time.");
    return false;
  }
  if (minute < 0 || minute > 59) {
    console.error('Minute must be between 0 and 59.');
    return false;
  }
  if (second != null && (second < 0 || second > 59)) {
    console.error('Second must be between 0 and 59.');
    return false;
  }
  second = formatClockNumber(second);
  minute = formatClockNumber(minute);
  const hourText = formatClockNumber(hour);
  return {
    hour,
    minute,
    second,
    meridiem,
    hourText,
  };
};

const formatClockNumber = value => {
  value = Number(value);
  if (value < 10 && value >= 0) {
    return (value = '0' + value);
  }
  return value;
};

const getTodayObj = function () {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();

  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();

  let meridiem = Number(hour) < 12 ? 'AM' : 'PM';
  let hourText = hour > 12 ? hour - 12 : hour;

  second = formatClockNumber(second);
  minute = formatClockNumber(minute);
  hourText = formatClockNumber(hourText);

  return { year, month, date, hour, minute, second, meridiem, hourText };
};

const getInputCharSkipNum = function (pos) {
  let num = 1;
  if (TIME_JUMP_CHAR_POS_LIST.indexOf(pos) != -1) {
    num = 2;
  }
  return num;
};

const Clock = memo(({ size, locale, defaultTime, onResetTime, onResetDefaultTime, onClearTime }) => {
  const $clock = useRef(null);
  const $clockCenter = useRef(null);
  const $clockCircle = useRef(null);
  const $clockHandSecond = useRef(null);
  const $clockHandMinute = useRef(null);
  const $clockHandHour = useRef(null);
  const $timeInput = useRef(null);
  const intervalRef = useRef(null);
  const isDraggingHash = useRef({
    clockHandSecond: false,
    clockHandMinute: false,
    clockHandHour: false,
  });
  const originX = useRef(null);
  const originY = useRef(null);
  const todayObj = getTodayObj();

  let thour = todayObj.hour;
  let tminute = todayObj.minute;
  let tsecond = todayObj.second;
  let tmeridiem = todayObj.meridiem;
  let thourText = todayObj.hourText;

  // const myDefaultTimeObj = isValidTime(defaultTime);
  const defaultTimeObj = isValidTime(defaultTime);
  if (defaultTimeObj) {
    thour = defaultTimeObj.hour;
    thourText = defaultTimeObj.hourText;
    tminute = defaultTimeObj.minute;
    tsecond = defaultTimeObj.second;
    tmeridiem = defaultTimeObj.meridiem;
  }

  const secondDegree = tsecond * SECOND_DEGREE_NUMBER;
  const minuteDegree = tminute * MINUTE_DEGREE_NUMBER;
  const hourDegree = thour * HOUR_DEGREE_NUMBER;
  const clockHandObj = {
    value: '',
    degree: '',
    startAngle: '',
    angle: '',
    isMouseOver: false,
  };

  // const [defaultTimeObj, setdefaultTimeObj] = useState(myDefaultTimeObj);
  const [clockHandSecond, setClockHandSecond] = useState(updateClockHandObj(clockHandObj, tsecond, secondDegree, secondDegree, secondDegree));
  const [clockHandMinute, setClockHandMinute] = useState(updateClockHandObj(clockHandObj, tminute, minuteDegree, minuteDegree, minuteDegree));
  const [clockHandHour, setClockHandHour] = useState(updateClockHandObj(clockHandObj, thourText, hourDegree, hourDegree, hourDegree));
  const [meridiem, setMeridiem] = useState(tmeridiem);
  const [selectionRange, setSelectionRange] = useState({ start: 0, end: 0 });
  const prevStateSelectionRange = usePrevious(selectionRange);
  const [pressKey, setPressKey] = useState({ key: undefined });

  const initializeClock = useCallback(() => {
    intervalRef.current = setInterval(updateClock, 1000);
  }, []);

  const updateClock = useCallback(() => {
    if ($clock.current == null) {
      return;
    }
    if (isDragging(isDraggingHash.current)) {
      _clearInterval();
      return;
    }
    resetClockHandObj();
  }, []);

  const _clearInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = false;
  }, []);

  const resetClockHandObj = useCallback(
    (clear = false, defaultTime = false) => {
      let hour = '12',
        minute = '00',
        second = '00',
        hourText = '12',
        meridiem = 'AM';
      if (!clear) {
        let todayObj = getTodayObj();
        hour = todayObj.hour;
        minute = todayObj.minute;
        second = todayObj.second;
        hourText = todayObj.hourText;
        meridiem = todayObj.meridiem;
      }

      if (defaultTime) {
        hour = defaultTimeObj.hour;
        minute = defaultTimeObj.minute;
        second = defaultTimeObj.second;
        hourText = defaultTimeObj.hourText;
        meridiem = defaultTimeObj.meridiem;
      }

      let secondDegree = second * SECOND_DEGREE_NUMBER;
      let minuteDegree = minute * MINUTE_DEGREE_NUMBER;
      let hourDegree = hour * HOUR_DEGREE_NUMBER;
      const _clockHandSecond = updateClockHandObj(clockHandSecond, second, secondDegree, secondDegree, secondDegree);
      const _clockHandMinute = updateClockHandObj(clockHandMinute, minute, minuteDegree, minuteDegree, minuteDegree);
      const _clockHandHour = updateClockHandObj(clockHandHour, hourText, hourDegree, hourDegree, hourDegree);
      setClockHandSecond(_clockHandSecond);
      setClockHandMinute(_clockHandMinute);
      setClockHandHour(_clockHandHour);
      setMeridiem(meridiem);
      return { clockHandSecond: _clockHandSecond, clockHandMinute: _clockHandMinute, clockHandHour: _clockHandHour, meridiem, defaultTimeObj };
    },
    [clockHandSecond, clockHandMinute, clockHandHour],
  );

  const onFocus = useCallback(() => {
    _clearInterval();
  }, []);

  const onClick = useCallback(e => {
    setSelectionRange({ start: e.target.selectionStart, end: e.target.selectionEnd });
  }, []);

  const handleMouseWheel = useCallback(e => {
    e.preventDefault();
    setPressKey({ key: e.deltaY > 0 ? 'ArrowUp' : 'ArrowDown' });
  }, []);

  const onKeyDown = useCallback(
    key => {
      const el = $timeInput.current;
      const pos = { start: el.selectionStart, end: el.selectionEnd };

      if (typeof key == 'undefined') {
        setSelectionRange(pos);
        return;
      }

      const range = { start: 0, end: 0 };
      let elObj, refName;

      const o = {};
      if (TIME_CURSOR_POSITION_OBJECT[pos.start]) {
        o[TIME_CURSOR_POSITION_OBJECT[pos.start]] = true;
        range.start = pos.start == pos.end ? pos.start - 2 : pos.start;
        range.end = pos.start;
      }
      TIME_TYPE.map(i => {
        if (typeof o[i] != 'undefined' && o[i]) {
          refName = i;
          switch (refName) {
            case 'clockHandHour':
              elObj = clockHandHour;
              break;
            case 'clockHandMinute':
              elObj = clockHandMinute;
              break;
            case 'clockHandSecond':
              elObj = clockHandSecond;
              break;
            case 'meridiem':
              elObj = meridiem;
              break;
          }
        }
      });

      let newValue;
      if (key == 'ArrowUp' || key == 'ArrowDown') {
        range.start = pos.start;
        range.end = pos.start != pos.end ? pos.start + 2 : pos.start;
        let val = Number(elObj.value);
        let diff = 1;
        if (key == 'ArrowDown') {
          diff = -diff;
        }
        newValue = val + diff;
        if (refName == 'clockHandMinute' || refName == 'clockHandSecond') {
          if (newValue == 60) {
            newValue = 0;
          }
          if (newValue == -1) {
            newValue = 59;
          }
        } else if (refName == 'clockHandHour') {
          if (newValue == 13) {
            newValue = 1;
          }
          if (newValue == -1) {
            newValue = 11;
          }
        }
      } else if (!isNaN(Number(key)) || key == 'Backspace' || key == 'Delete') {
        let number = Number(key),
          start,
          end;
        let skipNum = getInputCharSkipNum(pos.start);

        if (key == 'Backspace') {
          skipNum = -skipNum;
          number = 0;
          start = pos.start + skipNum;
          end = pos.start + skipNum;
          if (!elObj.value) {
            setSelectionRange({ start: start, end: end });
            return;
          }
        }
        if (key == 'Delete') {
          number = 0;
        }
        if (elObj.value) {
          newValue = number;
          let strValue = elObj.value.toString();
          if (pos.start == pos.end) {
            if (skipNum > 0) {
              if (TIME_SELECTION_FIRST_CHAR_POS_LIST.indexOf(pos.start) != -1) {
                // 0*
                newValue = Number(number + strValue.substr(strValue.length - 1));
              } else if (TIME_SELECTION_SECOND_CHAR_POS_LIST.indexOf(pos.start) != -1) {
                // *0
                newValue = Number(strValue.substr(0, 1) + number);
              }
            } else {
              if (TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST.indexOf(pos.start) != -1) {
                // 0*
                newValue = Number(number + strValue.substr(strValue.length - 1));
              } else if (TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST.indexOf(pos.start) != -1) {
                // *0
                newValue = Number(strValue.substr(0, 1) + number);
              }
            }
            range.start = range.end = pos.start + skipNum;
          } else {
            if (TIME_SELECTION_FIRST_CHAR_POS_LIST.indexOf(pos.start) != -1) {
              if (pos.end < pos.start) {
                newValue = Number(strValue.substr(0, 1) + number);
                range.start = range.end = pos.start;
              } else {
                newValue = Number(number + strValue.substr(strValue.length - 1));
                range.start = range.end = pos.start + skipNum;
              }
            }
          }
          if (refName == 'clockHandHour' && (newValue == 0 || newValue > 12)) {
            newValue = 12;
          } else {
            if (newValue > 60) {
              newValue = key;
              range.start = range.end = pos.start + skipNum;
            }
          }
        }
      }

      newValue = formatClockNumber(newValue);
      if (!isNaN(newValue) && refName != 'meridiem') {
        let newDegree;
        if (refName == 'clockHandSecond') {
          newDegree = Number(newValue) * SECOND_DEGREE_NUMBER;
        }
        if (refName == 'clockHandMinute') {
          newDegree = Number(newValue) * MINUTE_DEGREE_NUMBER;
        }
        if (refName == 'clockHandHour') {
          if (Number(newValue) == 0) {
            newValue = 12;
          }
          newDegree = Number(newValue) * HOUR_DEGREE_NUMBER;
        }
        elObj = { ...elObj, value: newValue, degree: newDegree, startAngle: newDegree, angle: newDegree };
        setSelectionRange({ start: range.start, end: range.end });
        switchSetClockState(refName, elObj);
      }

      if (key == 'ArrowUp' || key == 'ArrowDown') {
        if (refName == 'meridiem') {
          setMeridiem(prevState => (prevState == 'AM' ? 'PM' : 'AM'));
          setSelectionRange({ start: range.start, end: range.end });
        }
      }
    },
    [clockHandHour, clockHandMinute, clockHandSecond, meridiem],
  );
  useEffect(() => {
    if (prevStateSelectionRange != selectionRange) {
      $timeInput.current.setSelectionRange(selectionRange.start, selectionRange.end);
    }
  }, [selectionRange]);
  useEffect(() => {
    if (pressKey.key) {
      onKeyDown(pressKey.key);
    }
  }, [pressKey]);
  const onMouseOver = useCallback(
    refName => {
      switchSetClockState(refName, { isMouseOver: true });
    },
    [clockHandSecond, clockHandMinute, clockHandHour],
  );

  const onMouseOut = useCallback(
    refName => {
      switchSetClockState(refName, { isMouseOver: false });
    },
    [clockHandSecond, clockHandMinute, clockHandHour],
  );
  const switchSetClockState = useCallback(
    (refName, v) => {
      switch (refName) {
        case 'clockHandSecond':
          setClockHandSecond(prevState => ({ ...prevState, ...v }));
          break;
        case 'clockHandMinute':
          setClockHandMinute(prevState => ({ ...prevState, ...v }));
          break;
        case 'clockHandHour':
          setClockHandHour(prevState => ({ ...prevState, ...v }));
          break;
      }
    },
    [clockHandSecond, clockHandMinute, clockHandHour],
  );
  const handleMouseDown = useCallback(
    (refName, e) => {
      let x = e.clientX - originX.current;
      let y = e.clientY - originY.current;
      let startAngle = R2D * Math.atan2(y, x);
      switchSetClockState(refName, { startAngle: startAngle });
      isDraggingHash.current[refName] = true;
    },
    [clockHandSecond, clockHandMinute, clockHandHour],
  );
  const handleMouseMove = useCallback(
    e => {
      const refName = isDragging(isDraggingHash.current);
      if (refName) {
        _clearInterval();
        let roundingAngle;
        let elObj;
        switch (refName) {
          case 'clockHandSecond':
            roundingAngle = SECOND_DEGREE_NUMBER;
            elObj = clockHandSecond;
            break;
          case 'clockHandMinute':
            roundingAngle = SECOND_DEGREE_NUMBER;
            elObj = clockHandMinute;
            break;
          case 'clockHandHour':
            roundingAngle = HOUR_DEGREE_NUMBER;
            elObj = clockHandHour;
            break;
        }
        let x = e.clientX - originX.current;
        let y = e.clientY - originY.current;
        let d = R2D * Math.atan2(y, x);
        let rotation = Number(d - elObj.startAngle);
        rotation = Math.floor(((rotation % 360) + roundingAngle / 2) / roundingAngle) * roundingAngle;
        let degree = elObj.angle + rotation;
        if (degree >= 360) {
          degree = degree - 360;
        }
        if (degree < 0) {
          degree = degree + 360;
        }
        let value = degree / roundingAngle;
        value = formatClockNumber(value);
        if (refName === 'clockHandHour') {
          if (value == '00') {
            value = 12;
          }
        }
        switchSetClockState(refName, { value, degree });
      }
    },
    [clockHandSecond, clockHandMinute, clockHandHour],
  );
  const handleMouseUp = useCallback(() => {
    Object.keys(isDraggingHash.current).forEach(key => {
      isDraggingHash.current[key] = false;
    });
    setClockHandSecond(prevState => ({ ...prevState, angle: clockHandSecond.degree }));
    setClockHandMinute(prevState => ({ ...prevState, angle: clockHandMinute.degree }));
    setClockHandHour(prevState => ({ ...prevState, angle: clockHandHour.degree }));
  }, [clockHandSecond, clockHandMinute, clockHandHour]);

  const initCoordinates = useCallback(() => {
    if ($clockCenter.current == null) {
      return;
    }
    const centerPointPos = $clockCenter.current.getBoundingClientRect();
    const top = centerPointPos.top,
      left = centerPointPos.left,
      height = centerPointPos.height,
      width = centerPointPos.width;
    originX.current = left + width / 2;
    originY.current = top + height / 2;
  }, []);
  useEffect(() => {
    if (!defaultTimeObj && !self.PRERENDER) {
      initializeClock();
    }
  }, []);
  useEffect(() => {
    setTimeout(() => initCoordinates(), 1000);
    if (document.addEventListener) {
      document.addEventListener('resize', initCoordinates, true);
      document.addEventListener('scroll', initCoordinates, true);
      document.addEventListener('mousemove', handleMouseMove, true);
      document.addEventListener('mouseup', handleMouseUp, true);
      $timeInput.current.addEventListener('mousewheel', handleMouseWheel, { passive: false });
    } else {
      document.attachEvent('onresize', initCoordinates);
      document.attachEvent('onscroll', initCoordinates);
      document.attachEvent('onmousemove', handleMouseMove);
      document.attachEvent('onmouseup', handleMouseUp);
      $timeInput.current.attachEvent('mousewheel', handleMouseWheel, { passive: false });
    }
    return () => {
      if (document.removeEventListener) {
        document.removeEventListener('resize', initCoordinates, true);
        document.removeEventListener('scroll', initCoordinates, true);
        document.removeEventListener('mousemove', handleMouseMove, true);
        document.removeEventListener('mouseup', handleMouseUp, true);
      } else {
        document.detachEvent('onresize', () => initCoordinates());
        document.detachEvent('onscroll', initCoordinates);
        document.detachEvent('onmousemove', handleMouseMove);
        document.detachEvent('onmouseup', handleMouseUp);
      }
    };
  }, [clockHandSecond, clockHandMinute, clockHandHour]);

  const changeTime = useCallback(e => {
    e.stopPropagation();
  }, []);

  const reset = useCallback(() => {
    const res = resetClockHandObj();
    initializeClock();
    onResetTime(res);
  }, []);

  const setToDefaultTime = useCallback(() => {
    const res = resetClockHandObj(false, true);
    _clearInterval();
    onResetDefaultTime(res);
  }, []);

  const clear = useCallback(() => {
    const res = resetClockHandObj(true);
    _clearInterval();
    onClearTime(res);
  }, []);

  const secondStyle = {
    transform: `translate(${SECONDS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandSecond.degree}deg) translate(${SECONDS_TRANSLATE_SECOND_SIZE[size]})`,
    WebkitTransform: `translate(${SECONDS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandSecond.degree}deg) translate(${SECONDS_TRANSLATE_SECOND_SIZE[size]})`,
    MozTransform: `translate(${SECONDS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandSecond.degree}deg) translate(${SECONDS_TRANSLATE_SECOND_SIZE[size]})`,
    msTransform: `translate(${SECONDS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandSecond.degree}deg) translate(${SECONDS_TRANSLATE_SECOND_SIZE[size]})`,
    OTransform: `translate(${SECONDS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandSecond.degree}deg) translate(${SECONDS_TRANSLATE_SECOND_SIZE[size]})`,
  };
  const minuteStyle = {
    transform: `translate(${MINUTES_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandMinute.degree}deg) translate(${MINUTES_TRANSLATE_SECOND_SIZE[size]})`,
    WebkitTransform: `translate(${MINUTES_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandMinute.degree}deg) translate(${MINUTES_TRANSLATE_SECOND_SIZE})`,
    MozTransform: `translate(${MINUTES_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandMinute.degree}deg) translate(${MINUTES_TRANSLATE_SECOND_SIZE[size]})`,
    msTransform: `translate(${MINUTES_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandMinute.degree}deg) translate(${MINUTES_TRANSLATE_SECOND_SIZE[size]})`,
    OTransform: `translate(${MINUTES_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandMinute.degree}deg) translate(${MINUTES_TRANSLATE_SECOND_SIZE[size]})`,
  };
  const hourStyle = {
    transform: `translate(${HOURS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandHour.degree}deg) translate(${HOURS_TRANSLATE_SECOND_SIZE[size]})`,
    WebkitTransform: `translate(${HOURS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandHour.degree}deg) translate(${HOURS_TRANSLATE_SECOND_SIZE[size]})`,
    MozTransform: `translate(${HOURS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandHour.degree}deg) translate(${HOURS_TRANSLATE_SECOND_SIZE[size]})`,
    msTransform: `translate(${HOURS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandHour.degree}deg) translate(${HOURS_TRANSLATE_SECOND_SIZE[size]})`,
    OTransform: `translate(${HOURS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandHour.degree}deg) translate(${HOURS_TRANSLATE_SECOND_SIZE[size]})`,
  };

  const minutesItem = [];

  for (let i = 0; i < 60; i++) {
    let isQuarter = false;
    let isFive = false;

    let translateFirst = TRANSLATE_FIRST_SIZE[size];
    let translateSecond = TRANSLATE_SECOND_SIZE[size];
    if (QUARTER.indexOf(i) != -1) {
      isQuarter = true;
      translateFirst = TRANSLATE_QUARTER_SECOND_SIZE[size];
    }
    if (i % 5 == 0) {
      isFive = true;
    }
    let minutesItemClass = cx('picky-date-time-clock__clock-minute', isQuarter && 'picky-date-time-clock__clock-minute--quarter', isFive && 'picky-date-time-clock__clock-minute--five');
    let degree = i * 6 + 180;
    let minutesItemStyle = {
      transform: `translate(${translateFirst}) rotate(${degree}deg) translate(${translateSecond})`,
      WebkitTransform: `translate(${translateFirst}) rotate(${degree}deg) translate(${translateSecond})`,
      MozTransform: `translate(${translateFirst}) rotate(${degree}deg) translate(${translateSecond})`,
      msTransform: `translate(${translateFirst}) rotate(${degree}deg) translate(${translateSecond})`,
      OTransform: `translate(${translateFirst}) rotate(${degree}deg) translate(${translateSecond})`,
    };
    minutesItem.push(<div key={i} className={minutesItemClass} style={minutesItemStyle} />);
  }
  return (
    <div className={`picky-date-time-clock ${size}`} ref={$clock}>
      <div className={`picky-date-time-clock__circle ${size}`} ref={$clockCircle}>
        <div
          className={`picky-date-time-clock__clock-hand picky-date-time-clock__clock-hand--second`}
          style={secondStyle}
          onMouseOver={e => onMouseOver('clockHandSecond', e)}
          onMouseOut={e => onMouseOut('clockHandSecond', e)}
          onMouseDown={e => handleMouseDown('clockHandSecond', e)}
          ref={$clockHandSecond}
        />
        <div
          className={`picky-date-time-clock__clock-hand picky-date-time-clock__clock-hand--minute`}
          style={minuteStyle}
          onMouseOver={e => onMouseOver('clockHandMinute', e)}
          onMouseOut={e => onMouseOut('clockHandMinute', e)}
          onMouseDown={e => handleMouseDown('clockHandMinute', e)}
          ref={$clockHandMinute}
        />
        <div
          className={`picky-date-time-clock__clock-hand picky-date-time-clock__clock-hand--hour`}
          style={hourStyle}
          onMouseOver={e => onMouseOver('clockHandHour', e)}
          onMouseOut={e => onMouseOut('clockHandHour', e)}
          onMouseDown={e => handleMouseDown('clockHandHour', e)}
          ref={$clockHandHour}
        />
        {minutesItem}
        <div className={`picky-date-time-clock__clock-center`} ref={$clockCenter} />
      </div>
      <div className={`picky-date-time-clock__inputer-wrapper`}>
        <div className={`picky-date-time-clock__inputer`}>
          <input
            className={`picky-date-time-clock__input`}
            value={`${clockHandHour.value}:${clockHandMinute.value}:${clockHandSecond.value} ${meridiem}`}
            onFocus={() => onFocus()}
            onKeyDown={e => {
              setPressKey({ key: e.key });
              if (!(e.key == 'ArrowLeft' || e.key == 'ArrowRight')) {
                e.preventDefault();
              }
            }}
            onChange={e => changeTime(e)}
            onClick={e => onClick(e)}
            // onWheel={e => handleMouseWheel(e)}
            ref={$timeInput}
          />
          <svg
            className={`picky-date-time-clock__inline-span picky-date-time-clock__icon--remove_circle_outline picky-date-time-remove_circle_outline`}
            xmlns="http://www.w3.org/2000/svg"
            height="15"
            viewBox="0 0 24 24"
            width="15"
            onClick={() => clear()}
            title={LOCALE[locale]['clear']}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="#868e96" d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
        </div>
        <div className={`picky-date-time-clock__inline-div picky-date-time-clock__inline-div--middle`}>
          <svg
            className={`picky-date-time-clock__icon picky-date-time-clock__icon--schedule picky-date-time-schedule`}
            xmlns="http://www.w3.org/2000/svg"
            height="15"
            viewBox="0 0 24 24"
            width="15"
            onClick={
              intervalRef.current === false || defaultTimeObj
                ? () => reset(false)
                : () => {
                    return;
                  }
            }
            title={LOCALE[locale]['now']}
            style={{ verticalAlign: 'middle' }}
          >
            <path fill="#868e96" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="#868e96" d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
          </svg>
        </div>
        {defaultTimeObj ? (
          <div className={`picky-date-time-clock__inline-div picky-date-time-clock__inline-div--middle`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24" width="15" style={{ verticalAlign: 'middle' }} onClick={() => setToDefaultTime()} title={LOCALE[locale]['reset']}>
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
    </div>
  );
});

Clock.propTypes = {
  size: PropTypes.string,
  locale: PropTypes.string,
  defaultTime: PropTypes.string,
  onSecondChange: PropTypes.func,
  onMinuteChange: PropTypes.func,
  onHourChange: PropTypes.func,
  onMeridiemChange: PropTypes.func,
  onResetTime: PropTypes.func,
  onClearTime: PropTypes.func,
  onResetDefaultTime: PropTypes.func,
};

Clock.defaultProps = {
  size: 'm',
  locale: 'en-US',
  defaultTime: '',
  onSecondChange: () => {},
  onMinuteChange: () => {},
  onHourChange: () => {},
  onMeridiemChange: () => {},
  onResetTime: () => {},
  onClearTime: () => {},
  onResetDefaultTime: () => {},
};

export default Clock;
