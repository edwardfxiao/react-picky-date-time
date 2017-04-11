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

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Clock = require('./Clock');

var _Clock2 = _interopRequireDefault(_Clock);

var _constValue = require('./constValue');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index(props) {
    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

    _this.state = {};
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
    key: 'onResetTime',
    value: function onResetTime(timeInfo) {
      this.props.onResetTime(timeInfo);
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
    key: 'render',
    value: function render() {
      var _props = this.props,
          size = _props.size,
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
      if (_constValue.LOCALE_RANGE.indexOf(locale) == -1) {
        locale = _constValue.DEFAULT_LACALE;
      }

      if (mode == 0) {
        calendarHtml = _react2.default.createElement(
          'div',
          { className: 'picky-date-time__calendar' },
          _react2.default.createElement(_Calendar2.default, {
            size: size,
            locale: locale,
            onYearPicked: this.onYearPicked.bind(this),
            onMonthPicked: this.onMonthPicked.bind(this),
            onDatePicked: this.onDatePicked.bind(this),
            onResetDate: this.onResetDate.bind(this)
          })
        );
      }
      if (mode == 1) {
        calendarHtml = _react2.default.createElement(
          'div',
          { className: 'picky-date-time__calendar' },
          _react2.default.createElement(_Calendar2.default, {
            size: size,
            locale: locale,
            onYearPicked: this.onYearPicked.bind(this),
            onMonthPicked: this.onMonthPicked.bind(this),
            onDatePicked: this.onDatePicked.bind(this),
            onResetDate: this.onResetDate.bind(this)
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
          _react2.default.createElement(_Clock2.default, {
            size: size,
            locale: locale,
            onSecondChange: this.onSecondChange.bind(this),
            onMinuteChange: this.onMinuteChange.bind(this),
            onHourChange: this.onHourChange.bind(this),
            onMeridiemChange: this.onMeridiemChange.bind(this),
            onResetTime: this.onResetTime.bind(this),
            onClearTime: this.onClearTime.bind(this)
          })
        );
      }
      if (mode == 2) {
        clockHtml = _react2.default.createElement(
          'div',
          { className: 'picky-date-time__clock ' + [size] },
          _react2.default.createElement(_Clock2.default, {
            size: size,
            locale: locale,
            onSecondChange: this.onSecondChange.bind(this),
            onMinuteChange: this.onMinuteChange.bind(this),
            onHourChange: this.onHourChange.bind(this),
            onMeridiemChange: this.onMeridiemChange.bind(this),
            onResetTime: this.onResetTime.bind(this),
            onClearTime: this.onClearTime.bind(this)
          })
        );
      }
      return _react2.default.createElement(
        'div',
        { className: '' + componentClass },
        _react2.default.createElement('span', { className: 'picky-date-time__close picky-date-time-highlight_off', onClick: this.onClose.bind(this) }),
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
  onClearTime: _propTypes2.default.func
};

Index.defaultProps = {
  locale: _constValue.DEFAULT_LACALE,
  size: _constValue.DEFAULT_SIZE,
  show: false,
  mode: 0,
  // GENERAL
  onClose: function onClose() {},
  // CALENDAR
  onYearPicked: function onYearPicked() {},
  onMonthPicked: function onMonthPicked() {},
  onDatePicked: function onDatePicked() {},
  onResetDate: function onResetDate() {},
  // CLOCK
  onSecondChange: function onSecondChange() {},
  onMinuteChange: function onMinuteChange() {},
  onHourChange: function onHourChange() {},
  onMeridiemChange: function onMeridiemChange() {},
  onResetTime: function onResetTime() {},
  onClearTime: function onClearTime() {}
};

exports.default = Index;