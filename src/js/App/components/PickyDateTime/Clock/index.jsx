import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import update from 'react-addons-update';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';

import {
  LANG,
  POINTER_ROTATE,
  getDaysArray,
  getDaysListByMonth,
  getYearSet,
  R2D,
  SECOND_DEGREE_NUMBER,
  MINUTE_DEGREE_NUMBER,
  HOUR_DEGREE_NUMBER,
  QUARTER,
  TIME_SELECTION_FIRST_CHAR_POS_LIST,
  TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST,
  TIME_SELECTION_SECOND_CHAR_POS_LIST,
  TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST,
  TIME_JUMP_CHAR_POS_LIST,
  TIME_CURSOR_POSITION_OBJECT,
  TIME_TYPE,
  KEY_CODE,
} from '../constValue';

const TRANSLATE_FIRST_SIZE = {
  'l': '-2px, -1px',
  'm': '-2px, -1px',
  's': '-2px, -1px',
  'xs': '0px, -1px',
}

const TRANSLATE_SECOND_SIZE = {
  'l': '0px, 155px',
  'm': '0px, 125px',
  's': '0px, 95px',
  'xs': '0px, 85px',
}

const TRANSLATE_QUARTER_SECOND_SIZE = {
  'l': '0px, -3px',
  'm': '0px, -3px',
  's': '0px, -3px',
  'xs': '0px, -3px',
}

const SECONDS_TRANSLATE_FIRST_SIZE = {
  'l': '-1px, -34.5px',
  'm': '-1px, -34.5px',
  's': '-1px, -34.5px',
  'xs': '-1px, -34.5px',
}

const SECONDS_TRANSLATE_SECOND_SIZE = {
  'l': '0px, -22.5px',
  'm': '0px, -22.5px',
  's': '0px, -22.5px',
  'xs': '0px, -22.5px',
}

const MINUTES_TRANSLATE_FIRST_SIZE = {
  'l': '-1px, -32.5px',
  'm': '-1px, -32.5px',
  's': '-1px, -32.5px',
  'xs': '-1px, -32.5px',
}

const MINUTES_TRANSLATE_SECOND_SIZE = {
  'l': '0px, -20.5px',
  'm': '0px, -20.5px',
  's': '0px, -20.5px',
  'xs': '0px, -20.5px',
}

const HOURS_TRANSLATE_FIRST_SIZE = {
  'l': '-1.5px, -24.5px',
  'm': '-1.5px, -24.5px',
  's': '-1.5px, -24.5px',
  'xs': '-1.5px, -24.5px',
}

const HOURS_TRANSLATE_SECOND_SIZE = {
  'l': '0px, -14.5px',
  'm': '0px, -14.5px',
  's': '0px, -14.5px',
  'xs': '0px, -14.5px',
}

const emptyFn = () => {}

const formatClockNumber = (value) => {
  value = parseInt(value);
  if (value < 10 && value >= 0){ return value = '0' + value; }
  return value;
}

const getTodayObj = function () {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();

  let hour = today.getHours()
  let minute = today.getMinutes();
  let second = today.getSeconds();

  let meridiem = parseInt(hour) < 12 ? 'AM' : 'PM';
  let hourText = hour > 12 ? hour - 12 : hour;

  second = formatClockNumber(second);
  minute = formatClockNumber(minute);
  hourText = formatClockNumber(hourText);

  return { year, month, date, hour, minute, second, meridiem, hourText, }
}

const getInputCharSkipNum = function (pos) {
  let num = 1;
  if (TIME_JUMP_CHAR_POS_LIST.indexOf(pos) != -1){ num = 2; }
  return num;
}

