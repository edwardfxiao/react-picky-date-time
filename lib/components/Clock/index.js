"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactAddonsUpdate = _interopRequireDefault(require("react-addons-update"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _utils = require("../utils.js");

var _locale = require("../locale.js");

var _constValue = require("../constValue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
  return {
    year: year,
    month: month,
    date: date,
    hour: hour,
    minute: minute,
    second: second,
    meridiem: meridiem,
    hourText: hourText
  };
};

var getInputCharSkipNum = function getInputCharSkipNum(pos) {
  var num = 1;

  if (_constValue.TIME_JUMP_CHAR_POS_LIST.indexOf(pos) != -1) {
    num = 2;
  }

  return num;
};

var Clock = /*#__PURE__*/function (_React$Component) {
  _inherits(Clock, _React$Component);

  var _super = _createSuper(Clock);

  function Clock(props) {
    var _this;

    _classCallCheck(this, Clock);

    _this = _super.call(this, props);
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
      slectionRange: {
        start: 0,
        end: 0
      }
    };
    _this.handleMouseDown = _this.handleMouseDown.bind(_assertThisInitialized(_this));
    _this.handleMouseMove = _this.handleMouseMove.bind(_assertThisInitialized(_this));
    _this.handleMouseUp = _this.handleMouseUp.bind(_assertThisInitialized(_this));
    _this.initCoordinates = _this.initCoordinates.bind(_assertThisInitialized(_this));
    _this.updateClock = _this.updateClock.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Clock, [{
    key: "initCoordinates",
    value: function initCoordinates() {
      if (this.clockCenter == null) {
        return;
      }

      var centerPoint = _reactDom["default"].findDOMNode(this.clockCenter);

      var centerPointPos = centerPoint.getBoundingClientRect();
      var top = centerPointPos.top,
          left = centerPointPos.left,
          height = centerPointPos.height,
          width = centerPointPos.width;
      this.originX = left + width / 2;
      this.originY = top + height / 2;
    }
  }, {
    key: "componentDidMount",
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

      if (!this.state.defaultTimeObj && !self.PRERENDER) {
        this.initializeClock();
      }
    }
  }, {
    key: "componentDidUpdate",
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
    key: "componentWillUnmount",
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
    key: "updateClockHandObj",
    value: function updateClockHandObj(o, value, degree, startAngle, angle) {
      var isMouseOver = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var isDragging = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      o = _objectSpread({}, o, {
        value: value,
        degree: degree,
        startAngle: startAngle,
        angle: angle,
        isMouseOver: isMouseOver,
        isDragging: isDragging
      });
      return o;
    }
  }, {
    key: "initializeClock",
    value: function initializeClock() {
      this.timeinterval = setInterval(this.updateClock, 1000);
    }
  }, {
    key: "updateClock",
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
    key: "_clearInterval",
    value: function _clearInterval() {
      clearInterval(this.timeinterval);
      this.timeinterval = false;
    }
  }, {
    key: "resetClockHandObj",
    value: function resetClockHandObj() {
      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var defaultTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$state = this.state,
          clockHandSecond = _this$state.clockHandSecond,
          clockHandMinute = _this$state.clockHandMinute,
          clockHandHour = _this$state.clockHandHour;
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
      return {
        clockHandSecond: clockHandSecond,
        clockHandMinute: clockHandMinute,
        clockHandHour: clockHandHour,
        meridiem: meridiem
      };
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      this._clearInterval();
    }
  }, {
    key: "onClick",
    value: function onClick() {}
  }, {
    key: "handleMouseWheel",
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
    key: "onKeyDown",
    value: function onKeyDown(e) {
      var _this3 = this;

      this.resetting = false;
      var keyCode = e.keyCode;
      var el = this.timeInput;
      var pos = {
        start: el.selectionStart,
        end: el.selectionEnd
      };
      var key = _constValue.KEY_CODE[keyCode];

      if (typeof key == 'undefined') {
        this.setState({
          slectionRange: pos
        });
        return;
      }

      var range = {
        start: 0,
        end: 0
      };
      var elObj, refName;
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

      var newValue;

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
            start,
            end;
        var skipNum = getInputCharSkipNum(pos.start);

        if (key == 'Backspace') {
          skipNum = -skipNum;
          number = 0;
          start = pos.start + skipNum;
          end = pos.start + skipNum;

          if (!elObj.value) {
            this.setState({
              slectionRange: {
                start: start,
                end: end
              }
            });
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
      var slectionRange = {
        start: range.start,
        end: range.end
      };

      if (!isNaN(newValue) && refName != 'meridiem') {
        var _this$setState;

        var newDegree;

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

        elObj = _objectSpread({}, elObj, {
          value: newValue,
          degree: newDegree,
          startAngle: newDegree,
          angle: newDegree
        });
        this.setState((_this$setState = {}, _defineProperty(_this$setState, refName, elObj), _defineProperty(_this$setState, "slectionRange", slectionRange), _this$setState));
      }

      if (key == 'ArrowUp' || key == 'ArrowDown') {
        if (refName == 'meridiem') {
          var _this$setState2;

          var meridiem = 'AM';

          if (elObj == 'AM') {
            meridiem = 'PM';
          }

          elObj = meridiem;
          this.setState((_this$setState2 = {}, _defineProperty(_this$setState2, refName, elObj), _defineProperty(_this$setState2, "slectionRange", slectionRange), _this$setState2));
        }
      }

      if (!(key == 'ArrowLeft' || key == 'ArrowRight')) {
        e.preventDefault();
      }
    }
  }, {
    key: "onMouseOver",
    value: function onMouseOver(refName) {
      var elObj = this.state[refName];
      elObj = _objectSpread({}, elObj, {
        isMouseOver: true
      });
      this.setState(_defineProperty({}, refName, elObj));
    }
  }, {
    key: "onMouseOut",
    value: function onMouseOut(refName) {
      var elObj = this.state[refName];
      elObj = _objectSpread({}, elObj, {
        isMouseOver: false
      });
      this.setState(_defineProperty({}, refName, elObj));
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(refName, e) {
      var elObj = this.state[refName];
      var x = e.clientX - this.originX;
      var y = e.clientY - this.originY;
      var startAngle = _constValue.R2D * Math.atan2(y, x);
      elObj = _objectSpread({}, elObj, {
        isDragging: true,
        startAngle: startAngle
      });
      this.setState(_defineProperty({}, refName, elObj));
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(e) {
      var _this$state2 = this.state,
          clockHandSecond = _this$state2.clockHandSecond,
          clockHandMinute = _this$state2.clockHandMinute,
          clockHandHour = _this$state2.clockHandHour;

      if (clockHandSecond.isDragging || clockHandMinute.isDragging || clockHandHour.isDragging) {
        this._clearInterval();

        var refName;
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
        } // elObj = update(elObj, {
        //   value: { $set: value },
        //   degree: { $set: degree },
        // });


        elObj = _objectSpread({}, elObj, {
          value: value,
          degree: degree
        });
        this.setState(_defineProperty({}, refName, elObj));
      }
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp() {
      var _this$state3 = this.state,
          clockHandSecond = _this$state3.clockHandSecond,
          clockHandMinute = _this$state3.clockHandMinute,
          clockHandHour = _this$state3.clockHandHour;

      if (clockHandSecond.isDragging || clockHandMinute.isDragging || clockHandHour.isDragging) {
        var clockHandSecondDegree = this.state.clockHandSecond.degree;
        var clockHandMinuteDegree = this.state.clockHandMinute.degree;
        var clockHandHourDegree = this.state.clockHandHour.degree; // clockHandSecond = update(clockHandSecond, {
        //   isDragging: { $set: false },
        //   angle: { $set: clockHandSecondDegree },
        // });

        clockHandSecond = _objectSpread({}, clockHandSecond, {
          isDragging: false,
          angle: clockHandSecondDegree
        }); // clockHandMinute = update(clockHandMinute, {
        //   isDragging: { $set: false },
        //   angle: { $set: clockHandMinuteDegree },
        // });

        clockHandMinute = _objectSpread({}, clockHandMinute, {
          isDragging: false,
          angle: clockHandMinuteDegree
        }); // clockHandHour = update(clockHandHour, {
        //   isDragging: { $set: false },
        //   angle: { $set: clockHandHourDegree },
        // });

        clockHandHour = _objectSpread({}, clockHandHour, {
          isDragging: false,
          angle: clockHandHourDegree
        });
        this.setState({
          clockHandSecond: clockHandSecond,
          clockHandMinute: clockHandMinute,
          clockHandHour: clockHandHour
        });
      }
    }
  }, {
    key: "changeTime",
    value: function changeTime(e) {
      e.stopPropagation();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.resetting = true;
      var res = this.resetClockHandObj();
      this.initializeClock();
      this.props.onResetTime(res);
    }
  }, {
    key: "defaultTime",
    value: function defaultTime() {
      this.resetting = true;
      var res = this.resetClockHandObj(false, true);

      this._clearInterval();

      this.props.onResetDefaultTime(res);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.resetting = true;
      var res = this.resetClockHandObj(true);

      this._clearInterval();

      this.props.onClearTime(res);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          size = _this$props.size,
          locale = _this$props.locale;
      var _this$state4 = this.state,
          defaultTimeObj = _this$state4.defaultTimeObj,
          clockHandSecond = _this$state4.clockHandSecond,
          clockHandMinute = _this$state4.clockHandMinute,
          clockHandHour = _this$state4.clockHandHour,
          meridiem = _this$state4.meridiem;
      var secondStyle = {
        transform: "translate(".concat(SECONDS_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandSecond.degree, "deg) translate(").concat(SECONDS_TRANSLATE_SECOND_SIZE[size], ")"),
        WebkitTransform: "translate(".concat(SECONDS_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandSecond.degree, "deg) translate(").concat(SECONDS_TRANSLATE_SECOND_SIZE[size], ")"),
        MozTransform: "translate(".concat(SECONDS_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandSecond.degree, "deg) translate(").concat(SECONDS_TRANSLATE_SECOND_SIZE[size], ")"),
        msTransform: "translate(".concat(SECONDS_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandSecond.degree, "deg) translate(").concat(SECONDS_TRANSLATE_SECOND_SIZE[size], ")"),
        OTransform: "translate(".concat(SECONDS_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandSecond.degree, "deg) translate(").concat(SECONDS_TRANSLATE_SECOND_SIZE[size], ")")
      };
      var minuteStyle = {
        transform: "translate(".concat(MINUTES_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandMinute.degree, "deg) translate(").concat(MINUTES_TRANSLATE_SECOND_SIZE[size], ")"),
        WebkitTransform: "translate(".concat(MINUTES_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandMinute.degree, "deg) translate(").concat(MINUTES_TRANSLATE_SECOND_SIZE, ")"),
        MozTransform: "translate(".concat(MINUTES_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandMinute.degree, "deg) translate(").concat(MINUTES_TRANSLATE_SECOND_SIZE[size], ")"),
        msTransform: "translate(".concat(MINUTES_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandMinute.degree, "deg) translate(").concat(MINUTES_TRANSLATE_SECOND_SIZE[size], ")"),
        OTransform: "translate(".concat(MINUTES_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandMinute.degree, "deg) translate(").concat(MINUTES_TRANSLATE_SECOND_SIZE[size], ")")
      };
      var hourStyle = {
        transform: "translate(".concat(HOURS_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandHour.degree, "deg) translate(").concat(HOURS_TRANSLATE_SECOND_SIZE[size], ")"),
        WebkitTransform: "translate(".concat(HOURS_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandHour.degree, "deg) translate(").concat(HOURS_TRANSLATE_SECOND_SIZE[size], ")"),
        MozTransform: "translate(".concat(HOURS_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandHour.degree, "deg) translate(").concat(HOURS_TRANSLATE_SECOND_SIZE[size], ")"),
        msTransform: "translate(".concat(HOURS_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandHour.degree, "deg) translate(").concat(HOURS_TRANSLATE_SECOND_SIZE[size], ")"),
        OTransform: "translate(".concat(HOURS_TRANSLATE_FIRST_SIZE[size], ") rotate(").concat(clockHandHour.degree, "deg) translate(").concat(HOURS_TRANSLATE_SECOND_SIZE[size], ")")
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

        var minutesItemClass = (0, _utils.cx)('picky-date-time-clock__clock-minute', isQuarter && 'picky-date-time-clock__clock-minute--quarter', isFive && 'picky-date-time-clock__clock-minute--five');
        var degree = i * 6 + 180;
        var minutesItemStyle = {
          transform: "translate(".concat(translateFirst, ") rotate(").concat(degree, "deg) translate(").concat(translateSecond, ")"),
          WebkitTransform: "translate(".concat(translateFirst, ") rotate(").concat(degree, "deg) translate(").concat(translateSecond, ")"),
          MozTransform: "translate(".concat(translateFirst, ") rotate(").concat(degree, "deg) translate(").concat(translateSecond, ")"),
          msTransform: "translate(".concat(translateFirst, ") rotate(").concat(degree, "deg) translate(").concat(translateSecond, ")"),
          OTransform: "translate(".concat(translateFirst, ") rotate(").concat(degree, "deg) translate(").concat(translateSecond, ")")
        };
        minutesItem.push( /*#__PURE__*/_react["default"].createElement("div", {
          key: i,
          className: minutesItemClass,
          style: minutesItemStyle
        }));
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-clock ".concat(size),
        ref: function ref(_ref7) {
          return _this4.clock = _ref7;
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-clock__circle ".concat(size),
        ref: function ref(_ref5) {
          return _this4.clockCircle = _ref5;
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-clock__clock-hand picky-date-time-clock__clock-hand--second",
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
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-clock__clock-hand picky-date-time-clock__clock-hand--minute",
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
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-clock__clock-hand picky-date-time-clock__clock-hand--hour",
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
      }), minutesItem, /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-clock__clock-center",
        ref: function ref(_ref4) {
          return _this4.clockCenter = _ref4;
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-clock__inputer-wrapper"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-clock__inputer"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        className: "picky-date-time-clock__input",
        value: "".concat(clockHandHour.value, ":").concat(clockHandMinute.value, ":").concat(clockHandSecond.value, " ").concat(meridiem),
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
      }), /*#__PURE__*/_react["default"].createElement("svg", {
        className: "picky-date-time-clock__inline-span picky-date-time-clock__icon--remove_circle_outline picky-date-time-remove_circle_outline",
        xmlns: "http://www.w3.org/2000/svg",
        height: "15",
        viewBox: "0 0 24 24",
        width: "15",
        onClick: function onClick() {
          return _this4.clear();
        },
        title: _locale.LOCALE[locale]['clear']
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        fill: "#868e96",
        d: "M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-clock__inline-div picky-date-time-clock__inline-div--middle"
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        className: "picky-date-time-clock__icon picky-date-time-clock__icon--schedule picky-date-time-schedule",
        xmlns: "http://www.w3.org/2000/svg",
        height: "15",
        viewBox: "0 0 24 24",
        width: "15",
        onClick: this.timeinterval === false || defaultTimeObj ? function () {
          return _this4.reset(false);
        } : function () {
          return;
        },
        title: _locale.LOCALE[locale]['now'],
        style: {
          verticalAlign: 'middle'
        }
      }, /*#__PURE__*/_react["default"].createElement("path", {
        fill: "#868e96",
        d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        fill: "#868e96",
        d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"
      }))), defaultTimeObj ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-clock__inline-div picky-date-time-clock__inline-div--middle"
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        height: "15",
        viewBox: "0 0 24 24",
        width: "15",
        style: {
          verticalAlign: 'middle'
        },
        onClick: function onClick() {
          return _this4.defaultTime(true);
        },
        title: _locale.LOCALE[locale]['reset']
      }, /*#__PURE__*/_react["default"].createElement("path", {
        fill: "#868e96",
        d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      }))) : ""));
    }
  }]);

  return Clock;
}(_react["default"].Component);

Clock.propTypes = {
  size: _propTypes["default"].string,
  locale: _propTypes["default"].string,
  defaultTime: _propTypes["default"].string,
  onSecondChange: _propTypes["default"].func,
  onMinuteChange: _propTypes["default"].func,
  onHourChange: _propTypes["default"].func,
  onMeridiemChange: _propTypes["default"].func,
  onResetTime: _propTypes["default"].func,
  onClearTime: _propTypes["default"].func,
  onResetDefaultTime: _propTypes["default"].func
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
var _default = Clock;
exports["default"] = _default;