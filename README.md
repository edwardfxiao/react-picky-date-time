# react-picky-date-time
[![npm version](https://badge.fury.io/js/react-picky-date-time.svg)](https://badge.fury.io/js/react-picky-date-time) ![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react-picky-date-time.svg) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/edwardfxiao/react-picky-date-time/master/LICENSE)[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

A react component for date time picker.

<img src="https://raw.githubusercontent.com/edwardfxiao/react-picky-date-time/master/react-picky-date-time.gif" />

NO Jquery, NO Moment.js

###  :tada: For range surpport, please take a look at <a href="https://github.com/edwardfxiao/react-minimal-datetime-range">react-minimal-datetime-range</a>

# Demo & Examples
Please check the <a href="https://edwardfxiao.github.io/react-picky-date-time/">online demo example</a>

Attention: <a href="https://github.com/edwardfxiao/react-picky-date-time/blob/gh-pages/example/index.js">you can find demo source here :)</a>

# Codesandbox Examples
* <a href="https://codesandbox.io/s/y29w6p6krj">Online demo example playground</a>
* <a href="https://codesandbox.io/s/l3n2ypvrzl">Custom locales</a>(when providing ```window.REACT_PICKY_DATE_TIME['customLocale']```)

# Docs Link
[Custom Locale Guid(can be multiple locales)](#custom-locale)

# Usage
```js
import PickyDateTime from 'react-picky-date-time';

...
class YourOwnComponent extends Component {
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
  ...
  render() {
    const {
      showPickyDateTime,
      date,
      month,
      year,
      hour,
      minute,
      second,
      meridiem
    } = this.state;

    return(
      <PickyDateTime
        size="m"// 'xs', 's', 'm', 'l'
        mode={0} //0: calendar only, 1: calendar and clock, 2: clock only; default is 0
        locale={`zh-cn`}// 'en-us' or 'zh-cn'; default is en-us
        show={showPickyDateTime} //default is false
        onClose={() => this.setState({ showPickyDateTime: false })}
        defaultTime={`${hour}:${minute}:${second} ${meridiem}`} // OPTIONAL. format: "HH:MM:SS AM"
        defaultDate={`${month}/${date}/${year}`} // OPTIONAL. format: "MM/DD/YYYY"
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
        // markedDates={['10/19/2021']} // OPTIONAL. format: "MM/DD/YYYY"
        // supportDateRange={['12/03/2021', '12/05/2021']} // OPTIONAL. min date and max date. format: "MM/DD/YYYY"
      />
    );
  }
}
```

# Installation
```sh
npm install react-picky-date-time --save
```

# Donate
<a href="https://www.paypal.me/XIAOMENGXIAO/0.99" target="_blank" alt="PayPal Donate">Thanks for donating me a donut!&nbsp;&nbsp;⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</a>

# Browser support
~~Tested on IE9+ and Chrome and Safari(10.0.3)~~(Not supporting IE since v2.0.0)

# Events

Also consoled out on the demo page examples

```js
  onYearPicked(res) {
    const { year } = res;
    this.setState({ year: year});
  }

  onMonthPicked(res) {
    const { month, year } = res;
    this.setState({ year: year, month: month});
  }

  onDatePicked(res) {
    const { date, month, year } = res;
    this.setState({ year: year, month: month, date: date });
  }

  onResetDate(res) {
    const { date, month, year } = res;
    this.setState({ year: year, month: month, date: date });
  }

  onResetDefaultDate(res) {
    const { date, month, year } = res;
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

  // just toggle your outter component state to true or false to show or hide <PickyDateTime/>
  openPickyDateTime() {
    this.setState({showPickyDateTime: true});
  }

  onClose() {
    this.setState({showPickyDateTime: false});
  }

```

### <a name="custom-locale"></a>Custom Locale (can be multiple locales)
By providing ```window.REACT_PICKY_DATE_TIME['customLocale']```, you can overwrite the current locale if you like or add a new locale.


<a href="https://codesandbox.io/s/l3n2ypvrzl">codesandbox example</a>(located in index.html)

```html
        <script type="text/javascript">
        window.REACT_PICKY_DATE_TIME = {
            customLocale: {
                "my-own-locale": {...},//structure must follow below
                'es': {
                    today: 'Hoy',
                    reset: 'Reiniciar',
                    'reset-date': 'Reiniciar Fecha',
                    clear: 'Borrar',
                    now: 'Ahora',
                    weeks: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                }
            }
        }
        </script>
```
