import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PickyDateTime from './App/components/PickyDateTime';
import nl2br from 'react-newline-to-break';

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
      meridiem: 'PM'
    };
  }

  onClose() {}

  onYearPicked(res) {
    // let { year } = res;
    // this.setState({ year: year});
  }

  onMonthPicked(res) {
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
      hour: res.clockHandHour.value
    });
  }

  onResetDefaultTime(res) {
    this.setState({
      second: res.clockHandSecond.value,
      minute: res.clockHandMinute.value,
      hour: res.clockHandHour.value
    });
  }

  onClearTime(res) {
    this.setState({
      second: res.clockHandSecond.value,
      minute: res.clockHandMinute.value,
      hour: res.clockHandHour.value
    });
  }

  render() {
    let {
      showPickyDateTime,
      date,
      month,
      year,
      hour,
      minute,
      second,
      meridiem
    } = this.state;
    const example1 =
      '\n\n \n size="xs" mode={0} \n with defaultTime and defaultDate provided.\n\non this example(Example 1),\n\nyou can click the "close" icon to hide this calendar,\n\nand focus the input to show it.';
    return (
      <div style={{ margin: '0 auto', width: '80%' }}>
        <div>
          <div>
            <div style={{ color: '#4a4a4a', margin: '10px' }} />
            <h2>Example 1 DEMO: Calendar and Clock</h2>
            <span onClick={() => this.setState({ showPickyDateTime: !showPickyDateTime })} style={{ 'textDecoration': 'underline',color: '#4a4a4a', cursor: 'pointer' }}>Click to toggle Picky Date Time</span>
            <div>
              <div style={{ marginTop: '10px' }}>
                <PickyDateTime
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
                />
              </div>
            </div>
            <h2>Example 1 CODE: Calendar and Clock</h2>
            <div
              style={{
                background: '#f8f8f8',
                color: '#4a4a4a',
                padding: '20px',
                whiteSpace: 'pre'
              }}
            >
              {nl2br(
                  '<div onClick={() => this.setState({ showPickyDateTime: !this.props.showPickyDateTime })}>Click to toggle Picky Date Time</div>\n' +
                  '<div style={{ marginTop: \'10px\' }}>\n' +
                  '  <PickyDateTime \n' +
                  '    size="xs" \n' +
                  '    mode={1} \n' +
                  '    show={showPickyDateTime} \n' +
                  '    locale="en-us" \n' +
                  '    onClose={() => this.setState({ showPickyDateTime: false })} \n' +
                  '    onYearPicked={res => this.onYearPicked(res)} \n' +
                  '    onMonthPicked={res => this.onMonthPicked(res)} \n' +
                  '    onDatePicked={res => this.onDatePicked(res)} \n' +
                  '    onResetDate={res => this.onResetDate(res)} \n' +
                  '    onResetDefaultDate={res => this.onResetDefaultDate(res)} \n' +
                  '    onSecondChange={res => this.onSecondChange(res)} \n' +
                  '    onMinuteChange={res => this.onMinuteChange(res)} \n' +
                  '    onHourChange={res => this.onHourChange(res)} \n' +
                  '    onMeridiemChange={res => this.onMeridiemChange(res)} \n' +
                  '    onResetTime={res => this.onResetTime(res)} \n' +
                  '    onResetDefaultTime={res => this.onResetDefaultTime(res)} \n' +
                  '    onClearTime={res => this.onClearTime(res)} \n' +
                  '  /> \n' +
                  '</div>\n'
              )}
            </div>
          </div>
          <div>
            <div style={{ color: '#4a4a4a', margin: '10px' }} />
            <h2>
              Example 2 DEMO: Calendar and Clock (with DefaultDate and DefaultTime provided)
            </h2>
            <div>
              <input
                style={{ padding: '10px', width: '140px' }}
                value={`${month}/${date}/${year} ${hour}:${minute}:${second} ${meridiem}`}
                onChange={() => {}}
                onClick={() => this.setState({ showPickyDateTime: true })}
              />
              <div style={{ marginTop: '10px' }}>
                <PickyDateTime
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
            <h2>
              Example 2 CODE: Calendar and Clock (with DefaultDate and DefaultTime provided)
            </h2>
            <div
              style={{
                background: '#f8f8f8',
                color: '#4a4a4a',
                padding: '20px',
                whiteSpace: 'pre'
              }}
            >
              {nl2br(
                '<input\n' +
                  '  value={`${month}/${date}/${year} ${hour}:${minute}:${second} ${meridiem}`}\n' +
                  '  onChange={() => {}}\n' +
                  '  onClick={() => this.setState({ showPickyDateTime: true })}\n' +
                  '/>\n\n' +
                  "<div style={{ marginTop: '10px' }}>\n" +
                  '  <PickyDateTime \n' +
                  '    size="xs" \n' +
                  '    mode={1} \n' +
                  '    show={showPickyDateTime} \n' +
                  '    locale="en-us" \n' +
                  '    defaultTime={`${hour}:${minute}:${second} ${meridiem}`} // OPTIONAL "HH:MM:SS AM" \n' +
                  '    defaultDate={`${month}/${date}/${year}`} // OPTIONAL "MM/DD/YYYY" \n' +
                  '    onClose={() => this.setState({ showPickyDateTime: false })} \n' +
                  '    onYearPicked={res => this.onYearPicked(res)} \n' +
                  '    onMonthPicked={res => this.onMonthPicked(res)} \n' +
                  '    onDatePicked={res => this.onDatePicked(res)} \n' +
                  '    onResetDate={res => this.onResetDate(res)} \n' +
                  '    onResetDefaultDate={res => this.onResetDefaultDate(res)} \n' +
                  '    onSecondChange={res => this.onSecondChange(res)} \n' +
                  '    onMinuteChange={res => this.onMinuteChange(res)} \n' +
                  '    onHourChange={res => this.onHourChange(res)} \n' +
                  '    onMeridiemChange={res => this.onMeridiemChange(res)} \n' +
                  '    onResetTime={res => this.onResetTime(res)} \n' +
                  '    onResetDefaultTime={res => this.onResetDefaultTime(res)} \n' +
                  '    onClearTime={res => this.onClearTime(res)} \n' +
                  '  /> \n' +
                  '</div>\n'
              )}
            </div>
          </div>
          <h2>Example 3 DEMO: Calendar only (with size of M)</h2>
          <div style={{ margin: '10px' }}>
            <div style={{ color: '#4a4a4a', margin: '10px' }}>
              {`//size="m" mode={1}`}
            </div>
            <div>
              <PickyDateTime
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
              whiteSpace: 'pre'
            }}
          >
            {nl2br(
              "<div style={{ marginTop: '10px' }}>\n" +
                '  <PickyDateTime \n' +
                '    size="m" \n' +
                '    mode={0} \n' +
                '    show={showPickyDateTime} \n' +
                '    locale="en-us" \n' +
                '    onClose={() => this.setState({ showPickyDateTime: false })} \n' +
                '    onYearPicked={res => this.onYearPicked(res)} \n' +
                '    onMonthPicked={res => this.onMonthPicked(res)} \n' +
                '    onDatePicked={res => this.onDatePicked(res)} \n' +
                '    onResetDate={res => this.onResetDate(res)} \n' +
                '    onResetDefaultDate={res => this.onResetDefaultDate(res)} \n' +
                '    onSecondChange={res => this.onSecondChange(res)} \n' +
                '    onMinuteChange={res => this.onMinuteChange(res)} \n' +
                '    onHourChange={res => this.onHourChange(res)} \n' +
                '    onMeridiemChange={res => this.onMeridiemChange(res)} \n' +
                '    onResetTime={res => this.onResetTime(res)} \n' +
                '    onResetDefaultTime={res => this.onResetDefaultTime(res)} \n' +
                '    onClearTime={res => this.onClearTime(res)} \n' +
                '  /> \n' +
                '</div>\n'
            )}
          </div>
          <h2>Example 4 DEMO: Clock only</h2>
          <div style={{ margin: '10px' }}>
            <div style={{ color: '#4a4a4a', margin: '10px' }}>
              {`//size="xs" mode={2}`}
            </div>
            <div>
              <PickyDateTime
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
              whiteSpace: 'pre'
            }}
          >
            {nl2br(
              "<div style={{ marginTop: '10px' }}>\n" +
                '  <PickyDateTime \n' +
                '    size="xs" \n' +
                '    mode={2} \n' +
                '    show={showPickyDateTime} \n' +
                '    locale="en-us" \n' +
                '    onClose={() => this.setState({ showPickyDateTime: false })} \n' +
                '    onYearPicked={res => this.onYearPicked(res)} \n' +
                '    onMonthPicked={res => this.onMonthPicked(res)} \n' +
                '    onDatePicked={res => this.onDatePicked(res)} \n' +
                '    onResetDate={res => this.onResetDate(res)} \n' +
                '    onResetDefaultDate={res => this.onResetDefaultDate(res)} \n' +
                '    onSecondChange={res => this.onSecondChange(res)} \n' +
                '    onMinuteChange={res => this.onMinuteChange(res)} \n' +
                '    onHourChange={res => this.onHourChange(res)} \n' +
                '    onMeridiemChange={res => this.onMeridiemChange(res)} \n' +
                '    onResetTime={res => this.onResetTime(res)} \n' +
                '    onResetDefaultTime={res => this.onResetDefaultTime(res)} \n' +
                '    onClearTime={res => this.onClearTime(res)} \n' +
                '  /> \n' +
                '</div>\n'
            )}
          </div>
          <div style={{ margin: '10px' }} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
