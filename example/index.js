import 'promise-polyfill/src/polyfill';
import 'unfetch/polyfill';
import 'abortcontroller-polyfill';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// performance polyfill from https://gist.github.com/paulirish/5438650
(function () {
  if ('performance' in window == false) {
    window.performance = {};
  }

  Date.now =
    Date.now ||
    function () {
      // thanks IE8
      return new Date().getTime();
    };

  if ('now' in window.performance == false) {
    var nowOffset = Date.now();

    if (performance.timing && performance.timing.navigationStart) {
      nowOffset = performance.timing.navigationStart;
    }

    window.performance.now = function now() {
      return Date.now() - nowOffset;
    };
  }
})();

// requestAnimationFrame polyfill from https://stackoverflow.com/questions/24676874/error-requestanimationframe-in-ie9-any-alternate-solution
(function () {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
})();

import React, { useState, memo } from 'react';
import ReactDOM from 'react-dom';
import ReactPickyDateTime from '../src/js/component/ReactPickyDateTime';

const Index = memo(() => {
  const [showPickyDateTime, setShowPickyDateTime] = useState(true);
  const [date, setDate] = useState('30');
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState('2000');
  const [hour, setHour] = useState('03');
  const [minute, setMinute] = useState('10');
  const [second, setSecond] = useState('40');
  const [meridiem, setMeridiem] = useState('PM');

  const onClose = () => {};

  const onYearPicked = res => {
    const { year } = res;
    setYear(year);
  };

  const onMonthPicked = res => {
    const { month, year } = res;
    setMonth(month);
    setYear(year);
  };

  const onDatePicked = res => {
    const { date, month, year } = res;
    setDate(date);
    setMonth(month);
    setYear(year);
  };

  const onResetDate = res => {
    const { date, month, year } = res;
    setDate(date);
    setMonth(month);
    setYear(year);
  };

  const onResetDefaultDate = res => {
    const { date, month, year } = res;
    setDate(date);
    setMonth(month);
    setYear(year);
  };

  const onSecondChange = res => {
    const { value } = res;
    setSecond(value);
  };

  const onMinuteChange = res => {
    const { value } = res;
    setMinute(value);
  };

  const onHourChange = res => {
    const { value } = res;
    setHour(value);
  };

  const onMeridiemChange = res => {
    setMeridiem(res);
  };

  const onResetTime = res => {
    const { clockHandSecond, clockHandMinute, clockHandHour } = res;
    setSecond(clockHandSecond.value);
    setMinute(clockHandMinute.value);
    setHour(clockHandHour.value);
  };

  const onResetDefaultTime = res => {
    const { clockHandSecond, clockHandMinute, clockHandHour } = res;
    setSecond(clockHandSecond.value);
    setMinute(clockHandMinute.value);
    setHour(clockHandHour.value);
  };

  const onClearTime = res => {
    const { clockHandSecond, clockHandMinute, clockHandHour } = res;
    setSecond(clockHandSecond.value);
    setMinute(clockHandMinute.value);
    setHour(clockHandHour.value);
  };

  const today = new Date();
  const todayY = today.getFullYear();
  const todayM = today.getMonth() + 1;
  const todayD = today.getDate();

  return (
    <div style={{ margin: '0 auto', width: '80%' }}>
      <div>
        <div>
          <div style={{ color: '#4a4a4a', margin: '10px' }} />
          <h2>Example 1 DEMO: Calendar and Clock</h2>
          <span
            onClick={() => setShowPickyDateTime(!showPickyDateTime)}
            style={{
              textDecoration: 'underline',
              color: '#4a4a4a',
              cursor: 'pointer',
            }}
          >
            Click to toggle Picky Date Time
          </span>
          <div>
            <div style={{ marginTop: '10px' }}>
              <ReactPickyDateTime
                size="xs"
                mode={1}
                show={showPickyDateTime}
                locale="en-us"
                onClose={() => setShowPickyDateTime(false)}
                onYearPicked={res => onYearPicked(res)}
                onMonthPicked={res => onMonthPicked(res)}
                onDatePicked={res => onDatePicked(res)}
                onResetDate={res => onResetDate(res)}
                onSecondChange={res => onSecondChange(res)}
                onMinuteChange={res => onMinuteChange(res)}
                onHourChange={res => onHourChange(res)}
                onMeridiemChange={res => onMeridiemChange(res)}
                onResetTime={res => onResetTime(res)}
                onClearTime={res => onClearTime(res)}
                markedDates={[`${todayM}/${todayD - 1}/${todayY}`, `${todayM}/${todayD}/${todayY}`, `${todayM}/${todayD + 1}/${todayY}`]}
                // supportDateRange={[`02/10/2022`, `12/05/2022`]} // "MM/DD/YYYY"
              />
            </div>
          </div>
        </div>
        <div>
          <div style={{ color: '#4a4a4a', margin: '10px' }} />
          <h2>Example 2 DEMO: Calendar and Clock (with DefaultDate and DefaultTime provided)</h2>
          <div>
            <input
              style={{ padding: '10px', width: '140px' }}
              value={`${month}/${date}/${year} ${hour}:${minute}:${second} ${meridiem}`}
              onChange={() => {}}
              onClick={() => setShowPickyDateTime(true)}
            />
            <div style={{ marginTop: '10px' }}>
              <ReactPickyDateTime
                size="xs"
                mode={1}
                show={showPickyDateTime}
                locale="en-us"
                defaultTime={`${hour}:${minute}:${second} ${meridiem}`} // "HH:MM:SS AM"
                defaultDate={`${month}/${date}/${year}`} // "MM/DD/YYYY"
                onClose={() => setShowPickyDateTime(false)}
                onYearPicked={res => onYearPicked(res)}
                onMonthPicked={res => onMonthPicked(res)}
                onDatePicked={res => onDatePicked(res)}
                onResetDate={res => onResetDate(res)}
                onResetDefaultDate={res => onResetDefaultDate(res)}
                onSecondChange={res => onSecondChange(res)}
                onMinuteChange={res => onMinuteChange(res)}
                onHourChange={res => onHourChange(res)}
                onMeridiemChange={res => onMeridiemChange(res)}
                onResetTime={res => onResetTime(res)}
                onResetDefaultTime={res => onResetDefaultTime(res)}
                onClearTime={res => onClearTime(res)}
              />
            </div>
          </div>
        </div>
        <h2>Example 3 DEMO: Calendar only (with size of M)</h2>
        <div style={{ margin: '10px' }}>
          <div style={{ color: '#4a4a4a', margin: '10px' }}></div>
          <div>
            <ReactPickyDateTime
              size="m"
              mode={0}
              locale="en-us"
              show={true}
              onClose={() => onClose()}
              onYearPicked={res => onYearPicked(res)}
              onMonthPicked={res => onMonthPicked(res)}
              onDatePicked={res => onDatePicked(res)}
              onResetDate={res => onResetDate(res)}
              onResetDefaultDate={res => onResetDefaultDate(res)}
              onSecondChange={res => onSecondChange(res)}
              onMinuteChange={res => onMinuteChange(res)}
              onHourChange={res => onHourChange(res)}
              onMeridiemChange={res => onMeridiemChange(res)}
              onResetTime={res => onResetTime(res)}
              onResetDefaultTime={res => onResetDefaultTime(res)}
              onClearTime={res => onClearTime(res)}
            />
          </div>
        </div>
        <h2>Example 4 DEMO: Clock only</h2>
        <div style={{ margin: '10px' }}>
          <div style={{ color: '#4a4a4a', margin: '10px' }}>{`//size="xs" mode={2}`}</div>
          <div>
            <ReactPickyDateTime
              size="xs"
              mode={2}
              locale="en-us"
              show={true}
              onClose={() => onClose()}
              onYearPicked={res => onYearPicked(res)}
              onMonthPicked={res => onMonthPicked(res)}
              onDatePicked={res => onDatePicked(res)}
              onResetDate={res => onResetDate(res)}
              onResetDefaultDate={res => onResetDefaultDate(res)}
              onSecondChange={res => onSecondChange(res)}
              onMinuteChange={res => onMinuteChange(res)}
              onHourChange={res => onHourChange(res)}
              onMeridiemChange={res => onMeridiemChange(res)}
              onResetTime={res => onResetTime(res)}
              onResetDefaultTime={res => onResetDefaultTime(res)}
              onClearTime={res => onClearTime(res)}
            />
          </div>
        </div>
        <div style={{ margin: '10px' }} />
      </div>
    </div>
  );
});

ReactDOM.render(<Index />, document.getElementById('root'));
