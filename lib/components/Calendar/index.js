'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _locale = require('../locale.js');

var _constValue = require('../constValue');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isValidDate = function isValidDate(value, userFormat) {
  userFormat = userFormat || 'mm/dd/yyyy';
  var delimiter = /[^mdy]/.exec(userFormat)[0];
  var theFormat = userFormat.split(delimiter);
  var theDate = value.split(delimiter);

  function isDate(date, format) {
    var m = void 0,
        d = void 0,
        y = void 0,
        i = 0,
        len = format.length,
        f = void 0;
    for (i; i < len; i++) {
      f = format[i];
      if (/m/.test(f)) m = date[i];
      if (/d/.test(f)) d = date[i];
      if (/y/.test(f)) y = date[i];
    }
    return m > 0 && m < 13 && y && y.length === 4 && d > 0 &&
    // Is it a valid day of the month?
    d <= new Date(y, m, 0).getDate();
  }
  return isDate(theDate, theFormat);
};

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

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
        string: (0, _constValue.formatDateString)(defaultDateYear) + '-' + (0, _constValue.formatDateString)(defaultDateMonth)
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

    _this.pageClick = _this.pageClick.bind(_this);
    _this.pickDate = _this.pickDate.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.showSelectorPanel = _this.showSelectorPanel.bind(_this);
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentDidMount',
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
    key: 'componentWillUnmount',
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
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.pickedYearMonth != this.state.pickedYearMonth) {
        var dates = (0, _constValue.getDaysArray)(Number(this.state.pickedYearMonth.year), Number(this.state.pickedYearMonth.month));
        this.setState({ dates: dates });
      }
    }
  }, {
    key: 'pageClick',
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
    key: 'pickYear',
    value: function pickYear(year, direction) {
      if (direction == _constValue.PREV_TRANSITION) {
        year = year - 1;
      } else {
        year = year + 1;
      }
      var pickedYearMonth = this.state.pickedYearMonth;
      var _pickedYearMonth = pickedYearMonth,
          month = _pickedYearMonth.month;

      pickedYearMonth = (0, _reactAddonsUpdate2.default)(pickedYearMonth, {
        year: { $set: year },
        string: { $set: year + '-' + month }
      });
      this.setState({
        pickedYearMonth: pickedYearMonth,
        direction: direction
      });
      this.props.onYearPicked({ year: year });
    }
  }, {
    key: 'pickMonth',
    value: function pickMonth(month, direction) {
      month = Number(month);
      var pickedYearMonth = this.state.pickedYearMonth;
      var _pickedYearMonth2 = pickedYearMonth,
          year = _pickedYearMonth2.year;

      if (direction == _constValue.PREV_TRANSITION) {
        if (month == 1) {
          month = 12;
          year = year - 1;
        } else {
          month = month - 1;
        }
      } else {
        if (month == 12) {
          month = 1;
          year = year + 1;
        } else {
          month = month + 1;
        }
      }
      month = (0, _constValue.formatDateString)(month);
      year = String(year);
      pickedYearMonth = (0, _reactAddonsUpdate2.default)(pickedYearMonth, {
        month: { $set: month },
        string: { $set: year + '-' + month }
      });
      this.setState({
        pickedYearMonth: pickedYearMonth,
        direction: direction
      });
      this.props.onMonthPicked({ year: year, month: month });
    }
  }, {
    key: 'pickDate',
    value: function pickDate(pickedDate) {
      var _state = this.state,
          pickedDateInfo = _state.pickedDateInfo,
          pickedYearMonth = _state.pickedYearMonth;

      pickedDateInfo = (0, _reactAddonsUpdate2.default)(pickedDateInfo, {
        year: { $set: pickedYearMonth.year },
        month: { $set: (0, _constValue.formatDateString)(pickedYearMonth.month) },
        date: { $set: (0, _constValue.formatDateString)(pickedDate) }
      });
      this.setState({ pickedDateInfo: pickedDateInfo });
      this.props.onDatePicked(pickedDateInfo);
    }
  }, {
    key: 'changeSelectorPanelYearSet',
    value: function changeSelectorPanelYearSet(yearSelectorPanel, direction) {
      var yearSelectorPanelList = (0, _constValue.getYearSet)(yearSelectorPanel);
      this.setState({ yearSelectorPanel: yearSelectorPanel, yearSelectorPanelList: yearSelectorPanelList, direction: direction });
    }
  }, {
    key: 'showSelectorPanel',
    value: function showSelectorPanel() {
      var _state2 = this.state,
          showSelectorPanel = _state2.showSelectorPanel,
          showMask = _state2.showMask;

      this.setState({
        showSelectorPanel: !showSelectorPanel,
        showMask: !showMask
      });
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown() {
      this.mouseIsDownOnSelectorPanelClicker = true;
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp() {
      this.mouseIsDownOnSelectorPanelClicker = false;
    }
  }, {
    key: 'reset',
    value: function reset() {
      var today = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _state3 = this.state,
          currentYearMonthDate = _state3.currentYearMonthDate,
          pickedDateInfo = _state3.pickedDateInfo,
          pickedYearMonth = _state3.pickedYearMonth,
          defaultDate = _state3.defaultDate;

      var year = void 0,
          month = void 0,
          date = void 0;
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
      pickedDateInfo = (0, _reactAddonsUpdate2.default)(pickedDateInfo, {
        year: { $set: year },
        month: { $set: month },
        date: { $set: date }
      });
      pickedYearMonth = (0, _reactAddonsUpdate2.default)(pickedYearMonth, {
        year: { $set: year },
        month: { $set: month },
        string: { $set: year + '-' + month }
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
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          size = _props.size,
          locale = _props.locale;
      var _state4 = this.state,
          isDefaultDateValid = _state4.isDefaultDateValid,
          dates = _state4.dates,
          direction = _state4.direction,
          showSelectorPanel = _state4.showSelectorPanel,
          yearSelectorPanelList = _state4.yearSelectorPanelList,
          yearSelectorPanel = _state4.yearSelectorPanel,
          currentYearMonthDate = _state4.currentYearMonthDate,
          pickedDateInfo = _state4.pickedDateInfo,
          pickedYearMonth = _state4.pickedYearMonth;

      var transitionContainerStyle = void 0;
      var content = void 0;

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
        content = _react2.default.createElement(CalendarBody, {
          size: size,
          data: rowObj,
          currentYearMonthDate: currentYearMonthDate,
          pickedYearMonth: pickedYearMonth,
          pickedDateInfo: pickedDateInfo,
          onClick: this.pickDate,
          key: pickedYearMonth.string
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
            height: height + 'px'
          };
        }
      }
      var captionHtml = void 0;
      captionHtml = _locale.LOCALE[locale].weeks.map(function (item, key) {
        return _react2.default.createElement(
          'div',
          { className: 'picky-date-time-calendar__table-caption picky-date-time-calendar__table-cel no-border ' + size, key: key },
          item
        );
      });
      var selectorPanelClass = (0, _classnames2.default)('picky-date-time-dropdown', 'picky-date-time-calendar__selector-panel', showSelectorPanel && 'visible');
      var selectorPanelMonthHtml = _locale.LOCALE[locale].months.map(function (item, key) {
        var itemMonth = key + 1;
        var monthItemClass = (0, _classnames2.default)('picky-date-time-dropdown-calendar__month-item', itemMonth == pickedYearMonth.month && 'active');
        var month = itemMonth - 1;
        var direction = _constValue.NEXT_TRANSITION;
        if (itemMonth < pickedYearMonth.month) {
          direction = _constValue.PREV_TRANSITION;
          month = itemMonth + 1;
        }
        return _react2.default.createElement(
          'div',
          {
            className: monthItemClass,
            onClick: itemMonth !== pickedYearMonth.month ? function () {
              return _this2.pickMonth(month, direction);
            } : function () {
              return;
            },
            key: key
          },
          _react2.default.createElement(
            'div',
            { className: size },
            item
          )
        );
      });
      var selectorPanelYearHtml = void 0;
      if (yearSelectorPanelList.length) {
        selectorPanelYearHtml = yearSelectorPanelList.map(function (item, key) {
          var yearItemClass = (0, _classnames2.default)('picky-date-time-dropdown-calendar__year-item', item == pickedYearMonth.year && 'active');
          var year = item - 1;
          var direction = _constValue.NEXT_TRANSITION;
          if (item < pickedYearMonth.year) {
            direction = _constValue.PREV_TRANSITION;
            year = item + 1;
          }
          return _react2.default.createElement(
            'div',
            {
              className: yearItemClass,
              onClick: item !== pickedYearMonth.year ? function () {
                return _this2.pickYear(year, direction);
              } : function () {
                return;
              },
              key: key
            },
            _react2.default.createElement(
              'div',
              { className: size },
              item
            )
          );
        });
      }
      return _react2.default.createElement(
        'div',
        { className: 'picky-date-time-calendar' },
        _react2.default.createElement(
          'div',
          { className: 'picky-date-time-calendar__header' },
          _react2.default.createElement(
            'div',
            { className: '' + selectorPanelClass, ref: function ref(_ref) {
                return _this2.monthSelectorPanel = _ref;
              }, onMouseDown: this.onMouseDown, onMouseUp: this.onMouseUp, onTouchEnd: this.onMouseDown, onTouchCancel: this.onMouseUp },
            _react2.default.createElement(
              'div',
              { className: 'picky-date-time-dropdown-calendar__menu ' + [size] },
              _react2.default.createElement(
                'div',
                { className: 'picky-date-time-dropdown-calendar__month' },
                selectorPanelMonthHtml
              ),
              _react2.default.createElement('div', { style: { height: '10px' } }),
              _react2.default.createElement(
                'div',
                { className: 'picky-date-time__col picky-date-time__col-0-5' },
                _react2.default.createElement('span', {
                  className: 'picky-date-time-calendar__selector-panel-icon picky-date-time-calendar__selector-panel-icon--left picky-date-time-calendar__icon picky-date-time-keyboard_arrow_left',
                  onClick: function onClick() {
                    return _this2.changeSelectorPanelYearSet(yearSelectorPanel - _constValue.SELECTOR_YEAR_SET_NUMBER, _constValue.PREV_TRANSITION);
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'picky-date-time__col picky-date-time__col-9' },
                _react2.default.createElement(
                  _reactAddonsCssTransitionGroup2.default,
                  {
                    className: 'picky-date-time-calendar__selector-panel-year-set-container',
                    transitionName: direction == _constValue.NEXT_TRANSITION ? 'forward' : 'backward',
                    transitionAppearTimeout: 500,
                    transitionEnterTimeout: 300,
                    transitionLeaveTimeout: 300
                  },
                  _react2.default.createElement(
                    'div',
                    { className: 'picky-date-time-dropdown-calendar__year', key: yearSelectorPanelList },
                    selectorPanelYearHtml
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'picky-date-time__col picky-date-time__col-0-5' },
                _react2.default.createElement('span', {
                  className: 'picky-date-time-calendar__selector-panel-icon picky-date-time-calendar__selector-panel-icon--right picky-date-time-calendar__icon picky-date-time-keyboard_arrow_right',
                  onClick: function onClick() {
                    return _this2.changeSelectorPanelYearSet(yearSelectorPanel + _constValue.SELECTOR_YEAR_SET_NUMBER, _constValue.NEXT_TRANSITION);
                  }
                })
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'picky-date-time__col picky-date-time__col-3' },
            _react2.default.createElement(
              'div',
              { className: 'picky-date-time__col picky-date-time-calendar__previous', onClick: function onClick() {
                  return _this2.pickYear(pickedYearMonth.year, _constValue.PREV_TRANSITION);
                } },
              _react2.default.createElement('span', { className: 'picky-date-time-calendar__icon picky-date-time-first_page' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'picky-date-time__col picky-date-time-calendar__sub-previous', onClick: function onClick() {
                  return _this2.pickMonth(pickedYearMonth.month, _constValue.PREV_TRANSITION);
                } },
              _react2.default.createElement('span', { className: 'picky-date-time-calendar__icon picky-date-time-keyboard_arrow_left' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'picky-date-time__col picky-date-time__col-6' },
            _react2.default.createElement(
              _reactAddonsCssTransitionGroup2.default,
              {
                className: 'picky-date-time-calendar__title-container',
                transitionName: direction == _constValue.NEXT_TRANSITION ? 'forward' : 'backward',
                transitionAppearTimeout: 500,
                transitionEnterTimeout: 300,
                transitionLeaveTimeout: 300
              },
              _react2.default.createElement(
                'div',
                { className: 'picky-date-time-calendar__title', key: pickedYearMonth.string },
                _react2.default.createElement(
                  'span',
                  { className: 'picky-date-time-calendar__clicker', onClick: this.showSelectorPanel, onMouseDown: this.onMouseDown, onMouseUp: this.onMouseUp },
                  _react2.default.createElement(
                    'span',
                    { className: 'picky-date-time-calendar__clicker' },
                    _react2.default.createElement(
                      'span',
                      null,
                      '' + _locale.LOCALE[locale].months[pickedYearMonth.month - 1]
                    )
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    '\xA0'
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'picky-date-time-calendar__clicker' },
                    _react2.default.createElement(
                      'span',
                      null,
                      '' + pickedYearMonth.year
                    )
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'picky-date-time__col picky-date-time__col-3' },
            _react2.default.createElement(
              'div',
              { className: 'picky-date-time__col picky-date-time-calendar__next', onClick: function onClick() {
                  return _this2.pickMonth(pickedYearMonth.month, _constValue.NEXT_TRANSITION);
                } },
              _react2.default.createElement('span', { className: 'picky-date-time-calendar__icon picky-date-time-keyboard_arrow_right' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'picky-date-time__col picky-date-time-calendar__sub-next', onClick: function onClick() {
                  return _this2.pickYear(pickedYearMonth.year, _constValue.NEXT_TRANSITION);
                } },
              _react2.default.createElement('span', { className: 'picky-date-time-calendar__icon picky-date-time-last_page' })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'picky-date-time-calendar__content' },
          _react2.default.createElement(
            'div',
            { className: 'picky-date-time-calendar__table' },
            _react2.default.createElement(
              'div',
              { className: 'picky-date-time-calendar__table-row' },
              captionHtml
            )
          ),
          _react2.default.createElement(
            _reactAddonsCssTransitionGroup2.default,
            {
              className: 'picky-date-time-calendar__body-container ' + size,
              transitionName: direction == _constValue.NEXT_TRANSITION ? 'forward' : 'backward',
              transitionAppearTimeout: 500,
              transitionEnterTimeout: 300,
              transitionLeaveTimeout: 300,
              style: transitionContainerStyle
            },
            content
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'picky-date-time-calendar__button picky-date-time-calendar__today', onClick: function onClick() {
              return _this2.reset(true);
            } },
          _react2.default.createElement(
            'span',
            { className: 'picky-date-time-calendar__inline-span' },
            _locale.LOCALE[locale]['today']
          ),
          _react2.default.createElement('span', { className: 'picky-date-time-calendar__inline-span picky-date-time-calendar__icon picky-date-time-refresh' })
        ),
        isDefaultDateValid ? _react2.default.createElement(
          'div',
          { className: 'picky-date-time-calendar__button picky-date-time-calendar__default-day', onClick: function onClick() {
              return _this2.reset(false);
            } },
          _react2.default.createElement(
            'span',
            { className: 'picky-date-time-calendar__inline-span' },
            _locale.LOCALE[locale]['reset-date']
          ),
          _react2.default.createElement('span', { className: 'picky-date-time-calendar__inline-span picky-date-time-calendar__icon picky-date-time-refresh' })
        ) : ''
      );
    }
  }]);

  return Calendar;
}(_react.Component);

var CalendarBody = function (_Component2) {
  _inherits(CalendarBody, _Component2);

  function CalendarBody() {
    _classCallCheck(this, CalendarBody);

    return _possibleConstructorReturn(this, (CalendarBody.__proto__ || Object.getPrototypeOf(CalendarBody)).apply(this, arguments));
  }

  _createClass(CalendarBody, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          size = _props2.size,
          data = _props2.data,
          currentYearMonthDate = _props2.currentYearMonthDate,
          pickedDateInfo = _props2.pickedDateInfo,
          pickedYearMonth = _props2.pickedYearMonth,
          onClick = _props2.onClick;
      var year = currentYearMonthDate.year,
          month = currentYearMonthDate.month,
          date = currentYearMonthDate.date;

      var pickedDateYear = pickedDateInfo.year;
      var pickedDateMonth = pickedDateInfo.month;
      var pickedDate = pickedDateInfo.date;
      var pickedMonth = pickedYearMonth.month;

      var content = Object.keys(data).map(function (key) {
        var colHtml = void 0;
        if (data[key].length) {
          colHtml = data[key].map(function (item, key) {
            var isPicked = pickedDate == item.name && pickedDateMonth == item.month && pickedDateYear == item.year;
            var isDisabled = pickedMonth != item.month;
            var datePickerItemClass = (0, _classnames2.default)('picky-date-time-calendar__table-cel', 'picky-date-time-calendar__date-item', size, isDisabled && 'disabled', date == item.name && month == item.month && year == item.year && 'today', isPicked && 'active');
            return _react2.default.createElement(CalendarItem, { key: key, item: item, onClick: onClick, isPicked: isPicked, isDisabled: isDisabled, datePickerItemClass: datePickerItemClass });
          });
        }
        return _react2.default.createElement(
          'div',
          { className: 'picky-date-time-calendar__table-row', key: key },
          colHtml
        );
      });
      return _react2.default.createElement(
        'div',
        { className: 'picky-date-time-calendar__table slide' },
        content
      );
    }
  }]);

  return CalendarBody;
}(_react.Component);

var CalendarItem = function (_Component3) {
  _inherits(CalendarItem, _Component3);

  function CalendarItem(props) {
    _classCallCheck(this, CalendarItem);

    var _this4 = _possibleConstructorReturn(this, (CalendarItem.__proto__ || Object.getPrototypeOf(CalendarItem)).call(this, props));

    _this4.onClick = _this4.onClick.bind(_this4);
    return _this4;
  }

  _createClass(CalendarItem, [{
    key: 'onClick',
    value: function onClick() {
      this.props.onClick(this.props.item.name);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          item = _props3.item,
          isPicked = _props3.isPicked,
          isDisabled = _props3.isDisabled,
          datePickerItemClass = _props3.datePickerItemClass;

      return _react2.default.createElement(
        'div',
        {
          className: '' + datePickerItemClass,
          onClick: !isDisabled ? this.onClick : function () {
            return;
          }
        },
        item.name,
        isPicked ? _react2.default.createElement('span', { className: 'picky-date-time-calendar__icon picky-date-time-check' }) : ''
      );
    }
  }]);

  return CalendarItem;
}(_react.Component);

CalendarItem.propTypes = {
  item: _propTypes2.default.object,
  isPicked: _propTypes2.default.bool,
  isDisabled: _propTypes2.default.bool,
  datePickerItemClass: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};

CalendarItem.defaultProps = {
  item: {},
  isPicked: false,
  isDisabled: false,
  datePickerItemClass: '',
  onClick: function onClick() {}
};

CalendarBody.propTypes = {
  size: _propTypes2.default.string,
  data: _propTypes2.default.object,
  currentYearMonthDate: _propTypes2.default.object,
  pickedDateInfo: _propTypes2.default.object,
  pickedYearMonth: _propTypes2.default.object,
  onClick: _propTypes2.default.func
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
  size: _propTypes2.default.string,
  locale: _propTypes2.default.string,
  defaultDate: _propTypes2.default.string,
  onYearPicked: _propTypes2.default.func,
  onMonthPicked: _propTypes2.default.func,
  onDatePicked: _propTypes2.default.func,
  onResetDate: _propTypes2.default.func,
  onResetDefaultDate: _propTypes2.default.func
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

exports.default = Calendar;