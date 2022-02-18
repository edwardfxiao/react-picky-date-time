import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PickyDateTime from '../src/js/component/ReactPickyDateTime';
import Markdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const CodeBlock = ({ literal, language }) => {
  var html = Prism.highlight(literal, Prism.languages[language]);
  var cls = 'language-' + language;

  return (
    <pre className={cls}>
      <code dangerouslySetInnerHTML={{ __html: html }} className={cls} />
    </pre>
  );
};

CodeBlock.propTypes = {
  literal: PropTypes.string,
  language: PropTypes.string,
};

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
                  markedDates={[`${todayM}/${todayD - 1}/${todayY}`, `${todayM}/${todayD}/${todayY}`, `${todayM}/${todayD + 1}/${todayY}`]}
                  // supportDateRange={[`12/03/2021`, `12/05/2021`]} // "MM/DD/YYYY"
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
            >
              <Markdown
                source={`\`\`\`javascript
import PickyDateTime from 'react-inputs-validation';

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
  markedDates={[todayM + '/' + (todayD - 1) + '/' + todayY, todayM + '/' + todayD + '/' + todayY,, todayM + '/' + (todayD + 1) + '/' + todayY,]}
  // supportDateRange={['12/03/2021', '12/05/2021']} // OPTIONAL. min date and max date. format: "MM/DD/YYYY"
/>
\`\`\``}
                renderers={{ CodeBlock }}
              />
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
            <h2>Example 2 CODE: Calendar and Clock (with DefaultDate and DefaultTime provided)</h2>
            <div
              style={{
                background: '#f8f8f8',
                color: '#4a4a4a',
                padding: '20px',
                whiteSpace: 'pre',
              }}
            >
              <Markdown
                source={`\`\`\`javascript
import PickyDateTime from 'react-inputs-validation';

<PickyDateTime
  size="xs"
  mode={1}
  show={showPickyDateTime}
  locale="en-us"
  defaultTime={hour:minute:second meridiem} // "HH:MM:SS AM"
  defaultDate={month/date/year} // "MM/DD/YYYY"
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
\`\`\``}
                renderers={{ CodeBlock }}
              />
            </div>
          </div>
          <h2>Example 3 DEMO: Calendar only (with size of M)</h2>
          <div style={{ margin: '10px' }}>
            <div style={{ color: '#4a4a4a', margin: '10px' }}></div>
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
              whiteSpace: 'pre',
            }}
          >
            <Markdown
              source={`\`\`\`javascript
import PickyDateTime from 'react-inputs-validation';

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
\`\`\``}
              renderers={{ CodeBlock }}
            />
          </div>
          <h2>Example 4 DEMO: Clock only</h2>
          <div style={{ margin: '10px' }}>
            <div style={{ color: '#4a4a4a', margin: '10px' }}>{`//size="xs" mode={2}`}</div>
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
              whiteSpace: 'pre',
            }}
          >
            <Markdown
              source={`\`\`\`javascript
import PickyDateTime from 'react-inputs-validation';

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
\`\`\``}
              renderers={{ CodeBlock }}
            />
          </div>
          <div style={{ margin: '10px' }} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
