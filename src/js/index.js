import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PickyDateTime from './App/components/PickyDateTime';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPickyDateTime: false
    };
  }

  onClose() {}

  onYearPicked() {}

  onMonthPicked() {}

  onDatePicked() {}

  onResetDate() {}

  onSecondChange() {}

  onMinuteChange() {}

  onHourChange() {}

  onMeridiemChange() {}

  onResetTime() {}

  onClearTime() {}

  render() {
    return (
      <div>
        <div style={{ float: 'left', margin: '10px' }}>
          <div style={{ color: '#4a4a4a', margin: '10px' }}>
            {`//size="xs" mode={0}`}
          </div>
          <div>
            <PickyDateTime
              size="xs"
              mode={0}
              locale="en-us"
              show={true}
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
          </div>
        </div>
        <div style={{ float: 'left', margin: '10px' }}>
          <div style={{ color: '#4a4a4a', margin: '10px' }}>
            {`//size="xs" mode={1}`}
          </div>
          <div>
            <PickyDateTime
              size="xs"
              mode={1}
              locale="en-us"
              show={true}
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
          </div>
        </div>
        <div style={{ float: 'left', margin: '10px' }}>
          <div style={{ color: '#4a4a4a', margin: '10px' }}>
            {`//size="xs" mode={2}`}
          </div>
          <div>
            <PickyDateTime
              size="xs"
              mode={2}
              locale="en-us"
              show={true}
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
          </div>
        </div>
        <div style={{ float: 'left', margin: '10px' }}>
          <div style={{ color: '#4a4a4a', margin: '10px' }}>
            {`//size="m" mode={1}`}
          </div>
          <div>
            <PickyDateTime
              size="m"
              mode={1}
              locale="en-us"
              show={true}
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
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
