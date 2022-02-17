import { useEffect, useRef } from 'react';
export const cx = (...params) => {
  const classes = [];
  for (let i = 0; i < params.length; i += 1) {
    const arg = params[i];
    if (!arg) continue;
    const argType = typeof arg;
    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = cx.apply(null, arg);
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

export const isValidDate = str => {
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
export const isValidDates = arr => {
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

export const useWillUnmount = f => useEffect(() => () => f && f(), []);
export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const formatClockNumber = value => {
  value = Number(value);
  if (value < 10 && value >= 0) {
    return (value = '0' + value);
  }
  return value;
};

export const isValidTime = value => {
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
export const animationInterval = (ms, signal, callback) => {
  // Prefer currentTime, as it'll better sync animtions queued in the
  // same frame, but if it isn't supported, performance.now() is fine.
  const start = document.timeline ? document.timeline.currentTime : performance.now();

  function frame(time) {
    if (signal.aborted) return;
    callback(time);
    scheduleFrame(time);
  }

  function scheduleFrame(time) {
    const elapsed = time - start;
    const roundedElapsed = Math.round(elapsed / ms) * ms;
    const targetNext = start + roundedElapsed + ms;
    const delay = targetNext - performance.now();
    setTimeout(() => requestAnimationFrame(frame), delay);
  }

  scheduleFrame(start);
};