class Clock extends React.Component {
  constructor(props) {
    super(props)
    let todayObj = getTodayObj();
    let { hour, minute, second, meridiem, hourText, } = todayObj;

    this.startX = 0; this.startY = 0; this.originX = null; this.originY = null;

    let secondDegree = second * SECOND_DEGREE_NUMBER;
    let minuteDegree = minute * MINUTE_DEGREE_NUMBER;
    let hourDegree = hour * HOUR_DEGREE_NUMBER;
    let clockHandObj = {value: '', degree: '', isMouseOver: '', isDragging: '', startAngle: '', angle: '', isMouseOver: false, isDragging: false,};

    this.state = {
      clockHandSecond: this.updateClockHandObj(clockHandObj, second, secondDegree, secondDegree, secondDegree),
      clockHandMinute: this.updateClockHandObj(clockHandObj, minute, minuteDegree, minuteDegree, minuteDegree),
      clockHandHour: this.updateClockHandObj(clockHandObj, hourText, hourDegree, hourDegree, hourDegree),
      meridiem,
      slectionRange: {start: 0, end: 0},
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.initCoordinates = this.initCoordinates.bind(this);
  }

  initCoordinates() {
    const centerPoint = ReactDOM.findDOMNode(this.clockCenter);
    const centerPointPos = centerPoint.getBoundingClientRect();
    const top = centerPointPos.top, left = centerPointPos.left, height = centerPointPos.height, width = centerPointPos.width;
    this.originX = left + (width / 2);
    this.originY = top + (height / 2);
  }

  componentDidMount(){
    this.initCoordinates();
    if (document.addEventListener) {
      document.addEventListener('resize', this.initCoordinates, true);
      document.addEventListener('scroll', this.initCoordinates, true);
      document.addEventListener('mousemove', this.handleMouseMove, true);
      document.addEventListener('mouseup', this.handleMouseUp, true);
    } else {
      document.attachEvent('onresize', this.handleMouseMove);
      document.attachEvent('onscroll', this.handleMouseMove);
      document.attachEvent('onmousemove', this.handleMouseMove);
      document.attachEvent('onmouseup', this.handleMouseUp);
    }
    this.initializeClock();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.slectionRange != this.state.slectionRange){
      this.timeInput.focus();
      this.timeInput.setSelectionRange(this.state.slectionRange.start, this.state.slectionRange.end);
    }
    if (this.timeinterval === false && this.resetting === false){
      if (prevState.clockHandSecond != this.state.clockHandSecond){
        this.props.onSecondChange(this.state.clockHandSecond);
      }
      if (prevState.clockHandMinute != this.state.clockHandMinute){
        this.props.onMinuteChange(this.state.clockHandMinute);
      }
      if (prevState.clockHandHour != this.state.clockHandHour){
        this.props.onHourChange(this.state.clockHandHour);
      }
      if (prevState.meridiem != this.state.meridiem){
        this.props.onMeridiemChange(this.state.meridiem);
      }
    }
  }

  componentWillUnmount() {
    if (document.removeEventListener) {
      document.removeEventListener('mousemove', this.handleMouseMove, true);
      document.removeEventListener('mouseup', this.handleMouseUp, true);
    } else {
      document.detachEvent('onmousemove', this.handleMouseMove);
      document.detachEvent('onmouseup', this.handleMouseUp);
    }
  }

  updateClockHandObj (o, value, degree, startAngle, angle, isMouseOver = false, isDragging = false){
    o = update(o, {value: {$set: value}, degree: {$set: degree}, startAngle: {$set: startAngle}, angle: {$set: angle}, isMouseOver: {$set: isMouseOver}, isDragging: {$set: isDragging}});
    return o;
  }

  initializeClock() {
    this.timeinterval = setInterval(this.updateClock.bind(this), 1000);
  }

  updateClock() {
    if (this.state.clockHandSecond.isDragging || this.state.clockHandMinute.isDragging || this.state.clockHandHour.isDragging){
      this._clearInterval();
      return;
    }
    this.resetClockHandObj();
  }

  _clearInterval() {
    clearInterval(this.timeinterval);
    this.timeinterval = false;
  }

  resetClockHandObj(clear = false) {
    let { clockHandSecond, clockHandMinute, clockHandHour,} = this.state;
    let hour = '12', minute = '00', second = '00', hourText = '12', meridiem = 'AM';
    if (!clear){
      let todayObj = getTodayObj();
      hour = todayObj.hour;
      minute = todayObj.minute;
      second = todayObj.second;
      hourText = todayObj.hourText;
      meridiem = todayObj.meridiem;
    }

    let secondDegree = second * SECOND_DEGREE_NUMBER;
    let minuteDegree = minute * MINUTE_DEGREE_NUMBER;
    let hourDegree = hour * HOUR_DEGREE_NUMBER;
    clockHandSecond = this.updateClockHandObj(clockHandSecond, second, secondDegree, secondDegree, secondDegree,);
    clockHandMinute = this.updateClockHandObj(clockHandMinute, minute, minuteDegree, minuteDegree, minuteDegree,);
    clockHandHour = this.updateClockHandObj(clockHandHour, hourText, hourDegree, hourDegree, hourDegree,);
    this.setState({ clockHandSecond, clockHandMinute, clockHandHour, meridiem, });
    return { clockHandSecond, clockHandMinute, clockHandHour, meridiem, };
  }

