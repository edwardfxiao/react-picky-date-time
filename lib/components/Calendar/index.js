"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactAddonsCssTransitionGroup = _interopRequireDefault(require("react-addons-css-transition-group"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../utils.js");

var _locale = require("../locale.js");

var _constValue = require("../constValue");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var isValidDate = function isValidDate(value, userFormat) {
  userFormat = userFormat || 'mm/dd/yyyy';
  var delimiter = /[^mdy]/.exec(userFormat)[0];
  var theFormat = userFormat.split(delimiter);
  var theDate = value.split(delimiter);

  function isDate(date, format) {
    var m,
        d,
        y,
        i = 0,
        len = format.length,
        f;

    for (i; i < len; i++) {
      f = format[i];
      if (/m/.test(f)) m = date[i];
      if (/d/.test(f)) d = date[i];
      if (/y/.test(f)) y = date[i];
    }

    return m > 0 && m < 13 && y && y.length === 4 && d > 0 && // Is it a valid day of the month?
    d <= new Date(y, m, 0).getDate();
  }

  return isDate(theDate, theFormat);
};

var Calendar = /*#__PURE__*/function (_Component) {
  _inherits(Calendar, _Component);

  var _super = _createSuper(Calendar);

  function Calendar(props) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _super.call(this, props);
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    var dates = (0, _constValue.getDaysArray)(year, month);
    var defaultDateDate = date;
    var defaultDateMonth = month;
    var defaultDateYear = year;
    var isDefaultDateValid = false;

    if (isValidDate(props.defaultDate)) {
      var dateStr = props.defaultDate.split('/');
      defaultDateMonth = Number(dateStr[0]);
      defaultDateDate = Number(dateStr[1]);
      defaultDateYear = Number(dateStr[2]);
      isDefaultDateValid = true;
      dates = (0, _constValue.getDaysArray)(defaultDateYear, defaultDateMonth);
    } else {
      if (props.defaultDate != '') {
        console.error('The date you provide: ' + props.defaultDate + ' is not a valid date');
      }
    }

    _this.state = {
      isDefaultDateValid: isDefaultDateValid,
      dates: dates,
      pickedYearMonth: {
        year: defaultDateYear,
        month: defaultDateMonth,
        string: "".concat((0, _constValue.formatDateString)(defaultDateYear), "-").concat((0, _constValue.formatDateString)(defaultDateMonth))
      },
      defaultDate: {
        date: defaultDateDate,
        year: defaultDateYear,
        month: defaultDateMonth
      },
      pickedDateInfo: {
        date: defaultDateDate,
        year: defaultDateYear,
        month: defaultDateMonth
      },
      currentYearMonthDate: {
        date: date,
        year: year,
        month: month
      },
      direction: _constValue.NEXT_TRANSITION,
      yearSelectorPanelList: (0, _constValue.getYearSet)(defaultDateYear),
      yearSelectorPanel: defaultDateYear,
      showMask: false,
      showSelectorPanel: false
    };
    _this.pageClick = _this.pageClick.bind(_assertThisInitialized(_this));
    _this.pickDate = _this.pickDate.bind(_assertThisInitialized(_this));
    _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_this));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    _this.showSelectorPanel = _this.showSelectorPanel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Calendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (document.addEventListener) {
        window.addEventListener('mousedown', this.pageClick, false);
        window.addEventListener('touchend', this.pageClick, false);
      } else {
        document.attachEvent('onmousedown', this.pageClick);
        document.attachEvent('touchend', this.pageClick);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (document.removeEventListener) {
        window.removeEventListener('mousedown', this.pageClick, false);
        window.removeEventListener('touchend', this.pageClick, false);
      } else {
        document.detachEvent('onmousedown', this.pageClick);
        document.detachEvent('touchend', this.pageClick);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.pickedYearMonth != this.state.pickedYearMonth) {
        var dates = (0, _constValue.getDaysArray)(Number(this.state.pickedYearMonth.year), Number(this.state.pickedYearMonth.month));
        this.setState({
          dates: dates
        });
      }
    }
  }, {
    key: "pageClick",
    value: function pageClick() {
      if (this.mouseIsDownOnSelectorPanelClicker) {
        return;
      }

      this.setState({
        showSelectorPanel: false,
        showMask: false
      });
    }
  }, {
    key: "pickYear",
    value: function pickYear(year, direction) {
      if (direction == _constValue.PREV_TRANSITION) {
        year = Number(year) - 1;
      } else {
        year = Number(year) + 1;
      }

      var pickedYearMonth = this.state.pickedYearMonth;
      var _pickedYearMonth = pickedYearMonth,
          month = _pickedYearMonth.month;
      pickedYearMonth = _objectSpread({}, pickedYearMonth, {
        year: year,
        string: "".concat(year, "-").concat(month)
      });
      this.setState({
        pickedYearMonth: pickedYearMonth,
        direction: direction
      });
      this.props.onYearPicked({
        year: year
      });
    }
  }, {
    key: "pickMonth",
    value: function pickMonth(month, direction) {
      month = Number(month);
      var pickedYearMonth = this.state.pickedYearMonth;
      var _pickedYearMonth2 = pickedYearMonth,
          year = _pickedYearMonth2.year;

      if (direction == _constValue.PREV_TRANSITION) {
        if (month == 1) {
          month = 12;
          year = Number(year) - 1;
        } else {
          month = month - 1;
        }
      } else {
        if (month == 12) {
          month = 1;
          year = Number(year) + 1;
        } else {
          month = month + 1;
        }
      }

      month = (0, _constValue.formatDateString)(month);
      year = String(year);
      pickedYearMonth = _objectSpread({}, pickedYearMonth, {
        year: year,
        month: month,
        string: "".concat(year, "-").concat(month)
      });
      this.setState({
        pickedYearMonth: pickedYearMonth,
        direction: direction
      });
      this.props.onMonthPicked({
        year: year,
        month: month
      });
    }
  }, {
    key: "pickDate",
    value: function pickDate(pickedDate) {
      var _this$state = this.state,
          pickedDateInfo = _this$state.pickedDateInfo,
          pickedYearMonth = _this$state.pickedYearMonth;
      pickedDateInfo = _objectSpread({}, pickedDateInfo, {
        year: pickedYearMonth.year,
        month: (0, _constValue.formatDateString)(pickedYearMonth.month),
        date: (0, _constValue.formatDateString)(pickedDate)
      });
      this.setState({
        pickedDateInfo: pickedDateInfo
      });
      this.props.onDatePicked(pickedDateInfo);
    }
  }, {
    key: "changeSelectorPanelYearSet",
    value: function changeSelectorPanelYearSet(yearSelectorPanel, direction) {
      var yearSelectorPanelList = (0, _constValue.getYearSet)(yearSelectorPanel);
      this.setState({
        yearSelectorPanel: yearSelectorPanel,
        yearSelectorPanelList: yearSelectorPanelList,
        direction: direction
      });
    }
  }, {
    key: "showSelectorPanel",
    value: function showSelectorPanel() {
      var _this$state2 = this.state,
          showSelectorPanel = _this$state2.showSelectorPanel,
          showMask = _this$state2.showMask;
      this.setState({
        showSelectorPanel: !showSelectorPanel,
        showMask: !showMask
      });
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown() {
      this.mouseIsDownOnSelectorPanelClicker = true;
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      this.mouseIsDownOnSelectorPanelClicker = false;
    }
  }, {
    key: "reset",
    value: function reset() {
      var today = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$state3 = this.state,
          currentYearMonthDate = _this$state3.currentYearMonthDate,
          pickedDateInfo = _this$state3.pickedDateInfo,
          pickedYearMonth = _this$state3.pickedYearMonth,
          defaultDate = _this$state3.defaultDate;
      var year, month, date;

      if (!today) {
        year = defaultDate.year;
        month = defaultDate.month;
        date = defaultDate.date;
      } else {
        year = currentYearMonthDate.year;
        month = currentYearMonthDate.month;
        date = currentYearMonthDate.date;
      }

      var direction = _constValue.NEXT_TRANSITION;

      if (year < pickedYearMonth.year) {
        direction = _constValue.PREV_TRANSITION;
      } else if (year == pickedYearMonth.year) {
        if (month < pickedYearMonth.month) {
          direction = _constValue.PREV_TRANSITION;
        }
      }

      month = (0, _constValue.formatDateString)(month);
      date = (0, _constValue.formatDateString)(date);
      pickedDateInfo = _objectSpread({}, pickedDateInfo, {
        year: year,
        month: month,
        date: date
      });
      pickedYearMonth = _objectSpread({}, pickedYearMonth, {
        year: year,
        month: month,
        string: "".concat(year, "-").concat(month)
      });
      this.setState({
        pickedYearMonth: pickedYearMonth,
        pickedDateInfo: pickedDateInfo,
        yearSelectorPanel: year,
        direction: direction
      });

      if (!today) {
        this.props.onResetDefaultDate(pickedDateInfo);
      } else {
        this.props.onResetDate(pickedDateInfo);
      }

      this.changeSelectorPanelYearSet(year, direction);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          size = _this$props.size,
          locale = _this$props.locale,
          markedDates = _this$props.markedDates;
      var markedDatesHash = {};

      if (markedDates && (0, _utils.isValidDates)(markedDates)) {
        markedDates.forEach(function (d) {
          markedDatesHash[d] = true;
        });
      }

      var _this$state4 = this.state,
          isDefaultDateValid = _this$state4.isDefaultDateValid,
          dates = _this$state4.dates,
          direction = _this$state4.direction,
          showSelectorPanel = _this$state4.showSelectorPanel,
          yearSelectorPanelList = _this$state4.yearSelectorPanelList,
          yearSelectorPanel = _this$state4.yearSelectorPanel,
          currentYearMonthDate = _this$state4.currentYearMonthDate,
          pickedDateInfo = _this$state4.pickedDateInfo,
          pickedYearMonth = _this$state4.pickedYearMonth;
      var transitionContainerStyle;
      var content;

      if (dates.length) {
        var row = dates.length / _constValue.WEEK_NUMBER;
        var rowIndex = 1;
        var rowObj = {};
        dates.map(function (item, key) {
          if (key < rowIndex * _constValue.WEEK_NUMBER) {
            if (!rowObj[rowIndex]) {
              rowObj[rowIndex] = [];
            }

            rowObj[rowIndex].push(item);
          } else {
            rowIndex = rowIndex + 1;

            if (!rowObj[rowIndex]) {
              rowObj[rowIndex] = [];
            }

            rowObj[rowIndex].push(item);
          }
        });
        content = /*#__PURE__*/_react["default"].createElement(CalendarBody, {
          size: size,
          data: rowObj,
          currentYearMonthDate: currentYearMonthDate,
          pickedYearMonth: pickedYearMonth,
          pickedDateInfo: pickedDateInfo,
          onClick: this.pickDate,
          key: pickedYearMonth.string,
          markedDatesHash: markedDatesHash
        });

        if (row == 6) {
          var height = 385;

          if (size == 'l') {
            height = 500;
          }

          if (size == 's') {
            height = 285;
          }

          if (size == 'xs') {
            height = 235;
          }

          transitionContainerStyle = {
            height: "".concat(height, "px")
          };
        }
      }

      var captionHtml;
      captionHtml = _locale.LOCALE[locale].weeks.map(function (item, key) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "picky-date-time-calendar__table-caption picky-date-time-calendar__table-cel no-border ".concat(size),
          key: key
        }, item);
      });
      var selectorPanelClass = (0, _utils.cx)('picky-date-time-dropdown', 'picky-date-time-calendar__selector-panel', showSelectorPanel && 'visible');

      var selectorPanelMonthHtml = _locale.LOCALE[locale].months.map(function (item, key) {
        var itemMonth = key + 1;
        var monthItemClass = (0, _utils.cx)('picky-date-time-dropdown-calendar__month-item', itemMonth == pickedYearMonth.month && 'active');
        var month = itemMonth - 1;
        var direction = _constValue.NEXT_TRANSITION;

        if (itemMonth < pickedYearMonth.month) {
          direction = _constValue.PREV_TRANSITION;
          month = itemMonth + 1;
        }

        return /*#__PURE__*/_react["default"].createElement("div", {
          className: monthItemClass,
          onClick: itemMonth !== pickedYearMonth.month ? function () {
            return _this2.pickMonth(month, direction);
          } : function () {
            return;
          },
          key: key
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: size
        }, item));
      });

      var selectorPanelYearHtml;

      if (yearSelectorPanelList.length) {
        selectorPanelYearHtml = yearSelectorPanelList.map(function (item, key) {
          var yearItemClass = (0, _utils.cx)('picky-date-time-dropdown-calendar__year-item', item == pickedYearMonth.year && 'active');
          var year = item - 1;
          var direction = _constValue.NEXT_TRANSITION;

          if (item < pickedYearMonth.year) {
            direction = _constValue.PREV_TRANSITION;
            year = item + 1;
          }

          return /*#__PURE__*/_react["default"].createElement("div", {
            className: yearItemClass,
            onClick: item !== pickedYearMonth.year ? function () {
              return _this2.pickYear(year, direction);
            } : function () {
              return;
            },
            key: key
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: size
          }, item));
        });
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-calendar"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-calendar__header"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(selectorPanelClass),
        ref: function ref(_ref) {
          return _this2.monthSelectorPanel = _ref;
        },
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        onTouchEnd: this.onMouseDown,
        onTouchCancel: this.onMouseUp
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-dropdown-calendar__menu ".concat([size])
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-dropdown-calendar__month"
      }, selectorPanelMonthHtml), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          height: '10px'
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time__col picky-date-time__col-0-5"
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        style: {
          verticalAlign: 'middle'
        },
        onClick: function onClick() {
          return _this2.changeSelectorPanelYearSet(yearSelectorPanel - _constValue.SELECTOR_YEAR_SET_NUMBER, _constValue.PREV_TRANSITION);
        }
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time__col picky-date-time__col-9"
      }, /*#__PURE__*/_react["default"].createElement(_reactAddonsCssTransitionGroup["default"], {
        className: "picky-date-time-calendar__selector-panel-year-set-container",
        transitionName: direction == _constValue.NEXT_TRANSITION ? 'forward' : 'backward',
        transitionAppearTimeout: 500,
        transitionEnterTimeout: 300,
        transitionLeaveTimeout: 300
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-dropdown-calendar__year",
        key: yearSelectorPanelList
      }, selectorPanelYearHtml))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time__col picky-date-time__col-0-5"
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        style: {
          verticalAlign: 'middle'
        },
        onClick: function onClick() {
          return _this2.changeSelectorPanelYearSet(yearSelectorPanel + _constValue.SELECTOR_YEAR_SET_NUMBER, _constValue.NEXT_TRANSITION);
        }
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      }))))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time__col picky-date-time__col-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time__col picky-date-time-calendar__previous",
        onClick: function onClick() {
          return _this2.pickYear(pickedYearMonth.year, _constValue.PREV_TRANSITION);
        }
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        style: {
          verticalAlign: 'middle'
        }
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        fill: "none",
        d: "M24 24H0V0h24v24z"
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time__col picky-date-time-calendar__sub-previous",
        onClick: function onClick() {
          return _this2.pickMonth(pickedYearMonth.month, _constValue.PREV_TRANSITION);
        }
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        style: {
          verticalAlign: 'middle'
        }
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      })))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time__col picky-date-time__col-6"
      }, /*#__PURE__*/_react["default"].createElement(_reactAddonsCssTransitionGroup["default"], {
        className: "picky-date-time-calendar__title-container",
        transitionName: direction == _constValue.NEXT_TRANSITION ? 'forward' : 'backward',
        transitionAppearTimeout: 500,
        transitionEnterTimeout: 300,
        transitionLeaveTimeout: 300
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-calendar__title",
        key: pickedYearMonth.string
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "picky-date-time-calendar__clicker",
        onClick: this.showSelectorPanel,
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "picky-date-time-calendar__clicker"
      }, /*#__PURE__*/_react["default"].createElement("span", null, "".concat(_locale.LOCALE[locale].months[pickedYearMonth.month - 1]))), /*#__PURE__*/_react["default"].createElement("span", null, "\xA0"), /*#__PURE__*/_react["default"].createElement("span", {
        className: "picky-date-time-calendar__clicker"
      }, /*#__PURE__*/_react["default"].createElement("span", null, "".concat(pickedYearMonth.year))))))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time__col picky-date-time__col-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time__col picky-date-time-calendar__next",
        onClick: function onClick() {
          return _this2.pickMonth(pickedYearMonth.month, _constValue.NEXT_TRANSITION);
        }
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        style: {
          verticalAlign: 'middle'
        }
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time__col picky-date-time-calendar__sub-next",
        onClick: function onClick() {
          return _this2.pickYear(pickedYearMonth.year, _constValue.NEXT_TRANSITION);
        }
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        style: {
          verticalAlign: 'middle'
        }
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        fill: "none",
        d: "M0 0h24v24H0V0z"
      }))))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-calendar__content"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-calendar__table"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-calendar__table-row"
      }, captionHtml)), /*#__PURE__*/_react["default"].createElement(_reactAddonsCssTransitionGroup["default"], {
        className: "picky-date-time-calendar__body-container ".concat(size),
        transitionName: direction == _constValue.NEXT_TRANSITION ? 'forward' : 'backward',
        transitionAppearTimeout: 500,
        transitionEnterTimeout: 300,
        transitionLeaveTimeout: 300,
        style: transitionContainerStyle
      }, content)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-calendar__button picky-date-time-calendar__today",
        onClick: function onClick() {
          return _this2.reset(true);
        }
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "picky-date-time-calendar__inline-span"
      }, _locale.LOCALE[locale]['today']), /*#__PURE__*/_react["default"].createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        height: "15",
        viewBox: "0 0 24 24",
        width: "15",
        style: {
          verticalAlign: 'middle'
        }
      }, /*#__PURE__*/_react["default"].createElement("path", {
        fill: "#868e96",
        d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      }))), isDefaultDateValid ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-calendar__button picky-date-time-calendar__default-day",
        onClick: function onClick() {
          return _this2.reset(false);
        }
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "picky-date-time-calendar__inline-span"
      }, _locale.LOCALE[locale]['reset-date']), /*#__PURE__*/_react["default"].createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        height: "15",
        viewBox: "0 0 24 24",
        width: "15",
        style: {
          verticalAlign: 'middle'
        }
      }, /*#__PURE__*/_react["default"].createElement("path", {
        fill: "#868e96",
        d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      }))) : "");
    }
  }]);

  return Calendar;
}(_react.Component);

