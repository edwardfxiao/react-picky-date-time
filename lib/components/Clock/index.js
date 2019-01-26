'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _locale = require('../locale.js');

var _constValue = require('../constValue');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TRANSLATE_FIRST_SIZE = {
  l: '-2px, -1px',
  m: '-2px, -1px',
  s: '-2px, -1px',
  xs: '0px, -1px'
};

var TRANSLATE_SECOND_SIZE = {
  l: '0px, 155px',
  m: '0px, 125px',
  s: '0px, 95px',
  xs: '0px, 85px'
};

var TRANSLATE_QUARTER_SECOND_SIZE = {
  l: '0px, -3px',
  m: '0px, -3px',
  s: '0px, -3px',
  xs: '0px, -3px'
};

var SECONDS_TRANSLATE_FIRST_SIZE = {
  l: '-1px, -34.5px',
  m: '-1px, -34.5px',
  s: '-1px, -34.5px',
  xs: '-1px, -34.5px'
};

var SECONDS_TRANSLATE_SECOND_SIZE = {
  l: '0px, -22.5px',
  m: '0px, -22.5px',
  s: '0px, -22.5px',
  xs: '0px, -22.5px'
};

var MINUTES_TRANSLATE_FIRST_SIZE = {
  l: '-1px, -32.5px',
  m: '-1px, -32.5px',
  s: '-1px, -32.5px',
  xs: '-1px, -32.5px'
};

var MINUTES_TRANSLATE_SECOND_SIZE = {
  l: '0px, -20.5px',
  m: '0px, -20.5px',
  s: '0px, -20.5px',
  xs: '0px, -20.5px'
};

var HOURS_TRANSLATE_FIRST_SIZE = {
  l: '-1.5px, -24.5px',
  m: '-1.5px, -24.5px',
  s: '-1.5px, -24.5px',
  xs: '-1.5px, -24.5px'
};

var HOURS_TRANSLATE_SECOND_SIZE = {
  l: '0px, -14.5px',
  m: '0px, -14.5px',
  s: '0px, -14.5px',
  xs: '0px, -14.5px'
};

var emptyFn = function emptyFn() {};

var isValidTime = function isValidTime(value) {
  // Checks if time is in HH:MM:SS AM/PM format.
  // The seconds and AM/PM are optional.
  if (value == '') {
    return false;
  }
  var timePat = /^(\d{1,2}):(\d{2})(:(\d{2}))?(\s?(AM|am|PM|pm))?$/;

  var matchArray = value.match(timePat);
  if (matchArray == null) {
    console.error('Time is not in a valid format.');
    return false;
  }
  var hour = matchArray[1];
  var minute = matchArray[2];
  var second = matchArray[4];
  var meridiem = matchArray[6];

  if (second == '') {
    second = null;
  }
  if (meridiem == '') {
    meridiem = null;
  }

  if (hour < 0 || hour > 23) {
    console.error('Hour must be between 1 and 12.');
    return false;
  }
  if (hour <= 12 && meridiem == null) {
    console.error('You must specify AM or PM.');
    return false;
  }
  if (hour > 12 && meridiem != null) {
    console.error("You can't specify AM or PM for military time.");
    return false;
  }
  if (minute < 0 || minute > 59) {
    console.error('Minute must be between 0 and 59.');
    return false;
  }
  if (second != null && (second < 0 || second > 59)) {
    console.error('Second must be between 0 and 59.');
    return false;
  }
  second = formatClockNumber(second);
  minute = formatClockNumber(minute);
  var hourText = formatClockNumber(hour);
  return {
    hour: hour,
    minute: minute,
    second: second,
    meridiem: meridiem,
    hourText: hourText
  };
};

var formatClockNumber = function formatClockNumber(value) {
  value = Number(value);
  if (value < 10 && value >= 0) {
    return value = '0' + value;
  }
  return value;
};

