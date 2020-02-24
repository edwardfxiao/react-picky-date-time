'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('./Calendar/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./Clock/index.js');

var _index4 = _interopRequireDefault(_index3);

var _constValue = require('./constValue.js');

var _locale = require('./locale.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STYLES = {};
try {
  STYLES = {
    'picky-date-time': 'index__picky-date-time___1-7bu',
    'visible': 'index__visible___1AYFw',
    'picky-date-time__calendar': 'index__picky-date-time__calendar___Uzshg',
    'picky-date-time__clock': 'index__picky-date-time__clock___3P7FF',
    'picky-date-time__close': 'index__picky-date-time__close___N_Q78',
    'picky-date-time__breaker': 'index__picky-date-time__breaker___1Daw1',
    'l': 'index__l___1pMT_',
    'm': 'index__m___2vZIj',
    's': 'index__s___n2aXG',
    'xs': 'index__xs___1P_PY'
  };
  if (!STYLES) {
    console.log('');
  }
} catch (ex) {}

var Index = function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index(props) {
    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

    _this.onYearPicked = _this.onYearPicked.bind(_this);
    _this.onMonthPicked = _this.onMonthPicked.bind(_this);
    _this.onDatePicked = _this.onDatePicked.bind(_this);
    _this.onResetDate = _this.onResetDate.bind(_this);
    _this.onResetDefaultDate = _this.onResetDefaultDate.bind(_this);
    _this.onSecondChange = _this.onSecondChange.bind(_this);
    _this.onMinuteChange = _this.onMinuteChange.bind(_this);
    _this.onHourChange = _this.onHourChange.bind(_this);
    _this.onMeridiemChange = _this.onMeridiemChange.bind(_this);
    _this.onResetTime = _this.onResetTime.bind(_this);
    _this.onClearTime = _this.onClearTime.bind(_this);
    _this.onResetDefaultTime = _this.onResetDefaultTime.bind(_this);
    _this.onClose = _this.onClose.bind(_this);
    return _this;
  }

  _createClass(Index, [{
    key: 'onClose',
    value: function onClose() {
      var onClose = this.props.onClose;

      onClose && onClose();
    }
    // CALENDAR

  }, {
    key: 'onYearPicked',
    value: function onYearPicked(yearInfo) {
      this.props.onYearPicked(yearInfo);
    }
  }, {
    key: 'onMonthPicked',
    value: function onMonthPicked(monthInfo) {
      this.props.onMonthPicked(monthInfo);
    }
  }, {
    key: 'onDatePicked',
    value: function onDatePicked(dateInfo) {
      this.props.onDatePicked(dateInfo);
    }
  }, {
    key: 'onResetDate',
    value: function onResetDate(dateInfo) {
      this.props.onResetDate(dateInfo);
    }
  }, {
    key: 'onResetDefaultDate',
    value: function onResetDefaultDate(dateInfo) {
      this.props.onResetDefaultDate(dateInfo);
    }
    // CLOCK

  }, {
    key: 'onSecondChange',
    value: function onSecondChange(secondInfo) {
      this.props.onSecondChange(secondInfo);
    }
  }, {
    key: 'onMinuteChange',
    value: function onMinuteChange(minuteInfo) {
      this.props.onMinuteChange(minuteInfo);
    }
  }, {
    key: 'onHourChange',
    value: function onHourChange(hourInfo) {
      this.props.onHourChange(hourInfo);
    }
  }, {
    key: 'onMeridiemChange',
    value: function onMeridiemChange(meridiemInfo) {
      this.props.onMeridiemChange(meridiemInfo);
    }
  }, {
    key: 'onResetTime',
    value: function onResetTime(Info) {
      this.props.onResetTime(Info);
    }
  }, {
    key: 'onClearTime',
    value: function onClearTime(Info) {
      this.props.onClearTime(Info);
    }
  }, {
    key: 'onResetDefaultTime',
    value: function onResetDefaultTime(Info) {
      this.props.onResetDefaultTime(Info);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          size = _props.size,
          defaultDate = _props.defaultDate,
          defaultTime = _props.defaultTime,
          show = _props.show,
          locale = _props.locale,
          mode = _props.mode;

      var componentClass = (0, _classnames2.default)('picky-date-time', show && 'visible');
      var calendarHtml = void 0;
      var breakerHtml = void 0;
      var clockHtml = void 0;

      size = size.toLowerCase();
      if (_constValue.SIZE_RANGE.indexOf(size) == -1) {
        size = _constValue.DEFAULT_SIZE;
      }

      locale = locale.toLowerCase();
      if (typeof _locale.LOCALE[locale] === 'undefined') {
        locale = _locale.DEFAULT_LACALE;
      }
      if (mode == 0) {
        calendarHtml = _react2.default.createElement(
          'div',
          { className: 'picky-date-time__calendar' },
          _react2.default.createElement(_index2.default, {
            size: size,
            defaultDate: defaultDate,
            locale: locale,
            onYearPicked: this.onYearPicked,
            onMonthPicked: this.onMonthPicked,
            onDatePicked: this.onDatePicked,
            onResetDate: this.onResetDate,
            onResetDefaultDate: this.onResetDefaultDate
          })
        );
      }
      if (mode == 1) {
        calendarHtml = _react2.default.createElement(
          'div',
          { className: 'picky-date-time__calendar' },
          _react2.default.createElement(_index2.default, {
            size: size,
            defaultDate: defaultDate,
            locale: locale,
            onYearPicked: this.onYearPicked,
            onMonthPicked: this.onMonthPicked,
            onDatePicked: this.onDatePicked,
            onResetDate: this.onResetDate,
            onResetDefaultDate: this.onResetDefaultDate
          })
        );
        breakerHtml = _react2.default.createElement(
          'span',
          { className: 'picky-date-time__breaker ' + [size] },
          '\xA0\xA0'
        );
        clockHtml = _react2.default.createElement(
          'div',
          { className: 'picky-date-time__clock ' + [size] },
          _react2.default.createElement(_index4.default, {
            size: size,
            locale: locale,
            defaultTime: defaultTime,
            onSecondChange: this.onSecondChange,
            onMinuteChange: this.onMinuteChange,
            onHourChange: this.onHourChange,
            onMeridiemChange: this.onMeridiemChange,
            onResetTime: this.onResetTime,
            onClearTime: this.onClearTime,
            onResetDefaultTime: this.onResetDefaultTime
          })
        );
      }
      if (mode == 2) {
        clockHtml = _react2.default.createElement(
          'div',
          { className: 'picky-date-time__clock ' + [size] },
          _react2.default.createElement(_index4.default, {
            size: size,
            locale: locale,
            defaultTime: defaultTime,
            onSecondChange: this.onSecondChange,
            onMinuteChange: this.onMinuteChange,
            onHourChange: this.onHourChange,
            onMeridiemChange: this.onMeridiemChange,
            onResetTime: this.onResetTime,
            onClearTime: this.onClearTime,
            onResetDefaultTime: this.onResetDefaultTime
          })
        );
      }
      return _react2.default.createElement(
        'div',
        { className: '' + componentClass },
        _react2.default.createElement('span', { className: 'picky-date-time__close picky-date-time-highlight_off', onClick: this.onClose }),
        calendarHtml,
        breakerHtml,
        clockHtml
      );
    }
  }]);

  return Index;
}(_react2.default.Component);

