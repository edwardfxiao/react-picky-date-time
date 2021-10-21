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
