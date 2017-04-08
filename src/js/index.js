import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PickyDateTime from 'COMPONENTS/PickyDateTime';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPickyDateTime: false,
    };
  }

  onClose() {

  }

  onYearPicked() {

  }

  onMonthPicked() {

  }

  onDatePicked() {

  }

  onResetDate() {

  }

  onSecondChange() {

  }

  onMinuteChange() {

  }

  onHourChange() {

  }

  onMeridiemChange() {

  }

  onResetTime() {

  }

  onClearTime() {

  }


  render() {
    return(
      <div>
        <PickyDateTime
          size="m"
          mode={1}
          locale={`zh-CNs`}
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
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