  onFocus(){
    this._clearInterval();
  }

  onClick(e){

  }

  handleMouseWheel(e){
    this.onKeyDown({
      keyCode: e.deltaY > 0 ? '38' : '40',
      type: e.type || 'unknown',
      stopPropagation: typeof e.stopPropagation == 'function' ? () => e.stopPropagation(): emptyFn,
      preventDefault: typeof e.preventDefault == 'function' ? () => e.preventDefault(): emptyFn
    });
    e.preventDefault();
  }

  onKeyDown(e) {
    this.resetting = false;
    let { keyCode } = e;
    let el = this.timeInput;
    let pos = { start: el.selectionStart,  end: el.selectionEnd, };
    let key = KEY_CODE[keyCode];

    if (typeof key == 'undefined'){ this.setState({slectionRange: pos}); return; }

    let range = { start: 0, end: 0 };
    let elObj, refName;

    let o = {};
    if (TIME_CURSOR_POSITION_OBJECT[pos.start]){
      o[TIME_CURSOR_POSITION_OBJECT[pos.start]] = true;
      range.start = pos.start == pos.end ? pos.start - 2 : pos.start;
      range.end = pos.start;
    }

    TIME_TYPE.map((i, k) => {
      if (typeof o[i] != 'undefined' && o[i]){
        refName = i;
        elObj = this.state[refName];
      }
    });

    let newValue;
    if (key == 'ArrowUp' || key == 'ArrowDown') {
      range.start = pos.start;
      range.end = pos.start != pos.end ? pos.start + 2 : pos.start;
      let val = parseInt(elObj.value);
      let diff = 1;
      if (key == 'ArrowDown'){ diff = -diff; }
      newValue = val + diff;
      if (refName == 'clockHandMinute' || refName == 'clockHandSecond'){
        if (newValue == 60){ newValue = 0; }
        if (newValue == -1){ newValue = 59; }
      }
      else if (refName == 'clockHandHour'){
        if (newValue == 13){ newValue = 1; }
        if (newValue == -1){ newValue = 11; }
      }
    }

    else if (!isNaN(parseInt(key)) || key == 'Backspace' || key == 'Delete'){
      let number = parseInt(key), start, end;
      let skipNum = getInputCharSkipNum(pos.start);

      if (key == 'Backspace'){
        skipNum = -skipNum;
        number = 0;
        start = pos.start + skipNum;
        end = pos.start + skipNum;
        if (!elObj.value){
          this.setState({slectionRange: {start: start, end: end}});
          e.preventDefault();
          return;
        }
      }
      if (key == 'Delete'){
        number = 0;
      }
      if (elObj.value){
        newValue = number;
        let strValue = (elObj.value).toString();
        if (pos.start == pos.end){
          if (skipNum > 0) {
            if (TIME_SELECTION_FIRST_CHAR_POS_LIST.indexOf(pos.start) != -1){// 0*
              newValue = parseInt(number + strValue.substr(strValue.length - 1));
            }
            else if (TIME_SELECTION_SECOND_CHAR_POS_LIST.indexOf(pos.start) != -1){// *0
              newValue = parseInt(strValue.substr(0, 1) + number);
            }
          }
          else{
            if (TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST.indexOf(pos.start) != -1){// 0*
              newValue = parseInt(number + strValue.substr(strValue.length - 1));
            }
            else if (TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST.indexOf(pos.start) != -1){// *0
              newValue = parseInt(strValue.substr(0, 1) + number);
            }
          }
          range.start = range.end = pos.start + skipNum;
        }
        else{
          if (TIME_SELECTION_FIRST_CHAR_POS_LIST.indexOf(pos.start) != -1){
            if (pos.end < pos.start){
              newValue = parseInt(strValue.substr(0, 1) + number);
              range.start = range.end = pos.start;
            }
            else{
              newValue = parseInt(number + strValue.substr(strValue.length - 1));
              range.start = range.end = pos.start + skipNum;
            }
          }
        }
        if ((refName == 'clockHandHour') && (newValue == 0 || newValue > 12)){
          newValue = 12;
        }
        else{
          if (newValue > 60){
            newValue = key;
            range.start = range.end = pos.start + skipNum;
          }
        }
      }
    }

    newValue = formatClockNumber(newValue);

    let slectionRange = {start: range.start, end: range.end};

    if (typeof newValue != 'undefined' && refName != 'meridiem'){
      let newDegree;
      if (refName == 'clockHandSecond'){
        newDegree = parseInt(newValue) * SECOND_DEGREE_NUMBER;
      }
      if (refName == 'clockHandMinute'){
        newDegree = parseInt(newValue) * MINUTE_DEGREE_NUMBER;
      }
      if (refName == 'clockHandHour'){
        newDegree = parseInt(newValue) * HOUR_DEGREE_NUMBER;
      }
      elObj = update(elObj, {
        value: {$set: newValue},
        degree: {$set: newDegree},
        startAngle: {$set: newDegree},
        angle: {$set: newDegree},
      });
      this.setState({[refName]: elObj, slectionRange});
    }

    if (key == 'ArrowUp' || key == 'ArrowDown'){
      if (refName == 'meridiem'){
        let meridiem = 'AM';
        if (elObj == 'AM'){
          meridiem = 'PM';
        }
        elObj = meridiem;
        this.setState({[refName]: elObj, slectionRange});
      }
    }

    if (!(key == 'ArrowLeft' || key == 'ArrowRight')){
      e.preventDefault();
    }
  }

