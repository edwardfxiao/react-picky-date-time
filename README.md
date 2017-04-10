# react-picky-date-time
react date time picker component
```js
import PickyDateTime from 'react-picky-date-time';

...

<PickyDateTime
  size="m"// 'xs', 's', 'm', 'l'
  mode={0} //0: calendar only, 1: calendar and clock, 2: clock only; default is 0
  locale={`zh-cn`}// 'en-us' or 'zh-cn'; default is en-us
  show={true} //default is false
  onClose={this.onClose.bind(this)}
  onYearPicked={this.onYearPicked.bind(this)}
  onMonthPicked={this.onMonthPicked.bind(this)}
  onDatePicked={this.onDatePicked.bind(this)}
  onResetDate={this.onResetDate.bind(this)}
  onSecondChange={this.onSecondChange.bind(this)}
  onMinuteChange={this.onMinuteChange.bind(this)}
  onHourChange={this.onHourChange.bind(this)}
  onMeridiemChange={this.onMeridiemChange.bind(this)}
  onResetTime={this.onResetTime.bind(this)}
  onClearTime={this.onClearTime.bind(this)}
/>
```

# Installation
```sh
npm install react-picky-date-time --save
```

# Demo & Examples
Please check the online <a href="https://edwardfhsiao.github.io/react-picky-date-time/">demo example https://edwardfhsiao.github.io/react-picky-date-time/</a>

# Donate
<a href="https://www.paypal.me/XIAOMENGXIAO/0.99" target="_blank" alt="PayPal Donate">Thanks for donating me a donut!&nbsp;&nbsp;⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</a>

# Browser support
Tested on IE9+ and Chrome

# Event & Usage

Also consoled out on the demo page examples

```js
  onYearPicked(yearInfo) {
    console.log(yearInfo);
  }

  onMonthPicked(monthInfo) {
    console.log(monthInfo);
  }

  onDatePicked(dateInfo) {
    console.log(dateInfo);
  }

  onResetDate(dateInfo) {
    console.log(dateInfo);
  }

  onSecondChange(secondInfo){
    console.log(secondInfo);
  }

  onMinuteChange(minuteInfo){
    console.log(minuteInfo);
  }

  onHourChange(hourInfo){
    console.log(hourInfo);
  }

  onMeridiemChange(meridiemInfo){
    console.log(meridiemInfo);
  }

  onResetTime(Info){
    console.log(Info);
  }

  onClearTime(Info){
    console.log(Info);
  }

  // just toggle your outter component state to true or false to show or hide <PickyDateTime/>
  openPickyDateTime() {
    this.setState({showPickyDateTime: true});
  }

  onClose() {
    this.setState({showPickyDateTime: false});
  }

```