var CalendarBody = /*#__PURE__*/function (_Component2) {
  _inherits(CalendarBody, _Component2);

  var _super2 = _createSuper(CalendarBody);

  function CalendarBody() {
    _classCallCheck(this, CalendarBody);

    return _super2.apply(this, arguments);
  }

  _createClass(CalendarBody, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          size = _this$props2.size,
          data = _this$props2.data,
          currentYearMonthDate = _this$props2.currentYearMonthDate,
          pickedDateInfo = _this$props2.pickedDateInfo,
          pickedYearMonth = _this$props2.pickedYearMonth,
          onClick = _this$props2.onClick,
          markedDatesHash = _this$props2.markedDatesHash;
      var year = currentYearMonthDate.year,
          month = currentYearMonthDate.month,
          date = currentYearMonthDate.date;
      var pickedDateYear = pickedDateInfo.year;
      var pickedDateMonth = pickedDateInfo.month;
      var pickedDate = pickedDateInfo.date;
      var pickedMonth = pickedYearMonth.month;
      var content = Object.keys(data).map(function (key) {
        var colHtml;

        if (data[key].length) {
          colHtml = data[key].map(function (item, key) {
            var isPicked = pickedDate == item.name && pickedDateMonth == item.month && pickedDateYear == item.year;
            var isDisabled = pickedMonth != item.month;
            var datePickerItemClass = (0, _utils.cx)('picky-date-time-calendar__table-cel', 'picky-date-time-calendar__date-item', size, isDisabled && 'disabled', date == item.name && month == item.month && year == item.year && 'today', markedDatesHash["".concat(item.month, "/").concat(item.name, "/").concat(item.year)] && 'marked', isPicked && 'active');
            return /*#__PURE__*/_react["default"].createElement(CalendarItem, {
              key: key,
              item: item,
              onClick: onClick,
              isPicked: isPicked,
              isDisabled: isDisabled,
              datePickerItemClass: datePickerItemClass
            });
          });
        }

        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "picky-date-time-calendar__table-row",
          key: key
        }, colHtml);
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "picky-date-time-calendar__table slide"
      }, content);
    }
  }]);

  return CalendarBody;
}(_react.Component);

