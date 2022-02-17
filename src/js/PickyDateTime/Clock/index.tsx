import React, { useState, useRef, memo, useCallback, useEffect } from 'react';
import { cx, usePrevious, animationInterval, isValidTime, formatClockNumber } from '../utils.js';
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
const isDragging = (hash: { [k: string]: boolean }) => {
  let draggingItem = '';
  Object.keys(hash).forEach(key => {
    if (hash[key] === true) {
      draggingItem = key;
    }
  });
  return draggingItem;
};
const updateClockHandObj = (o: clockHandObj, value: string, degree: string, startAngle: string, angle: string, isMouseOver: boolean = false) => {
  o = { ...o, value, degree, startAngle, angle, isMouseOver };
  return o;
};

const TRANSLATE_FIRST_SIZE: { [k: string]: string } = {
  l: '-2px, -1px',
  m: '-2px, -1px',
  s: '-2px, -1px',
  xs: '0px, -1px',
};

const TRANSLATE_SECOND_SIZE: { [k: string]: string } = {
  l: '0px, 155px',
  m: '0px, 125px',
  s: '0px, 95px',
  xs: '0px, 85px',
};

const TRANSLATE_QUARTER_SECOND_SIZE: { [k: string]: string } = {
  l: '0px, -3px',
  m: '0px, -3px',
  s: '0px, -3px',
  xs: '0px, -3px',
};

const SECONDS_TRANSLATE_FIRST_SIZE: { [k: string]: string } = {
  l: '-1px, -34.5px',
  m: '-1px, -34.5px',
  s: '-1px, -34.5px',
  xs: '-1px, -34.5px',
};

const SECONDS_TRANSLATE_SECOND_SIZE: { [k: string]: string } = {
  l: '0px, -22.5px',
  m: '0px, -22.5px',
  s: '0px, -22.5px',
  xs: '0px, -22.5px',
};

const MINUTES_TRANSLATE_FIRST_SIZE: { [k: string]: string } = {
  l: '-1px, -32.5px',
  m: '-1px, -32.5px',
  s: '-1px, -32.5px',
  xs: '-1px, -32.5px',
};

const MINUTES_TRANSLATE_SECOND_SIZE: { [k: string]: string } = {
  l: '0px, -20.5px',
  m: '0px, -20.5px',
  s: '0px, -20.5px',
  xs: '0px, -20.5px',
};

const HOURS_TRANSLATE_FIRST_SIZE: { [k: string]: string } = {
  l: '-1.5px, -24.5px',
  m: '-1.5px, -24.5px',
  s: '-1.5px, -24.5px',
  xs: '-1.5px, -24.5px',
};

const HOURS_TRANSLATE_SECOND_SIZE: { [k: string]: string } = {
  l: '0px, -14.5px',
  m: '0px, -14.5px',
  s: '0px, -14.5px',
  xs: '0px, -14.5px',
};

const getTodayObj = function () {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();

  const meridiem = Number(hour) < 12 ? 'AM' : 'PM';

  const finalSecond = formatClockNumber(Number(second));
  const finalMinute = formatClockNumber(Number(minute));
  const finalHourText = formatClockNumber(Number(hour > 12 ? hour - 12 : hour));

  return { year, month, date, hour, minute: finalMinute, second: finalSecond, meridiem, hourText: finalHourText };
};