  onMouseOver(refName){
    let elObj = this.state[refName];
    elObj = update(elObj, {isMouseOver: {$set: true}});
    this.setState({[refName]: elObj});
  }

  onMouseOut(refName){
    let elObj = this.state[refName];
    elObj = update(elObj, {isMouseOver: {$set: false}});
    this.setState({[refName]: elObj});
  }

  handleMouseDown(refName, e){
    let elObj = this.state[refName];
    let x = e.clientX - this.originX;
    let y = e.clientY - this.originY;
    let startAngle = R2D * Math.atan2(y, x);
    elObj = update(elObj, {
      isDragging: {$set: true},
      startAngle: {$set: startAngle},
    });
    this.setState({[refName]: elObj});
  }

  handleMouseMove(e){

    let {
      clockHandSecond,
      clockHandMinute,
      clockHandHour,
    } = this.state;
    if (clockHandSecond.isDragging || clockHandMinute.isDragging || clockHandHour.isDragging){
      this._clearInterval();
      let refName;
      let roundingAngle = SECOND_DEGREE_NUMBER;
      if (clockHandSecond.isDragging){
        refName = 'clockHandSecond';
      }
      if (clockHandMinute.isDragging){
        refName = 'clockHandMinute';
      }
      if (clockHandHour.isDragging){
        refName = 'clockHandHour';
        roundingAngle = HOUR_DEGREE_NUMBER;
      }
      let elObj = this.state[refName];
      let x = e.clientX - this.originX;
      let y = e.clientY - this.originY;
      let d = R2D * Math.atan2(y, x);

      let rotation = parseInt(d - elObj.startAngle);
      rotation = Math.floor((rotation % 360 + roundingAngle / 2) / roundingAngle) * roundingAngle;
      let degree =  elObj.angle + rotation;
      if (degree >= 360){ degree = degree - 360; }
      if (degree < 0){ degree = degree + 360; }
      let value = degree / roundingAngle;
      value = formatClockNumber(value);
      if (clockHandHour.isDragging){
        if (value == '00'){ value = 12; }
      }
      elObj = update(elObj, {
        value: {$set: value},
        degree: {$set: degree},
      });
      this.setState({[refName]: elObj});
    }
  }

  handleMouseUp(e){
    let {
      clockHandSecond,
      clockHandMinute,
      clockHandHour,
    } = this.state;
    if (clockHandSecond.isDragging || clockHandMinute.isDragging || clockHandHour.isDragging){
      let clockHandSecondDegree = this.state.clockHandSecond.degree;
      let clockHandMinuteDegree = this.state.clockHandMinute.degree;
      let clockHandHourDegree = this.state.clockHandHour.degree;

      clockHandSecond = update(clockHandSecond, { isDragging: {$set: false}, angle: {$set: clockHandSecondDegree} });
      clockHandMinute = update(clockHandMinute, { isDragging: {$set: false}, angle: {$set: clockHandMinuteDegree} });
      clockHandHour = update(clockHandHour, { isDragging: {$set: false}, angle: {$set: clockHandHourDegree} });
      this.setState({ clockHandSecond, clockHandMinute, clockHandHour,});
    }
  }

