# react-picky-date-time
A react date time picker component.

NO Jquery, NO Moment.js
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
      />
    );
  }
}
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
Tested on IE9+ and Chrome and Safari(10.0.3)

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