var getTodayObj = function getTodayObj() {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var date = today.getDate();

  var hour = today.getHours();
  var minute = today.getMinutes();
  var second = today.getSeconds();

  var meridiem = Number(hour) < 12 ? 'AM' : 'PM';
  var hourText = hour > 12 ? hour - 12 : hour;

  second = formatClockNumber(second);
  minute = formatClockNumber(minute);
  hourText = formatClockNumber(hourText);

  return { year: year, month: month, date: date, hour: hour, minute: minute, second: second, meridiem: meridiem, hourText: hourText };
};

var getInputCharSkipNum = function getInputCharSkipNum(pos) {
  var num = 1;
  if (_constValue.TIME_JUMP_CHAR_POS_LIST.indexOf(pos) != -1) {
    num = 2;
  }
  return num;
};

var Clock = function (_React$Component) {
  _inherits(Clock, _React$Component);

  function Clock(props) {
    _classCallCheck(this, Clock);

    var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

    var todayObj = getTodayObj();
    var hour = todayObj.hour,
        minute = todayObj.minute,
        second = todayObj.second,
        meridiem = todayObj.meridiem,
        hourText = todayObj.hourText;

    var defaultTimeObj = isValidTime(props.defaultTime);
    if (defaultTimeObj) {
      hour = defaultTimeObj.hour;
      hourText = defaultTimeObj.hourText;
      minute = defaultTimeObj.minute;
      second = defaultTimeObj.second;
      meridiem = defaultTimeObj.meridiem;
    }

    _this.startX = 0;
    _this.startY = 0;
    _this.originX = null;
    _this.originY = null;

    var secondDegree = second * _constValue.SECOND_DEGREE_NUMBER;
    var minuteDegree = minute * _constValue.MINUTE_DEGREE_NUMBER;
    var hourDegree = hour * _constValue.HOUR_DEGREE_NUMBER;
    var clockHandObj = {
      value: '',
      degree: '',
      startAngle: '',
      angle: '',
      isMouseOver: false,
      isDragging: false
    };

    _this.state = {
      defaultTimeObj: defaultTimeObj,
      clockHandSecond: _this.updateClockHandObj(clockHandObj, second, secondDegree, secondDegree, secondDegree),
      clockHandMinute: _this.updateClockHandObj(clockHandObj, minute, minuteDegree, minuteDegree, minuteDegree),
      clockHandHour: _this.updateClockHandObj(clockHandObj, hourText, hourDegree, hourDegree, hourDegree),
      meridiem: meridiem,
      slectionRange: { start: 0, end: 0 }
    };
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.initCoordinates = _this.initCoordinates.bind(_this);
    _this.updateClock = _this.updateClock.bind(_this);
    return _this;
  }

  _createClass(Clock, [{
    key: 'initCoordinates',
    value: function initCoordinates() {
      if (this.clockCenter == null) {
        return;
      }
      var centerPoint = _reactDom2.default.findDOMNode(this.clockCenter);
      var centerPointPos = centerPoint.getBoundingClientRect();
      var top = centerPointPos.top,
          left = centerPointPos.left,
          height = centerPointPos.height,
          width = centerPointPos.width;
      this.originX = left + width / 2;
      this.originY = top + height / 2;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        return _this2.initCoordinates();
      }, 1000);
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
      if (!this.state.defaultTimeObj) {
        this.initializeClock();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.slectionRange != this.state.slectionRange) {
        this.timeInput.focus();
        this.timeInput.setSelectionRange(this.state.slectionRange.start, this.state.slectionRange.end);
      }
      if (this.timeinterval === false) {
        if (prevState.clockHandSecond != this.state.clockHandSecond) {
          this.props.onSecondChange(this.state.clockHandSecond);
        }
        if (prevState.clockHandMinute != this.state.clockHandMinute) {
          this.props.onMinuteChange(this.state.clockHandMinute);
        }
        if (prevState.clockHandHour != this.state.clockHandHour) {
          this.props.onHourChange(this.state.clockHandHour);
        }
        if (prevState.meridiem != this.state.meridiem) {
          this.props.onMeridiemChange(this.state.meridiem);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (document.removeEventListener) {
        document.removeEventListener('resize', this.initCoordinates, true);
        document.removeEventListener('scroll', this.initCoordinates, true);
        document.removeEventListener('mousemove', this.handleMouseMove, true);
        document.removeEventListener('mouseup', this.handleMouseUp, true);
      } else {
        document.detachEvent('onresize', this.handleMouseMove);
        document.detachEvent('onscroll', this.handleMouseMove);
        document.detachEvent('onmousemove', this.handleMouseMove);
        document.detachEvent('onmouseup', this.handleMouseUp);
      }
    }
  }, {
    key: 'updateClockHandObj',
    value: function updateClockHandObj(o, value, degree, startAngle, angle) {
      var isMouseOver = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var isDragging = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

      o = (0, _reactAddonsUpdate2.default)(o, {
        value: { $set: value },
        degree: { $set: degree },
        startAngle: { $set: startAngle },
        angle: { $set: angle },
        isMouseOver: { $set: isMouseOver },
        isDragging: { $set: isDragging }
      });
      return o;
    }
  }, {
    key: 'initializeClock',
    value: function initializeClock() {
      this.timeinterval = setInterval(this.updateClock, 1000);
    }
  }, {
    key: 'updateClock',
    value: function updateClock() {
      if (this.clock == null) {
        return;
      }
      if (this.state.clockHandSecond.isDragging || this.state.clockHandMinute.isDragging || this.state.clockHandHour.isDragging) {
        this._clearInterval();
        return;
      }
      this.resetClockHandObj();
    }
  }, {
    key: '_clearInterval',
    value: function _clearInterval() {
      clearInterval(this.timeinterval);
      this.timeinterval = false;
    }
  }, {
    key: 'resetClockHandObj',
    value: function resetClockHandObj() {
      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var defaultTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _state = this.state,
          clockHandSecond = _state.clockHandSecond,
          clockHandMinute = _state.clockHandMinute,
          clockHandHour = _state.clockHandHour;

      var hour = '12',
          minute = '00',
          second = '00',
          hourText = '12',
          meridiem = 'AM';
      if (!clear) {
        var todayObj = getTodayObj();
        hour = todayObj.hour;
        minute = todayObj.minute;
        second = todayObj.second;
        hourText = todayObj.hourText;
        meridiem = todayObj.meridiem;
      }

      if (defaultTime) {
        var defaultTimeObj = this.state.defaultTimeObj;
        hour = defaultTimeObj.hour;
        minute = defaultTimeObj.minute;
        second = defaultTimeObj.second;
        hourText = defaultTimeObj.hourText;
        meridiem = defaultTimeObj.meridiem;
      }

      var secondDegree = second * _constValue.SECOND_DEGREE_NUMBER;
      var minuteDegree = minute * _constValue.MINUTE_DEGREE_NUMBER;
      var hourDegree = hour * _constValue.HOUR_DEGREE_NUMBER;
      clockHandSecond = this.updateClockHandObj(clockHandSecond, second, secondDegree, secondDegree, secondDegree);
      clockHandMinute = this.updateClockHandObj(clockHandMinute, minute, minuteDegree, minuteDegree, minuteDegree);
      clockHandHour = this.updateClockHandObj(clockHandHour, hourText, hourDegree, hourDegree, hourDegree);
      this.setState({
        clockHandSecond: clockHandSecond,
        clockHandMinute: clockHandMinute,
        clockHandHour: clockHandHour,
        meridiem: meridiem
      });
      return { clockHandSecond: clockHandSecond, clockHandMinute: clockHandMinute, clockHandHour: clockHandHour, meridiem: meridiem };
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this._clearInterval();
    }
  }, {
    key: 'onClick',
    value: function onClick() {}
  }, {
    key: 'handleMouseWheel',
    value: function handleMouseWheel(e) {
      this.onKeyDown({
        keyCode: e.deltaY > 0 ? '38' : '40',
        type: e.type || 'unknown',
        stopPropagation: typeof e.stopPropagation == 'function' ? function () {
          return e.stopPropagation();
        } : emptyFn,
        preventDefault: typeof e.preventDefault == 'function' ? function () {
          return e.preventDefault();
        } : emptyFn
      });
      e.preventDefault();
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      var _this3 = this;

      this.resetting = false;
      var keyCode = e.keyCode;

      var el = this.timeInput;
      var pos = { start: el.selectionStart, end: el.selectionEnd };
      var key = _constValue.KEY_CODE[keyCode];

      if (typeof key == 'undefined') {
        this.setState({ slectionRange: pos });
        return;
      }

      var range = { start: 0, end: 0 };
      var elObj = void 0,
          refName = void 0;

      var o = {};
      if (_constValue.TIME_CURSOR_POSITION_OBJECT[pos.start]) {
        o[_constValue.TIME_CURSOR_POSITION_OBJECT[pos.start]] = true;
        range.start = pos.start == pos.end ? pos.start - 2 : pos.start;
        range.end = pos.start;
      }

      _constValue.TIME_TYPE.map(function (i) {
        if (typeof o[i] != 'undefined' && o[i]) {
          refName = i;
          elObj = _this3.state[refName];
        }
      });

      var newValue = void 0;
      if (key == 'ArrowUp' || key == 'ArrowDown') {
        range.start = pos.start;
        range.end = pos.start != pos.end ? pos.start + 2 : pos.start;
        var val = Number(elObj.value);
        var diff = 1;
        if (key == 'ArrowDown') {
          diff = -diff;
        }
        newValue = val + diff;
        if (refName == 'clockHandMinute' || refName == 'clockHandSecond') {
          if (newValue == 60) {
            newValue = 0;
          }
          if (newValue == -1) {
            newValue = 59;
          }
        } else if (refName == 'clockHandHour') {
          if (newValue == 13) {
            newValue = 1;
          }
          if (newValue == -1) {
            newValue = 11;
          }
        }
      } else if (!isNaN(Number(key)) || key == 'Backspace' || key == 'Delete') {
        var number = Number(key),
            start = void 0,
            end = void 0;
        var skipNum = getInputCharSkipNum(pos.start);

        if (key == 'Backspace') {
          skipNum = -skipNum;
          number = 0;
          start = pos.start + skipNum;
          end = pos.start + skipNum;
          if (!elObj.value) {
            this.setState({ slectionRange: { start: start, end: end } });
            e.preventDefault();
            return;
          }
        }
        if (key == 'Delete') {
          number = 0;
        }
        if (elObj.value) {
          newValue = number;
          var strValue = elObj.value.toString();
          if (pos.start == pos.end) {
            if (skipNum > 0) {
              if (_constValue.TIME_SELECTION_FIRST_CHAR_POS_LIST.indexOf(pos.start) != -1) {
                // 0*
                newValue = Number(number + strValue.substr(strValue.length - 1));
              } else if (_constValue.TIME_SELECTION_SECOND_CHAR_POS_LIST.indexOf(pos.start) != -1) {
                // *0
                newValue = Number(strValue.substr(0, 1) + number);
              }
            } else {
              if (_constValue.TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST.indexOf(pos.start) != -1) {
                // 0*
                newValue = Number(number + strValue.substr(strValue.length - 1));
              } else if (_constValue.TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST.indexOf(pos.start) != -1) {
                // *0
                newValue = Number(strValue.substr(0, 1) + number);
              }
            }
            range.start = range.end = pos.start + skipNum;
          } else {
            if (_constValue.TIME_SELECTION_FIRST_CHAR_POS_LIST.indexOf(pos.start) != -1) {
              if (pos.end < pos.start) {
                newValue = Number(strValue.substr(0, 1) + number);
                range.start = range.end = pos.start;
              } else {
                newValue = Number(number + strValue.substr(strValue.length - 1));
                range.start = range.end = pos.start + skipNum;
              }
            }
          }
          if (refName == 'clockHandHour' && (newValue == 0 || newValue > 12)) {
            newValue = 12;
          } else {
            if (newValue > 60) {
              newValue = key;
              range.start = range.end = pos.start + skipNum;
            }
          }
        }
      }

      newValue = formatClockNumber(newValue);

      var slectionRange = { start: range.start, end: range.end };
      // debugger;
      if (!isNaN(newValue) && refName != 'meridiem') {
        var _setState;

        var newDegree = void 0;
        if (refName == 'clockHandSecond') {
          newDegree = Number(newValue) * _constValue.SECOND_DEGREE_NUMBER;
        }
        if (refName == 'clockHandMinute') {
          newDegree = Number(newValue) * _constValue.MINUTE_DEGREE_NUMBER;
        }
        if (refName == 'clockHandHour') {
          if (Number(newValue) == 0) {
            newValue = 12;
          }
          newDegree = Number(newValue) * _constValue.HOUR_DEGREE_NUMBER;
        }
        elObj = (0, _reactAddonsUpdate2.default)(elObj, {
          value: { $set: newValue },
          degree: { $set: newDegree },
          startAngle: { $set: newDegree },
          angle: { $set: newDegree }
        });
        this.setState((_setState = {}, _defineProperty(_setState, refName, elObj), _defineProperty(_setState, 'slectionRange', slectionRange), _setState));
      }

      if (key == 'ArrowUp' || key == 'ArrowDown') {
        if (refName == 'meridiem') {
          var _setState2;

          var meridiem = 'AM';
          if (elObj == 'AM') {
            meridiem = 'PM';
          }
          elObj = meridiem;
          this.setState((_setState2 = {}, _defineProperty(_setState2, refName, elObj), _defineProperty(_setState2, 'slectionRange', slectionRange), _setState2));
        }
      }

      if (!(key == 'ArrowLeft' || key == 'ArrowRight')) {
        e.preventDefault();
      }
    }
  }, {
    key: 'onMouseOver',
    value: function onMouseOver(refName) {
      var elObj = this.state[refName];
      elObj = (0, _reactAddonsUpdate2.default)(elObj, { isMouseOver: { $set: true } });
      this.setState(_defineProperty({}, refName, elObj));
    }
  }, {
    key: 'onMouseOut',
    value: function onMouseOut(refName) {
      var elObj = this.state[refName];
      elObj = (0, _reactAddonsUpdate2.default)(elObj, { isMouseOver: { $set: false } });
      this.setState(_defineProperty({}, refName, elObj));
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(refName, e) {
      var elObj = this.state[refName];
      var x = e.clientX - this.originX;
      var y = e.clientY - this.originY;
      var startAngle = _constValue.R2D * Math.atan2(y, x);
      elObj = (0, _reactAddonsUpdate2.default)(elObj, {
        isDragging: { $set: true },
        startAngle: { $set: startAngle }
      });
      this.setState(_defineProperty({}, refName, elObj));
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      var _state2 = this.state,
          clockHandSecond = _state2.clockHandSecond,
          clockHandMinute = _state2.clockHandMinute,
          clockHandHour = _state2.clockHandHour;

      if (clockHandSecond.isDragging || clockHandMinute.isDragging || clockHandHour.isDragging) {
        this._clearInterval();
        var refName = void 0;
        var roundingAngle = _constValue.SECOND_DEGREE_NUMBER;
        if (clockHandSecond.isDragging) {
          refName = 'clockHandSecond';
        }
        if (clockHandMinute.isDragging) {
          refName = 'clockHandMinute';
        }
        if (clockHandHour.isDragging) {
          refName = 'clockHandHour';
          roundingAngle = _constValue.HOUR_DEGREE_NUMBER;
        }
        var elObj = this.state[refName];
        var x = e.clientX - this.originX;
        var y = e.clientY - this.originY;
        var d = _constValue.R2D * Math.atan2(y, x);

        var rotation = Number(d - elObj.startAngle);
        rotation = Math.floor((rotation % 360 + roundingAngle / 2) / roundingAngle) * roundingAngle;
        var degree = elObj.angle + rotation;
        if (degree >= 360) {
          degree = degree - 360;
        }
        if (degree < 0) {
          degree = degree + 360;
        }
        var value = degree / roundingAngle;
        value = formatClockNumber(value);
        if (clockHandHour.isDragging) {
          if (value == '00') {
            value = 12;
          }
        }
        elObj = (0, _reactAddonsUpdate2.default)(elObj, {
          value: { $set: value },
          degree: { $set: degree }
        });
        this.setState(_defineProperty({}, refName, elObj));
      }
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      var _state3 = this.state,
          clockHandSecond = _state3.clockHandSecond,
          clockHandMinute = _state3.clockHandMinute,
          clockHandHour = _state3.clockHandHour;

      if (clockHandSecond.isDragging || clockHandMinute.isDragging || clockHandHour.isDragging) {
        var clockHandSecondDegree = this.state.clockHandSecond.degree;
        var clockHandMinuteDegree = this.state.clockHandMinute.degree;
        var clockHandHourDegree = this.state.clockHandHour.degree;

        clockHandSecond = (0, _reactAddonsUpdate2.default)(clockHandSecond, {
          isDragging: { $set: false },
          angle: { $set: clockHandSecondDegree }
        });
        clockHandMinute = (0, _reactAddonsUpdate2.default)(clockHandMinute, {
          isDragging: { $set: false },
          angle: { $set: clockHandMinuteDegree }
        });
        clockHandHour = (0, _reactAddonsUpdate2.default)(clockHandHour, {
          isDragging: { $set: false },
          angle: { $set: clockHandHourDegree }
        });
        this.setState({ clockHandSecond: clockHandSecond, clockHandMinute: clockHandMinute, clockHandHour: clockHandHour });
      }
    }
  }, {
    key: 'changeTime',
    value: function changeTime(e) {
      e.stopPropagation();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.resetting = true;
      var res = this.resetClockHandObj();
      this.initializeClock();
      this.props.onResetTime(res);
    }
  }, {
    key: 'defaultTime',
    value: function defaultTime() {
      this.resetting = true;
      var res = this.resetClockHandObj(false, true);
      this._clearInterval();
      this.props.onResetDefaultTime(res);
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.resetting = true;
      var res = this.resetClockHandObj(true);
      this._clearInterval();
      this.props.onClearTime(res);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          size = _props.size,
          locale = _props.locale;
      var _state4 = this.state,
          defaultTimeObj = _state4.defaultTimeObj,
          clockHandSecond = _state4.clockHandSecond,
          clockHandMinute = _state4.clockHandMinute,
          clockHandHour = _state4.clockHandHour,
          meridiem = _state4.meridiem;


      var secondStyle = {
        transform: 'translate(' + SECONDS_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandSecond.degree + 'deg) translate(' + SECONDS_TRANSLATE_SECOND_SIZE[size] + ')',
        WebkitTransform: 'translate(' + SECONDS_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandSecond.degree + 'deg) translate(' + SECONDS_TRANSLATE_SECOND_SIZE[size] + ')',
        MozTransform: 'translate(' + SECONDS_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandSecond.degree + 'deg) translate(' + SECONDS_TRANSLATE_SECOND_SIZE[size] + ')',
        msTransform: 'translate(' + SECONDS_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandSecond.degree + 'deg) translate(' + SECONDS_TRANSLATE_SECOND_SIZE[size] + ')',
        OTransform: 'translate(' + SECONDS_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandSecond.degree + 'deg) translate(' + SECONDS_TRANSLATE_SECOND_SIZE[size] + ')'
      };
      var minuteStyle = {
        transform: 'translate(' + MINUTES_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandMinute.degree + 'deg) translate(' + MINUTES_TRANSLATE_SECOND_SIZE[size] + ')',
        WebkitTransform: 'translate(' + MINUTES_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandMinute.degree + 'deg) translate(' + MINUTES_TRANSLATE_SECOND_SIZE + ')',
        MozTransform: 'translate(' + MINUTES_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandMinute.degree + 'deg) translate(' + MINUTES_TRANSLATE_SECOND_SIZE[size] + ')',
        msTransform: 'translate(' + MINUTES_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandMinute.degree + 'deg) translate(' + MINUTES_TRANSLATE_SECOND_SIZE[size] + ')',
        OTransform: 'translate(' + MINUTES_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandMinute.degree + 'deg) translate(' + MINUTES_TRANSLATE_SECOND_SIZE[size] + ')'
      };
      var hourStyle = {
        transform: 'translate(' + HOURS_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandHour.degree + 'deg) translate(' + HOURS_TRANSLATE_SECOND_SIZE[size] + ')',
        WebkitTransform: 'translate(' + HOURS_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandHour.degree + 'deg) translate(' + HOURS_TRANSLATE_SECOND_SIZE[size] + ')',
        MozTransform: 'translate(' + HOURS_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandHour.degree + 'deg) translate(' + HOURS_TRANSLATE_SECOND_SIZE[size] + ')',
        msTransform: 'translate(' + HOURS_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandHour.degree + 'deg) translate(' + HOURS_TRANSLATE_SECOND_SIZE[size] + ')',
        OTransform: 'translate(' + HOURS_TRANSLATE_FIRST_SIZE[size] + ') rotate(' + clockHandHour.degree + 'deg) translate(' + HOURS_TRANSLATE_SECOND_SIZE[size] + ')'
      };

      var minutesItem = [];

      for (var i = 0; i < 60; i++) {
        var isQuarter = false;
        var isFive = false;

        var translateFirst = TRANSLATE_FIRST_SIZE[size];
        var translateSecond = TRANSLATE_SECOND_SIZE[size];
        if (_constValue.QUARTER.indexOf(i) != -1) {
          isQuarter = true;
          translateFirst = TRANSLATE_QUARTER_SECOND_SIZE[size];
        }
        if (i % 5 == 0) {
          isFive = true;
        }
        var minutesItemClass = (0, _classnames2.default)('picky-date-time-clock__clock-minute', isQuarter && 'picky-date-time-clock__clock-minute--quarter', isFive && 'picky-date-time-clock__clock-minute--five');
        var degree = i * 6 + 180;
        var minutesItemStyle = {
          transform: 'translate(' + translateFirst + ') rotate(' + degree + 'deg) translate(' + translateSecond + ')',
          WebkitTransform: 'translate(' + translateFirst + ') rotate(' + degree + 'deg) translate(' + translateSecond + ')',
          MozTransform: 'translate(' + translateFirst + ') rotate(' + degree + 'deg) translate(' + translateSecond + ')',
          msTransform: 'translate(' + translateFirst + ') rotate(' + degree + 'deg) translate(' + translateSecond + ')',
          OTransform: 'translate(' + translateFirst + ') rotate(' + degree + 'deg) translate(' + translateSecond + ')'
        };
        minutesItem.push(_react2.default.createElement('div', { key: i, className: minutesItemClass, style: minutesItemStyle }));
      }
      return _react2.default.createElement(
        'div',
        { className: 'picky-date-time-clock ' + size, ref: function ref(_ref7) {
            return _this4.clock = _ref7;
          } },
        _react2.default.createElement(
          'div',
          { className: 'picky-date-time-clock__circle ' + size, ref: function ref(_ref5) {
              return _this4.clockCircle = _ref5;
            } },
          _react2.default.createElement('div', {
            className: 'picky-date-time-clock__clock-hand picky-date-time-clock__clock-hand--second',
            style: secondStyle,
            onMouseOver: function onMouseOver(e) {
              return _this4.onMouseOver('clockHandSecond', e);
            },
            onMouseOut: function onMouseOut(e) {
              return _this4.onMouseOut('clockHandSecond', e);
            },
            onMouseDown: function onMouseDown(e) {
              return _this4.handleMouseDown('clockHandSecond', e);
            },
            ref: function ref(_ref) {
              return _this4.clockHandSecond = _ref;
            }
          }),
          _react2.default.createElement('div', {
            className: 'picky-date-time-clock__clock-hand picky-date-time-clock__clock-hand--minute',
            style: minuteStyle,
            onMouseOver: function onMouseOver(e) {
              return _this4.onMouseOver('clockHandMinute', e);
            },
            onMouseOut: function onMouseOut(e) {
              return _this4.onMouseOut('clockHandMinute', e);
            },
            onMouseDown: function onMouseDown(e) {
              return _this4.handleMouseDown('clockHandMinute', e);
            },
            ref: function ref(_ref2) {
              return _this4.clockHandMinute = _ref2;
            }
          }),
          _react2.default.createElement('div', {
            className: 'picky-date-time-clock__clock-hand picky-date-time-clock__clock-hand--hour',
            style: hourStyle,
            onMouseOver: function onMouseOver(e) {
              return _this4.onMouseOver('clockHandHour', e);
            },
            onMouseOut: function onMouseOut(e) {
              return _this4.onMouseOut('clockHandHour', e);
            },
            onMouseDown: function onMouseDown(e) {
              return _this4.handleMouseDown('clockHandHour', e);
            },
            ref: function ref(_ref3) {
              return _this4.clockHandHour = _ref3;
            }
          }),
          minutesItem,
          _react2.default.createElement('div', { className: 'picky-date-time-clock__clock-center', ref: function ref(_ref4) {
              return _this4.clockCenter = _ref4;
            } })
        ),
        _react2.default.createElement(
          'div',
          { className: 'picky-date-time-clock__inputer-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'picky-date-time-clock__inputer' },
            _react2.default.createElement('input', {
              className: 'picky-date-time-clock__input',
              value: clockHandHour.value + ':' + clockHandMinute.value + ':' + clockHandSecond.value + ' ' + meridiem,
              onFocus: function onFocus() {
                return _this4.onFocus();
              },
              onKeyDown: function onKeyDown(e) {
                return _this4.onKeyDown(e);
              },
              onChange: function onChange(e) {
                return _this4.changeTime(e);
              },
              onClick: function onClick(e) {
                return _this4.onClick(e);
              },
              onWheel: function onWheel(e) {
                return _this4.handleMouseWheel(e);
              },
              ref: function ref(_ref6) {
                return _this4.timeInput = _ref6;
              }
            }),
            _react2.default.createElement('span', {
              className: 'picky-date-time-clock__inline-span picky-date-time-clock__icon picky-date-time-clock__icon--remove_circle_outline picky-date-time-remove_circle_outline',
              onClick: function onClick() {
                return _this4.clear();
              },
              title: _locale.LOCALE[locale]['clear']
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'picky-date-time-clock__inline-div picky-date-time-clock__inline-div--middle' },
            _react2.default.createElement('span', {
              className: 'picky-date-time-clock__inline-span picky-date-time-clock__icon picky-date-time-clock__icon--schedule picky-date-time-schedule',
              onClick: this.timeinterval === false || defaultTimeObj ? function () {
                return _this4.reset(false);
              } : function () {
                return;
              },
              title: _locale.LOCALE[locale]['now']
            })
          ),
          defaultTimeObj ? _react2.default.createElement(
            'div',
            { className: 'picky-date-time-clock__inline-div picky-date-time-clock__inline-div--middle' },
            _react2.default.createElement('span', {
              className: 'picky-date-time-clock__inline-span picky-date-time-clock__icon picky-date-time-clock__icon--refresh picky-date-time-refresh',
              onClick: function onClick() {
                return _this4.defaultTime(true);
              },
              title: _locale.LOCALE[locale]['reset']
            })
          ) : ''
        )
      );
    }
  }]);

  return Clock;
}(_react2.default.Component);

Clock.propTypes = {
  size: _propTypes2.default.string,
  locale: _propTypes2.default.string,
  defaultTime: _propTypes2.default.string,
  onSecondChange: _propTypes2.default.func,
  onMinuteChange: _propTypes2.default.func,
  onHourChange: _propTypes2.default.func,
  onMeridiemChange: _propTypes2.default.func,
  onResetTime: _propTypes2.default.func,
  onClearTime: _propTypes2.default.func,
  onResetDefaultTime: _propTypes2.default.func
};

Clock.defaultProps = {
  size: 'm',
  locale: 'en-US',
  defaultTime: '',
  onSecondChange: function onSecondChange() {},
  onMinuteChange: function onMinuteChange() {},
  onHourChange: function onHourChange() {},
  onMeridiemChange: function onMeridiemChange() {},
  onResetTime: function onResetTime() {},
  onClearTime: function onClearTime() {},
  onResetDefaultTime: function onResetDefaultTime() {}
};

exports.default = Clock;