var CalendarItem = /*#__PURE__*/function (_Component3) {
  _inherits(CalendarItem, _Component3);

  var _super3 = _createSuper(CalendarItem);

  function CalendarItem(props) {
    var _this3;

    _classCallCheck(this, CalendarItem);

    _this3 = _super3.call(this, props);
    _this3.onClick = _this3.onClick.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(CalendarItem, [{
    key: "onClick",
    value: function onClick() {
      this.props.onClick(this.props.item.name);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          item = _this$props3.item,
          isPicked = _this$props3.isPicked,
          isDisabled = _this$props3.isDisabled,
          datePickerItemClass = _this$props3.datePickerItemClass;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(datePickerItemClass),
        onClick: !isDisabled ? this.onClick : function () {
          return;
        }
      }, item.name, isPicked ? /*#__PURE__*/_react["default"].createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        height: "15",
        viewBox: "0 0 24 24",
        width: "15"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      }), /*#__PURE__*/_react["default"].createElement("path", {
        d: "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
      })) : '');
    }
  }]);

  return CalendarItem;
}(_react.Component);

CalendarItem.propTypes = {
  item: _propTypes["default"].object,
  isPicked: _propTypes["default"].bool,
  isDisabled: _propTypes["default"].bool,
  datePickerItemClass: _propTypes["default"].string,
  onClick: _propTypes["default"].func
};
CalendarItem.defaultProps = {
  item: {},
  isPicked: false,
  isDisabled: false,
  datePickerItemClass: '',
  onClick: function onClick() {}
};
CalendarBody.propTypes = {
  size: _propTypes["default"].string,
  data: _propTypes["default"].object,
  currentYearMonthDate: _propTypes["default"].object,
  pickedDateInfo: _propTypes["default"].object,
  pickedYearMonth: _propTypes["default"].object,
  onClick: _propTypes["default"].func
};
CalendarBody.defaultProps = {
  size: 'm',
  data: {},
  currentYearMonthDate: {},
  pickedDateInfo: {},
  pickedYearMonth: {},
  onClick: function onClick() {}
};
Calendar.propTypes = {
  size: _propTypes["default"].string,
  locale: _propTypes["default"].string,
  defaultDate: _propTypes["default"].string,
  onYearPicked: _propTypes["default"].func,
  onMonthPicked: _propTypes["default"].func,
  onDatePicked: _propTypes["default"].func,
  onResetDate: _propTypes["default"].func,
  onResetDefaultDate: _propTypes["default"].func
};
Calendar.defaultProps = {
  size: 'm',
  locale: 'en-US',
  defaultDate: '',
  onYearPicked: function onYearPicked() {},
  onMonthPicked: function onMonthPicked() {},
  onDatePicked: function onDatePicked() {},
  onResetDate: function onResetDate() {},
  onResetDefaultDate: function onResetDefaultDate() {}
};
var _default = Calendar;
exports["default"] = _default;