const getInputCharSkipNum = (pos: number) => {
  let num = 1;
  if (TIME_JUMP_CHAR_POS_LIST.indexOf(pos) != -1) {
    num = 2;
  }
  return num;
};
interface clockHandObj {
  value: string;
  degree: string;
  startAngle: string;
  angle: string;
  isMouseOver: boolean;
}
interface ClockProps {
  size: string;
  locale: string;
  defaultTime: string;
  onSecondChange?: (res: object) => void;
  onMinuteChange?: (res: object) => void;
  onHourChange?: (res: object) => void;
  onMeridiemChange?: (res: string) => void;
  onResetTime?: (res: object) => void;
  onClearTime?: (res: object) => void;
  onResetDefaultTime?: (res: object) => void;
}
const Clock: React.FC<ClockProps> = memo(
  ({
    size = 'm',
    locale = 'en-US',
    defaultTime = '',
    onSecondChange = () => {},
    onMinuteChange = () => {},
    onHourChange = () => {},
    onMeridiemChange = () => {},
    onResetTime = () => {},
    onClearTime = () => {},
    onResetDefaultTime = () => {},
  }) => {
    const $clock = useRef(null);
    const $clockCenter = useRef(null);
    const $clockCircle = useRef(null);
    const $clockHandSecond = useRef(null);
    const $clockHandMinute = useRef(null);
    const $clockHandHour = useRef(null);
    const $timeInput = useRef(null);
    const startIntervalRef = useRef(null);
    const isDraggingHashRef = useRef<{ [k: string]: boolean }>({
      clockHandSecond: false,
      clockHandMinute: false,
      clockHandHour: false,
    });
    const originXRef = useRef(null);
    const originYRef = useRef(null);
    const todayObj = getTodayObj();

    let thour = String(todayObj.hour);
    let tminute = String(todayObj.minute);
    let tsecond = String(todayObj.second);
    let tmeridiem = String(todayObj.meridiem);
    let thourText = String(todayObj.hourText);

    const defaultTimeObj = isValidTime(defaultTime);
    if (Object.keys(defaultTimeObj).length) {
      thour = defaultTimeObj.hour;
      thourText = defaultTimeObj.hourText;
      tminute = defaultTimeObj.minute;
      tsecond = defaultTimeObj.second;
      tmeridiem = defaultTimeObj.meridiem;
    }

    const secondDegree = String(Number(tsecond) * SECOND_DEGREE_NUMBER);
    const minuteDegree = String(Number(tminute) * MINUTE_DEGREE_NUMBER);
    const hourDegree = String(Number(thour) * HOUR_DEGREE_NUMBER);
    const clockHandObj: clockHandObj = {
      value: '',
      degree: '',
      startAngle: '',
      angle: '',
      isMouseOver: false,
    };
    const [clockHandSecond, setClockHandSecond] = useState(updateClockHandObj(clockHandObj, tsecond, secondDegree, secondDegree, secondDegree));
    const [clockHandMinute, setClockHandMinute] = useState(updateClockHandObj(clockHandObj, tminute, minuteDegree, minuteDegree, minuteDegree));
    const [clockHandHour, setClockHandHour] = useState(updateClockHandObj(clockHandObj, thourText, hourDegree, hourDegree, hourDegree));
    const [meridiem, setMeridiem] = useState(tmeridiem);
    const prevStateClockHandSecond = usePrevious(clockHandSecond);
    const prevStateClockHandMinute = usePrevious(clockHandMinute);
    const prevStateClockHandHour = usePrevious(clockHandHour);
    const prevStateMeridiem = usePrevious(meridiem);
    const [selectionRange, setSelectionRange] = useState({ start: 0, end: 0 });
    const prevStateSelectionRange = usePrevious(selectionRange);
    const [pressKey, setPressKey] = useState({ key: undefined });
    const [counter, setCounter] = useState(0);
    // initial call from here
    const [abortController, setAbortController] = useState(new AbortController());
    const isAborted = useCallback(() => abortController.signal.aborted, [abortController]);
    // counter here
    const initializeClock = useCallback(abortController => {
      animationInterval(1000, abortController.signal, (time: number) => {
        setCounter(time);
      });
    }, []);
    // initiate the ticking here
    useEffect(() => {
      if (abortController && abortController.signal.aborted === false) {
        startIntervalRef.current = setInterval(() => {
          if (new Date().getMilliseconds() > 100 && new Date().getMilliseconds() < 200) {
            resetTime();
            initializeClock(abortController);
            clearInterval(startIntervalRef.current);
          }
        }, 4);
      }
    }, [abortController]);

    useEffect(() => {
      // actual ticking updated every second
      updateClock();
    }, [counter]);

    const updateClock = useCallback(() => {
      if ($clock.current == null) {
        return;
      }
      if (isDragging(isDraggingHashRef.current)) {
        abortController.abort();
        return;
      }
      resetClockHandObj();
    }, [abortController, defaultTimeObj]);

    const abortInterval = useCallback(() => {
      abortController.abort();
    }, [abortController]);

    const resetClockHandObj = useCallback(
      (clear = false, defaultTime = false) => {
        let hour = '12',
          minute = '00',
          second = '00',
          hourText = '12',
          meridiem = 'AM';
        if (!clear) {
          const todayObj = getTodayObj();
          hour = String(todayObj.hour);
          minute = String(todayObj.minute);
          second = String(todayObj.second);
          hourText = String(todayObj.hourText);
          meridiem = String(todayObj.meridiem);
        }

        if (defaultTime) {
          hour = String(defaultTimeObj.hour);
          minute = String(defaultTimeObj.minute);
          second = String(defaultTimeObj.second);
          hourText = String(defaultTimeObj.hourText);
          meridiem = String(defaultTimeObj.meridiem);
        }

        let secondDegree = String(Number(second) * SECOND_DEGREE_NUMBER);
        let minuteDegree = String(Number(minute) * MINUTE_DEGREE_NUMBER);
        let hourDegree = String(Number(hour) * HOUR_DEGREE_NUMBER);
        const _clockHandSecond = updateClockHandObj(clockHandSecond, second, secondDegree, secondDegree, secondDegree);
        const _clockHandMinute = updateClockHandObj(clockHandMinute, minute, minuteDegree, minuteDegree, minuteDegree);
        const _clockHandHour = updateClockHandObj(clockHandHour, hourText, hourDegree, hourDegree, hourDegree);
        setClockHandSecond(_clockHandSecond);
        setClockHandMinute(_clockHandMinute);
        setClockHandHour(_clockHandHour);
        setMeridiem(meridiem);
        return { clockHandSecond: _clockHandSecond, clockHandMinute: _clockHandMinute, clockHandHour: _clockHandHour, meridiem, defaultTimeObj };
      },
      [clockHandSecond, clockHandMinute, clockHandHour, defaultTimeObj],
    );

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

        const o: { [k: string]: boolean } = {};
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
        if (!elObj) {
          return;
        }
        let newValue;
        const obj: { [k: string]: string } = elObj;
        if (key == 'ArrowUp' || key == 'ArrowDown') {
          range.start = pos.start;
          range.end = pos.start != pos.end ? pos.start + 2 : pos.start;
          let val = Number(obj.value);
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
            if (!obj.value) {
              setSelectionRange({ start: start, end: end });
              return;
            }
          }
          if (key == 'Delete') {
            number = 0;
          }
          if (obj.value) {
            newValue = number;
            let strValue = obj.value.toString();
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
          setSelectionRange({ start: range.start, end: range.end });
          switchSetClockState(refName, { ...obj, value: formatClockNumber(newValue), degree: newDegree, startAngle: newDegree, angle: newDegree });
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
      if (isAborted()) {
        if (prevStateClockHandSecond != clockHandSecond) {
          onSecondChange && onSecondChange(clockHandSecond);
        }
      }
    }, [clockHandSecond]);
    useEffect(() => {
      if (isAborted()) {
        if (prevStateClockHandMinute != clockHandMinute) {
          onMinuteChange && onMinuteChange(clockHandMinute);
        }
      }
    }, [clockHandMinute]);
    useEffect(() => {
      if (isAborted()) {
        if (prevStateClockHandHour != clockHandHour) {
          onHourChange && onHourChange(clockHandHour);
        }
      }
    }, [clockHandHour]);
    useEffect(() => {
      if (isAborted()) {
        if (prevStateMeridiem != meridiem) {
          onMeridiemChange && onMeridiemChange(meridiem);
        }
      }
    }, [meridiem]);
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
        let x = e.clientX - originXRef.current;
        let y = e.clientY - originYRef.current;
        let startAngle = R2D * Math.atan2(y, x);
        switchSetClockState(refName, { startAngle: startAngle });
        isDraggingHashRef.current[refName] = true;
      },
      [clockHandSecond, clockHandMinute, clockHandHour],
    );
    const handleMouseMove = useCallback(
      e => {
        const refName = isDragging(isDraggingHashRef.current);
        if (refName) {
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
          let x = e.clientX - originXRef.current;
          let y = e.clientY - originYRef.current;
          let d = R2D * Math.atan2(y, x);
          let rotation = Number(d - Number(elObj.startAngle));
          rotation = Math.floor(((rotation % 360) + roundingAngle / 2) / roundingAngle) * roundingAngle;
          let degree = Number(elObj.angle) + rotation;
          if (degree >= 360) {
            degree = degree - 360;
          }
          if (degree < 0) {
            degree = degree + 360;
          }
          let value = degree / roundingAngle;
          if (refName === 'clockHandHour') {
            if (formatClockNumber(value) == '00') {
              value = 12;
            }
          }
          switchSetClockState(refName, { value, degree });
        }
      },
      [clockHandSecond, clockHandMinute, clockHandHour],
    );
    const handleMouseUp = useCallback(() => {
      Object.keys(isDraggingHashRef.current).forEach(key => {
        isDraggingHashRef.current[key] = false;
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
      originXRef.current = left + width / 2;
      originYRef.current = top + height / 2;
    }, []);

    const resetTime = useCallback(() => {
      const resetedTime = resetClockHandObj();
      onResetTime && onResetTime(resetedTime);
    }, []);

    const resetToDefaultTime = useCallback(() => {
      const resetedTime = resetClockHandObj(false, true);
      onResetDefaultTime && onResetDefaultTime(resetedTime);
    }, []);

    const clear = useCallback(() => {
      const res = resetClockHandObj(true);
      onClearTime && onClearTime(res);
    }, [abortController]);

    useEffect(() => {
      setTimeout(() => initCoordinates(), 1000);
      document.addEventListener('resize', initCoordinates, true);
      document.addEventListener('scroll', initCoordinates, true);
      document.addEventListener('mousemove', handleMouseMove, true);
      document.addEventListener('mouseup', handleMouseUp, true);
      $timeInput.current.addEventListener('mousewheel', handleMouseWheel, { passive: false });
      return () => {
        document.removeEventListener('resize', initCoordinates, true);
        document.removeEventListener('scroll', initCoordinates, true);
        document.removeEventListener('mousemove', handleMouseMove, true);
        document.removeEventListener('mouseup', handleMouseUp, true);
        $timeInput.current.removeEventListener('mousewheel', handleMouseWheel, { passive: false });
      };
    }, [clockHandSecond, clockHandMinute, clockHandHour]);

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
            onMouseOver={() => onMouseOver('clockHandSecond')}
            onMouseOut={() => onMouseOut('clockHandSecond')}
            onMouseDown={e => handleMouseDown('clockHandSecond', e)}
            ref={$clockHandSecond}
          />
          <div
            className={`picky-date-time-clock__clock-hand picky-date-time-clock__clock-hand--minute`}
            style={minuteStyle}
            onMouseOver={() => onMouseOver('clockHandMinute')}
            onMouseOut={() => onMouseOut('clockHandMinute')}
            onMouseDown={e => handleMouseDown('clockHandMinute', e)}
            ref={$clockHandMinute}
          />
          <div
            className={`picky-date-time-clock__clock-hand picky-date-time-clock__clock-hand--hour`}
            style={hourStyle}
            onMouseOver={() => onMouseOver('clockHandHour')}
            onMouseOut={() => onMouseOut('clockHandHour')}
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
              onFocus={() => abortInterval()}
              onKeyDown={e => {
                setPressKey({ key: e.key });
                if (!(e.key == 'ArrowLeft' || e.key == 'ArrowRight')) {
                  e.preventDefault();
                }
              }}
              onChange={() => {}}
              onClick={e => onClick(e)}
              ref={$timeInput}
            />
            <svg
              className={`picky-date-time-clock__inline-span picky-date-time-clock__icon--remove_circle_outline picky-date-time-remove_circle_outline`}
              xmlns="http://www.w3.org/2000/svg"
              height="15"
              viewBox="0 0 24 24"
              width="15"
              onClick={() => {
                abortInterval();
                clear();
              }}
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
              onClick={() => {
                resetTime();
                if (abortController.signal.aborted) {
                  setAbortController(new AbortController());
                }
              }}
              style={{ verticalAlign: 'middle' }}
            >
              <path fill="#868e96" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              <path d="M0 0h24v24H0z" fill="none" />
              <path fill="#868e96" d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
          </div>
          {defaultTimeObj ? (
            <div className={`picky-date-time-clock__inline-div picky-date-time-clock__inline-div--middle`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="15"
                viewBox="0 0 24 24"
                width="15"
                style={{ verticalAlign: 'middle' }}
                onClick={() => {
                  abortInterval();
                  resetToDefaultTime();
                }}
              >
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
  },
);

export default Clock;
