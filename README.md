# react-picky-date-time
react date time component
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
please check the online <a href="https://edwardfhsiao.github.io/react-picky-date-time/">demo example https://edwardfhsiao.github.io/react-picky-date-time/</a>