  changeTime(e) {
    e.stopPropagation();
  }

  reset() {
    this.resetting = true;
    let res = this.resetClockHandObj();
    this.initializeClock();
    this.props.onResetTime(res);
  }

  clear() {
    this.resetting = true;
    let res = this.resetClockHandObj(true);
    this._clearInterval();
    this.props.onClearTime(res);
  }

  render() {
    let{ size, locale, } = this.props;
    let { direction, clockHandSecond, clockHandMinute, clockHandHour, meridiem, } = this.state;

    let secondStyle = {
      transform: `translate(${SECONDS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandSecond.degree}deg) translate(${SECONDS_TRANSLATE_SECOND_SIZE[size]})`,
      WebkitTransform: `translate(${SECONDS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandSecond.degree}deg) translate(${SECONDS_TRANSLATE_SECOND_SIZE[size]})`,
      MozTransform: `translate(${SECONDS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandSecond.degree}deg) translate(${SECONDS_TRANSLATE_SECOND_SIZE[size]})`,
      msTransform: `translate(${SECONDS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandSecond.degree}deg) translate(${SECONDS_TRANSLATE_SECOND_SIZE[size]})`,
      OTransform: `translate(${SECONDS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandSecond.degree}deg) translate(${SECONDS_TRANSLATE_SECOND_SIZE[size]})`,
    };
    let minuteStyle = {
      transform: `translate(${MINUTES_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandMinute.degree}deg) translate(${MINUTES_TRANSLATE_SECOND_SIZE[size]})`,
      WebkitTransform: `translate(${MINUTES_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandMinute.degree}deg) translate(${MINUTES_TRANSLATE_SECOND_SIZE})`,
      MozTransform: `translate(${MINUTES_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandMinute.degree}deg) translate(${MINUTES_TRANSLATE_SECOND_SIZE[size]})`,
      msTransform: `translate(${MINUTES_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandMinute.degree}deg) translate(${MINUTES_TRANSLATE_SECOND_SIZE[size]})`,
      OTransform: `translate(${MINUTES_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandMinute.degree}deg) translate(${MINUTES_TRANSLATE_SECOND_SIZE[size]})`,
    };
    let hourStyle = {
      transform: `translate(${HOURS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandHour.degree}deg) translate(${HOURS_TRANSLATE_SECOND_SIZE[size]})`,
      WebkitTransform: `translate(${HOURS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandHour.degree}deg) translate(${HOURS_TRANSLATE_SECOND_SIZE[size]})`,
      MozTransform: `translate(${HOURS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandHour.degree}deg) translate(${HOURS_TRANSLATE_SECOND_SIZE[size]})`,
      msTransform: `translate(${HOURS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandHour.degree}deg) translate(${HOURS_TRANSLATE_SECOND_SIZE[size]})`,
      OTransform: `translate(${HOURS_TRANSLATE_FIRST_SIZE[size]}) rotate(${clockHandHour.degree}deg) translate(${HOURS_TRANSLATE_SECOND_SIZE[size]})`,
    };

    let minutesItem = [];

    for (let i = 0; i < 60; i++){
      let isQuarter = false;
      let isFive = false;

      let translateFirst = TRANSLATE_FIRST_SIZE[size];
      let translateSecond = TRANSLATE_SECOND_SIZE[size];
      if (QUARTER.indexOf(i) != -1){
        isQuarter = true;
        translateFirst = TRANSLATE_QUARTER_SECOND_SIZE[size];
      }
      if (i % 5 == 0){
        isFive = true;
      }
      let minutesItemClass = cx(
        'picky-date-time-clock__clock-minute',
        isQuarter && 'picky-date-time-clock__clock-minute--quarter',
        isFive && 'picky-date-time-clock__clock-minute--five',
      );
      let degree = i * 6 + 180;
      let minutesItemStyle = {
        transform: `translate(${translateFirst}) rotate(${degree}deg) translate(${translateSecond})`,
        WebkitTransform: `translate(${translateFirst}) rotate(${degree}deg) translate(${translateSecond})`,
        MozTransform: `translate(${translateFirst}) rotate(${degree}deg) translate(${translateSecond})`,
        msTransform: `translate(${translateFirst}) rotate(${degree}deg) translate(${translateSecond})`,
        OTransform: `translate(${translateFirst}) rotate(${degree}deg) translate(${translateSecond})`,
      };
      minutesItem.push(
        <div key={i} className={minutesItemClass} style={minutesItemStyle}></div>
      );
    }
    return (
      <div className={`picky-date-time-clock ${size}`}>
        <div className={`picky-date-time-clock__circle ${size}`} ref={ref => this.clockCircle = ref}>
          <div
            className={`picky-date-time-clock__clock-hand picky-date-time-clock__clock-hand--second`}
            style={secondStyle}
            onMouseOver={this.onMouseOver.bind(this, 'clockHandSecond')}
            onMouseOut={this.onMouseOut.bind(this, 'clockHandSecond')}
            onMouseDown={this.handleMouseDown.bind(this, 'clockHandSecond')}
            ref={ref => this.clockHandSecond = ref}>
            </div>
          <div
            className={`picky-date-time-clock__clock-hand picky-date-time-clock__clock-hand--minute`}
            style={minuteStyle}
            onMouseOver={this.onMouseOver.bind(this, 'clockHandMinute')}
            onMouseOut={this.onMouseOut.bind(this, 'clockHandMinute')}
            onMouseDown={this.handleMouseDown.bind(this, 'clockHandMinute')}
            ref={ref => this.clockHandMinute = ref}>
            </div>
          <div
            className={`picky-date-time-clock__clock-hand picky-date-time-clock__clock-hand--hour`}
            style={hourStyle}
            onMouseOver={this.onMouseOver.bind(this, 'clockHandHour')}
            onMouseOut={this.onMouseOut.bind(this, 'clockHandHour')}
            onMouseDown={this.handleMouseDown.bind(this, 'clockHandHour')}
            ref={ref => this.clockHandHour = ref}>
            </div>
            {minutesItem}
          <div className={`picky-date-time-clock__clock-center`} ref={ref => this.clockCenter = ref}></div>
        </div>
        <div className={`picky-date-time-clock__inputer-wrapper`}>
          <div className={`picky-date-time-clock__inputer`}>
            <input
              className={`picky-date-time-clock__input`}
              value={`${clockHandHour.value}:${clockHandMinute.value}:${clockHandSecond.value} ${meridiem}`}
              onFocus={this.onFocus.bind(this)}
              onKeyDown={this.onKeyDown.bind(this)}
              onChange={this.changeTime.bind(this)}
              onClick={this.onClick.bind(this)}
              onWheel={this.handleMouseWheel.bind(this)}
              ref={ref => this.timeInput = ref}
            />
            <span className={`picky-date-time-clock__inline-span picky-date-time-clock__icon picky-date-time-clock__icon--remove_circle_outline picky-date-time-remove_circle_outline`} onClick={this.clear.bind(this)} title={LANG[locale]['clear']}></span>
          </div>
          <div className={`picky-date-time-clock__inline-div picky-date-time-clock__inline-div--middle`}>
            <span className={`picky-date-time-clock__inline-span picky-date-time-clock__icon picky-date-time-clock__icon--schedule picky-date-time-schedule`} onClick={this.timeinterval === false ? this.reset.bind(this) : ``} title={LANG[locale]['now']}></span>
          </div>
        </div>
      </div>
    );
  }
}

Clock.propTypes = {
  size: PropTypes.string,
  locale: PropTypes.string,
  onSecondChange: PropTypes.func,
  onMinuteChange: PropTypes.func,
  onHourChange: PropTypes.func,
  onMeridiemChange: PropTypes.func,
  onResetTime: PropTypes.func,
  onClearTime: PropTypes.func,
};

Clock.defaultProps = {
  size: 'm',
  locale: 'en-US',
  onSecondChange: () => {},
  onMinuteChange: () => {},
  onHourChange: () => {},
  onMeridiemChange: () => {},
  onResetTime: () => {},
  onClearTime: () => {},
}

export default Clock;