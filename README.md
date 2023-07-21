# react-picky-date-time
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![npm version](https://badge.fury.io/js/react-picky-date-time.svg)](https://badge.fury.io/js/react-picky-date-time) ![Cdnjs](https://img.shields.io/cdnjs/v/react-picky-date-time) ![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react-picky-date-time.svg) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/edwardfxiao/react-picky-date-time/master/LICENSE) [![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE) [![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

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

###  :tada: For version >= 2.0.0, please update react and react-dom to at least ```16.8.6```, since it is rewrited with hooks.
```js
  "peerDependencies": {
    "react": ">= 16.8.6",
    "react-dom": ">= 16.8.6"
  }
```

# Docs Link
[Custom Locale Guide(can be multiple locales)](#custom-locale)

# Usage

```js
import ReactPickyDateTime from 'react-picky-date-time';

...
const Index = memo(() => {
  const [showPickyDateTime, setShowPickyDateTime] = useState(true);
  const [date, setDate] = useState('30');
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState('2000');
  const [hour, setHour] = useState('03');
  const [minute, setMinute] = useState('10');
  const [second, setSecond] = useState('40');
  const [meridiem, setMeridiem] = useState('PM');
  ...
  // See events section
  ...
  return (
    <ReactPickyDateTime
      size="m" // 'xs', 's', 'm', 'l'
      mode={0} //0: calendar only, 1: calendar and clock, 2: clock only; default is 0
      locale="en-us" // 'en-us' or 'zh-cn'; default is en-us
      show={showPickyDateTime} //default is false
      onClose={() => setShowPickyDateTime(false)}
      defaultTime={`${hour}:${minute}:${second} ${meridiem}`} // OPTIONAL. format: "HH:MM:SS AM"
      defaultDate={`${month}/${date}/${year}`} // OPTIONAL. format: "MM/DD/YYYY"
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
      // markedDates={['10/19/2021']} // OPTIONAL. format: "MM/DD/YYYY"
      // supportDateRange={['12/03/2021', '12/05/2021']} // OPTIONAL. min date and max date. format: "MM/DD/YYYY"
    />
  );
});
```

##### <a name="class-components"></a>[Class components version example goes here ->](/CLASS-VERSION.md)

# Installation
```sh
npm install react-picky-date-time --save
```

#### By CDN (starting from v1.9.1)
```html
<head>
 ...
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/react-picky-date-time/2.0.5/react-picky-date-time.min.css"/>
</head>
<body>
 <div id="root"></div>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.13.1/umd/react.production.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/react-picky-date-time/2.0.5/react-picky-date-time.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.21.1/babel.min.js"></script>
 <script type="text/babel">
    const App = React.memo(() => {
      return (<ReactPickyDateTime .../>)
    });
    ReactDOM.render(<App />, document.getElementById('root'));
 </script>
</body>


```

# Donate
<a href="https://www.paypal.me/XIAOMENGXIAO/0.99" target="_blank" alt="PayPal Donate">Thanks for donating me a donut!&nbsp;&nbsp;⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</a>

# Browser support
Tested on IE9+ and Chrome and Safari(10.0.3)

This library relies ```new AbortController```, so if you are developing for IE10+ you should include the polyfill like below
```js
import 'promise-polyfill/src/polyfill';
import 'unfetch/polyfill';
import 'abortcontroller-polyfill';
```

For IE9, you also need ```performance``` ```requestAnimationFrame``` polyfill for clock ticking

# Events

Also consoled out on the demo page examples

```js
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

  // just toggle your outter component state to true or false to show or hide <PickyDateTime/>
  openPickyDateTime() {
    setShowPickyDateTime(true)
  }

  onClose() {
    setShowPickyDateTime(false)
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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/edwardfxiao"><img src="https://avatars.githubusercontent.com/u/11728228?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Edward Xiao</b></sub></a><br /><a href="https://github.com/edwardfxiao/react-picky-date-time/commits?author=edwardfxiao" title="Code">💻</a> <a href="https://github.com/edwardfxiao/react-picky-date-time/commits?author=edwardfxiao" title="Documentation">📖</a> <a href="#infra-edwardfxiao" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/edwardfxiao/react-picky-date-time/commits?author=edwardfxiao" title="Tests">⚠️</a> <a href="https://github.com/edwardfxiao/react-picky-date-time/pulls?q=is%3Apr+reviewed-by%3Aedwardfxiao" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
