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
(function() {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame =
        window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

  if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
}());

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPickyDateTime from '../src/js/component/ReactPickyDateTime';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPickyDateTime: true,
      date: '30',
      month: '01',
      year: '2000',
      hour: '03',
      minute: '10',
      second: '40',
      meridiem: 'PM',
    };
  }

  onClose() {}

  onYearPicked() {
    // let { year } = res;
    // this.setState({ year: year});
  }

  onMonthPicked() {
    // let { month, year } = res;
    // this.setState({ year: year, month: month});
  }

  onDatePicked(res) {
    let { date, month, year } = res;
    this.setState({ year: year, month: month, date: date });
  }

  onResetDate(res) {
    let { date, month, year } = res;
    this.setState({ year: year, month: month, date: date });
  }

  onResetDefaultDate(res) {
    let { date, month, year } = res;
    this.setState({ year: year, month: month, date: date });
  }

  onSecondChange(res) {
    this.setState({ second: res.value });
  }

  onMinuteChange(res) {
    this.setState({ minute: res.value });
  }

  onHourChange(res) {
    this.setState({ hour: res.value });
  }

  onMeridiemChange(res) {
    this.setState({ meridiem: res });
  }

  onResetTime(res) {
    this.setState({
      second: res.clockHandSecond.value,
      minute: res.clockHandMinute.value,
      hour: res.clockHandHour.value,
    });
  }

  onResetDefaultTime(res) {
    this.setState({
      second: res.clockHandSecond.value,
      minute: res.clockHandMinute.value,
      hour: res.clockHandHour.value,
    });
  }

  onClearTime(res) {
    this.setState({
      second: res.clockHandSecond.value,
      minute: res.clockHandMinute.value,
      hour: res.clockHandHour.value,
    });
  }

  render() {
    let { showPickyDateTime, date, month, year, hour, minute, second, meridiem } = this.state;
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
              onClick={() => this.setState({ showPickyDateTime: !showPickyDateTime })}
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
                  onClose={() => this.setState({ showPickyDateTime: false })}
                  onYearPicked={res => this.onYearPicked(res)}
                  onMonthPicked={res => this.onMonthPicked(res)}
                  onDatePicked={res => this.onDatePicked(res)}
                  onResetDate={res => this.onResetDate(res)}
                  onSecondChange={res => this.onSecondChange(res)}
                  onMinuteChange={res => this.onMinuteChange(res)}
                  onHourChange={res => this.onHourChange(res)}
                  onMeridiemChange={res => this.onMeridiemChange(res)}
                  onResetTime={res => this.onResetTime(res)}
                  onClearTime={res => this.onClearTime(res)}
                  markedDates={[`${todayM}/${todayD - 1}/${todayY}`, `${todayM}/${todayD}/${todayY}`, `${todayM}/${todayD + 1}/${todayY}`]}
                  // supportDateRange={[`02/10/2022`, `12/05/2022`]} // "MM/DD/YYYY"
                />
              </div>
            </div>
            <h2>Example 1 CODE: Calendar and Clock</h2>
            <div
              style={{
                background: '#f8f8f8',
                color: '#4a4a4a',
                padding: '20px',
                whiteSpace: 'pre',
              }}
            ></div>
          </div>
          <div>
            <div style={{ color: '#4a4a4a', margin: '10px' }} />
            <h2>Example 2 DEMO: Calendar and Clock (with DefaultDate and DefaultTime provided)</h2>
            <div>
              <input
                style={{ padding: '10px', width: '140px' }}
                value={`${month}/${date}/${year} ${hour}:${minute}:${second} ${meridiem}`}
                onChange={() => {}}
                onClick={() => this.setState({ showPickyDateTime: true })}
              />
              <div style={{ marginTop: '10px' }}>
                <ReactPickyDateTime
                  size="xs"
                  mode={1}
                  show={showPickyDateTime}
                  locale="en-us"
                  defaultTime={`${hour}:${minute}:${second} ${meridiem}`} // "HH:MM:SS AM"
                  defaultDate={`${month}/${date}/${year}`} // "MM/DD/YYYY"
                  onClose={() => this.setState({ showPickyDateTime: false })}
                  onYearPicked={res => this.onYearPicked(res)}
                  onMonthPicked={res => this.onMonthPicked(res)}
                  onDatePicked={res => this.onDatePicked(res)}
                  onResetDate={res => this.onResetDate(res)}
                  onResetDefaultDate={res => this.onResetDefaultDate(res)}
                  onSecondChange={res => this.onSecondChange(res)}
                  onMinuteChange={res => this.onMinuteChange(res)}
                  onHourChange={res => this.onHourChange(res)}
                  onMeridiemChange={res => this.onMeridiemChange(res)}
                  onResetTime={res => this.onResetTime(res)}
                  onResetDefaultTime={res => this.onResetDefaultTime(res)}
                  onClearTime={res => this.onClearTime(res)}
                />
              </div>
            </div>
            <h2>Example 2 CODE: Calendar and Clock (with DefaultDate and DefaultTime provided)</h2>
            <div
              style={{
                background: '#f8f8f8',
                color: '#4a4a4a',
                padding: '20px',
                whiteSpace: 'pre',
              }}
            ></div>
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
                onClose={() => this.onClose()}
                onYearPicked={res => this.onYearPicked(res)}
                onMonthPicked={res => this.onMonthPicked(res)}
                onDatePicked={res => this.onDatePicked(res)}
                onResetDate={res => this.onResetDate(res)}
                onResetDefaultDate={res => this.onResetDefaultDate(res)}
                onSecondChange={res => this.onSecondChange(res)}
                onMinuteChange={res => this.onMinuteChange(res)}
                onHourChange={res => this.onHourChange(res)}
                onMeridiemChange={res => this.onMeridiemChange(res)}
                onResetTime={res => this.onResetTime(res)}
                onResetDefaultTime={res => this.onResetDefaultTime(res)}
                onClearTime={res => this.onClearTime(res)}
              />
            </div>
          </div>
          <h2>Example 3 CODE: Calendar only (with size of M)</h2>
          <div
            style={{
              background: '#f8f8f8',
              color: '#4a4a4a',
              padding: '20px',
              whiteSpace: 'pre',
            }}
          ></div>
          <h2>Example 4 DEMO: Clock only</h2>
          <div style={{ margin: '10px' }}>
            <div style={{ color: '#4a4a4a', margin: '10px' }}>{`//size="xs" mode={2}`}</div>
            <div>
              <ReactPickyDateTime
                size="xs"
                mode={2}
                locale="en-us"
                show={true}
                onClose={() => this.onClose()}
                onYearPicked={res => this.onYearPicked(res)}
                onMonthPicked={res => this.onMonthPicked(res)}
                onDatePicked={res => this.onDatePicked(res)}
                onResetDate={res => this.onResetDate(res)}
                onResetDefaultDate={res => this.onResetDefaultDate(res)}
                onSecondChange={res => this.onSecondChange(res)}
                onMinuteChange={res => this.onMinuteChange(res)}
                onHourChange={res => this.onHourChange(res)}
                onMeridiemChange={res => this.onMeridiemChange(res)}
                onResetTime={res => this.onResetTime(res)}
                onResetDefaultTime={res => this.onResetDefaultTime(res)}
                onClearTime={res => this.onClearTime(res)}
              />
            </div>
          </div>
          <h2>Example 4 CODE: Clock only</h2>
          <div
            style={{
              background: '#f8f8f8',
              color: '#4a4a4a',
              padding: '20px',
              whiteSpace: 'pre',
            }}
          ></div>
          <div style={{ margin: '10px' }} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
