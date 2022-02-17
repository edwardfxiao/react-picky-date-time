import { useEffect, useRef } from 'react';
export const cx = (...params: Array<any>) => {
  const classes = [];
  for (let i = 0; i < params.length; i += 1) {
    const arg = params[i];
    if (!arg) continue;
    const argType = typeof arg;
    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner: string = cx.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      for (const key in arg) {
        if ({}.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(' ');
};

export const isValidDate = (str: string) => {
  try {
    const d = new Date(str);
    if (!isNaN(d.getTime())) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const isValidDates = (arr: Array<string>) => {
  let isValid = false;
  if (arr.length) {
    isValid = true;
    arr.forEach(v => {
      if (!isValidDate(v)) {
        isValid = false;
      }
    });
  }
  return isValid;
};

export const useWillUnmount = (f: Function) => useEffect(() => () => f && f(), []);
export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const formatClockNumber = (value: number) => {
  if (value < 10 && value >= 0) {
    return '0' + String(value);
  }
  return String(value);
};

export const isValidTime = (value: string) => {
  // Checks if time is in HH:MM:SS AM/PM format.
  // The seconds and AM/PM are optional.
  if (value == '') {
    return {};
  }
  const timePat = /^(\d{1,2}):(\d{2})(:(\d{2}))?(\s?(AM|am|PM|pm))?$/;

  const matchArray = value.match(timePat);
  if (matchArray == null) {
    console.error('Time is not in a valid format.');
    return {};
  }
  let hour = matchArray[1];
  let minute = matchArray[2];
  let second = matchArray[4];
  let meridiem = matchArray[6];

  const numberHour = Number(hour);
  const numberMinute = Number(minute);
  const numberSecond = Number(second);
  if (second == '') {
    second = null;
  }
  if (meridiem == '') {
    meridiem = null;
  }

  if (numberHour < 0 || numberHour > 23) {
    console.error('Hour must be between 1 and 12.');
    return {};
  }
  if (numberHour <= 12 && meridiem == null) {
    console.error('You must specify AM or PM.');
    return {};
  }
  if (numberHour > 12 && meridiem != null) {
    console.error("You can't specify AM or PM for military time.");
    return {};
  }
  if (numberMinute < 0 || numberMinute > 59) {
    console.error('Minute must be between 0 and 59.');
    return {};
  }
  if (second != null && (numberSecond < 0 || numberSecond > 59)) {
    console.error('Second must be between 0 and 59.');
    return {};
  }
  second = formatClockNumber(Number(second));
  minute = formatClockNumber(Number(minute));
  const hourText = formatClockNumber(Number(hour));
  return {
    hour,
    minute,
    second,
    meridiem,
    hourText,
  };
};
export const animationInterval = (ms: number, signal: any, callback: Function) => {
  // Prefer currentTime, as it'll better sync animtions queued in the
  // same frame, but if it isn't supported, performance.now() is fine.
  const start = document.timeline ? document.timeline.currentTime : performance.now();

  function frame(time: number) {
    if (signal.aborted) return;
    callback(time);
    scheduleFrame(time);
  }

  function scheduleFrame(time: number) {
    const elapsed = time - start;
    const roundedElapsed = Math.round(elapsed / ms) * ms;
    const targetNext = start + roundedElapsed + ms;
    const delay = targetNext - performance.now();
    setTimeout(() => requestAnimationFrame(frame), delay);
  }

  scheduleFrame(start);
};