Index.propTypes = {
  mode: _propTypes2.default.number,
  size: _propTypes2.default.string,
  locale: _propTypes2.default.string,
  defaultDate: _propTypes2.default.string,
  defaultTime: _propTypes2.default.string,
  show: _propTypes2.default.bool,
  onClose: _propTypes2.default.func,
  onYearPicked: _propTypes2.default.func,
  onMonthPicked: _propTypes2.default.func,
  onDatePicked: _propTypes2.default.func,
  onResetDate: _propTypes2.default.func,
  onSecondChange: _propTypes2.default.func,
  onMinuteChange: _propTypes2.default.func,
  onHourChange: _propTypes2.default.func,
  onMeridiemChange: _propTypes2.default.func,
  onResetTime: _propTypes2.default.func,
  onClearTime: _propTypes2.default.func,
  onResetDefaultDate: _propTypes2.default.func,
  onResetDefaultTime: _propTypes2.default.func
};

Index.defaultProps = {
  locale: _locale.DEFAULT_LACALE,
  size: _constValue.DEFAULT_SIZE,
  show: false,
  mode: 0,
  // GENERAL
  onClose: function onClose() {},
  // CALENDAR
  defaultDate: '',
  onYearPicked: function onYearPicked() {},
  onMonthPicked: function onMonthPicked() {},
  onDatePicked: function onDatePicked() {},
  onResetDate: function onResetDate() {},
  onResetDefaultDate: function onResetDefaultDate() {},
  // CLOCK
  defaultTime: '',
  onSecondChange: function onSecondChange() {},
  onMinuteChange: function onMinuteChange() {},
  onHourChange: function onHourChange() {},
  onMeridiemChange: function onMeridiemChange() {},
  onResetTime: function onResetTime() {},
  onClearTime: function onClearTime() {},
  onResetDefaultTime: function onResetDefaultTime() {}
};
if (typeof window !== 'undefined') {
  window.PickyDateTime = Index;
}
exports.default = Index;