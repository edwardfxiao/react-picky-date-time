import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import update from 'react-addons-update';
import React, { PropTypes } from 'react';
import assign from 'object-assign'
import STYLE from 'COMPONENTS/PickyDateTime/Calendar/style.css';
import TRANSITION_STYLE from 'COMPONENTS/PickyDateTime/transition.css';
import 'COMPONENTS/PickyDateTime/icon.css';
import cx from 'classnames';

import {
  WEEK_NAME,
  MONTH_NAME,
  WEEK_NUMBER,
  LANG,
  PREV_TRANSITION,
  NEXT_TRANSITION,
  SELECTOR_YEAR_SET_NUMBER,
  getDaysArray,
  getDaysListByMonth,
  getYearSet,
} from 'COMPONENTS/PickyDateTime/constValue';

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let dates = getDaysArray(year, month, );

    this.state = {
      dates: dates,
      pickedYearMonth: {
        year: year,
        month: month,
        string: `${year}-${month}`,
      },
      pickedDateInfo: {
        date,
        year,
        month,
      },
      currentYearMonthDate: {
        date,
        year,
        month,
      },
      direction: NEXT_TRANSITION,
      yearSelectorPanelList: getYearSet(year),
      yearSelectorPanel: year,
      showMask: false,
      showSelectorPanel: false,
    }
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.pageClick.bind(this), false);
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.pickedYearMonth != this.state.pickedYearMonth){
      let dates = getDaysArray(this.state.pickedYearMonth.year, this.state.pickedYearMonth.month, );
      this.setState({dates});
    }
  }

  pageClick(e) {
    if (this.mouseIsDownOnSelectorPanelClicker) {
      return;
    }
    this.setState({
        showSelectorPanel: false,
        showMask: false,
    });
  }

  pickYear (year, direction) {
    if (direction == PREV_TRANSITION){
      year = year - 1;
    }
    else{
      year = year + 1;
    }
    let {
      pickedYearMonth,
    } = this.state;
    let {
      month,
    } = pickedYearMonth;
    pickedYearMonth = update(pickedYearMonth, {
        year: {$set: year},
        string: {$set: `${year}-${month}`},
      }
    );
    this.setState({
      pickedYearMonth,
      direction,
    });
    this.props.onMonthPicked({year});
  }

  pickMonth (month, direction) {
    let {
      pickedYearMonth,
    } = this.state;
    let {
      year,
    } = pickedYearMonth;
    if (direction == PREV_TRANSITION){
      if (month == 1){
        month = 12;
        year = year - 1;
      }
      else{
        month = month - 1;
      }
    }
    else{
      if (month == 12){
        month = 1;
        year = year + 1;
      }
      else{
        month = month + 1;
      }
    }
    pickedYearMonth = update(pickedYearMonth, {
        month: {$set: month},
        string: {$set: `${year}-${month}`},
      }
    );
    this.setState({
      pickedYearMonth,
      direction,
    });
    this.props.onMonthPicked({year, month});
  }

  pickDate (pickedDate) {
    let {
      pickedDateInfo,
      pickedYearMonth,
    } = this.state;
    pickedDateInfo = update(pickedDateInfo, {
        year: {$set: pickedYearMonth.year},
        month: {$set: pickedYearMonth.month},
        date: {$set: pickedDate},
      }
    );
    this.setState({pickedDateInfo});
    this.props.onDatePicked(pickedDateInfo);
  }

  changeSelectorPanelYearSet (yearSelectorPanel, direction) {
    let yearSelectorPanelList = getYearSet(yearSelectorPanel);
    this.setState({yearSelectorPanel, yearSelectorPanelList, direction});
  }

  showSelectorPanel () {
    let {
      showSelectorPanel,
      showMask,
    } = this.state;
    this.setState({showSelectorPanel: !showSelectorPanel, showMask: !showMask});
  }

  onMouseDown () {
    this.mouseIsDownOnSelectorPanelClicker = true;
  }

  onMouseUp () {
    this.mouseIsDownOnSelectorPanelClicker = false;
  }

  reset () {
    let {
      currentYearMonthDate,
      pickedDateInfo,
      pickedYearMonth,
    } = this.state;
    let {
      year,
      month,
      date,
    } = currentYearMonthDate;
    let direction = NEXT_TRANSITION;
    if (year < pickedYearMonth.year){
      direction = PREV_TRANSITION;
    }
    else if (year == pickedYearMonth.year){
      if (month < pickedYearMonth.month){
        direction = PREV_TRANSITION;
      }
    }
    pickedDateInfo = update(pickedDateInfo, {
        year: {$set: year},
        month: {$set: month},
        date: {$set: date},
      }
    );
    pickedYearMonth = update(pickedYearMonth, {
        year: {$set: year},
        month: {$set: month},
        string: {$set: `${year}-${month}`}
      }
    );
    this.setState({
      pickedYearMonth: pickedYearMonth,
      pickedDateInfo: pickedDateInfo,
      yearSelectorPanel: year,
      direction: direction,
    });
    this.props.onResetDate(pickedDateInfo);
  }

  render() {
    let{
      size,
      locale,
    } = this.props;
    let {
      pickedYear,
      pickedMonth,
      pickedDate,
      dates,
      direction,
      showSelectorPanel,
      yearSelectorPanelList,
      yearSelectorPanel,
      currentYearMonthDate,
      pickedDateInfo,
      pickedYearMonth,
      showMask,
    } = this.state;
    let transitionContainerStyle;
    let content;
    let rowHtml;
    if (dates.length){
      let row = dates.length / WEEK_NUMBER;
      let rowIndex = 1;
      let rowObj = {};
      dates.map((item, key) => {
        if ( key < rowIndex * (WEEK_NUMBER)){
          if (!rowObj[rowIndex]){
            rowObj[rowIndex] = [];
          }
          rowObj[rowIndex].push(item);
        }
        else{
          rowIndex = rowIndex + 1;
          if (!rowObj[rowIndex]){
            rowObj[rowIndex] = [];
          }
          rowObj[rowIndex].push(item);
        }
      });
      content = (
        <CalendarBody
          size={size}
          data={rowObj}
          currentYearMonthDate={currentYearMonthDate}
          pickedYearMonth={pickedYearMonth}
          pickedDateInfo={pickedDateInfo}
          onClick={this.pickDate.bind(this)}
          key={pickedYearMonth.string}
        />
      );
      if (row == 6){
        let height = 385;
        if (size == 'l'){
          height = 500;
        }
        if (size == 's'){
          height = 285;
        }
        if (size == 'xs'){
          height = 235;
        }
        transitionContainerStyle = {
          height: `${height}px`
        }
      }
    }
    let captionHtml;
    captionHtml = WEEK_NAME[locale].map((item, key) => {
      return (
        <div className={`${STYLE['picky-date-time-calendar__table-caption']} ${STYLE['picky-date-time-calendar__table-cel']} ${STYLE['no-border']} ${STYLE[size]}`} key={key}>{item}</div>
      );
    });
    let selectorPanelClass = cx(
      STYLE['picky-date-time-dropdown'],
      STYLE['picky-date-time-calendar__selector-panel'],
      showSelectorPanel && STYLE['visible'],
    );
    let selectorPanelMonthHtml = MONTH_NAME[locale].map((item, key) => {
      let itemMonth = key + 1;
      let monthItemClass = cx(
        STYLE['picky-date-time-dropdown-calendar__month-item'],
        itemMonth == pickedYearMonth.month && STYLE['active'],
      );
      let month = itemMonth - 1;
      let direction = NEXT_TRANSITION;
      if (itemMonth < pickedYearMonth.month){
        direction = PREV_TRANSITION;
        month = itemMonth + 1;
      }
      return (
        <div className={monthItemClass} onClick={itemMonth !== pickedYearMonth.month ? this.pickMonth.bind(this, month, direction) : ``} key={key}>
          <div className={STYLE[size]}>{item}</div>
        </div>
      );
    });
    let selectorPanelYearHtml;
    if (yearSelectorPanelList.length){
      selectorPanelYearHtml = yearSelectorPanelList.map((item, key) => {
        let yearItemClass = cx(
          STYLE['picky-date-time-dropdown-calendar__year-item'],
          item == pickedYearMonth.year && STYLE['active'],
        );
        let year = item - 1;
        let direction = NEXT_TRANSITION;
        if (item < pickedYearMonth.year){
          direction = PREV_TRANSITION;
          year = item + 1;
        }
        return(
          <div className={yearItemClass} onClick={item !== pickedYearMonth.year ? this.pickYear.bind(this, year, direction) : ``} key={key}>
            <div className={STYLE[size]}>{item}</div>
          </div>
        );
      });
    }
    return (
      <div className={`${STYLE['picky-date-time-calendar']}`}>
        <div className={`${STYLE['picky-date-time-calendar__header']}`}>
          <div className={`${STYLE['col']} ${STYLE['col-3']}`}>
            <div className={`${STYLE['col']} ${STYLE['picky-date-time-calendar__previous']}`} onClick={this.pickYear.bind(this, pickedYearMonth.year, PREV_TRANSITION)}>
              <span className={`${STYLE['picky-date-time-calendar__icon']} picky-date-time-first_page`}></span>
            </div>
            <div className={`${STYLE['col']} ${STYLE['picky-date-time-calendar__sub-previous']}`} onClick={this.pickMonth.bind(this, pickedYearMonth.month, PREV_TRANSITION)}>
              <span className={`${STYLE['picky-date-time-calendar__icon']} picky-date-time-keyboard_arrow_left`}></span>
            </div>
          </div>
          <div className={`${STYLE['col']} ${STYLE['col-6']}`}>
            <div className={`${selectorPanelClass}`} ref={ref => this.monthSelectorPanel = ref} onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)}>
              <div className={`${STYLE['picky-date-time-dropdown-calendar__menu']} ${STYLE[size]}`}>
                <div className={`${STYLE['picky-date-time-dropdown-calendar__month']}`}>
                  {selectorPanelMonthHtml}
                </div>
                <div style={{'height':'10px'}}></div>

                <div className={`${STYLE['col']} ${STYLE['col-0-5']}`}>
                  <span className={`${STYLE['picky-date-time-calendar__selector-panel-icon']} ${STYLE['picky-date-time-calendar__selector-panel-icon--left']} ${STYLE['picky-date-time-calendar__icon']} picky-date-time-keyboard_arrow_left`} onClick={this.changeSelectorPanelYearSet.bind(this, yearSelectorPanel - SELECTOR_YEAR_SET_NUMBER, PREV_TRANSITION)}></span>
                </div>
                <div className={`${STYLE['col']} ${STYLE['col-9']}`}>
                  <ReactCSSTransitionGroup
                    className="picky-date-time-calendar__selector-panel-year-set-container"
                    transitionName={direction == NEXT_TRANSITION ? 'forward' : 'backward'}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                  >
                  <div className={`${STYLE['picky-date-time-dropdown-calendar__year']}`} key={yearSelectorPanelList}>
                    {selectorPanelYearHtml}
                  </div>
                  </ReactCSSTransitionGroup>
                </div>
                <div className={`${STYLE['col']} ${STYLE['col-0-5']}`}>
                  <span className={`${STYLE['picky-date-time-calendar__selector-panel-icon']} ${STYLE['picky-date-time-calendar__selector-panel-icon--right']} ${STYLE['picky-date-time-calendar__icon']} picky-date-time-keyboard_arrow_right`} onClick={this.changeSelectorPanelYearSet.bind(this, yearSelectorPanel + SELECTOR_YEAR_SET_NUMBER, NEXT_TRANSITION)}></span>
                </div>

              </div>
            </div>
            <ReactCSSTransitionGroup
              className="picky-date-time-calendar__title-container"
              transitionName={direction == NEXT_TRANSITION ? 'forward' : 'backward'}
              transitionAppearTimeout={500}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              <div className={`${STYLE['picky-date-time-calendar__title']}`} key={pickedYearMonth.string}>
                <span className={`${STYLE['picky-date-time-calendar__clicker']}`} onClick={this.showSelectorPanel.bind(this)} onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)}>
                  <span className={`${STYLE['picky-date-time-calendar__clicker']}`}>
                    <span>{`${MONTH_NAME[locale][pickedYearMonth.month - 1]}`}</span>
                  </span>
                  <span>&nbsp;&nbsp;</span>
                  <span className={`${STYLE['picky-date-time-calendar__clicker']}`}>
                    <span>{`${pickedYearMonth.year}`}</span>
                  </span>
                </span>
              </div>
            </ReactCSSTransitionGroup>
          </div>
          <div className={`${STYLE['col']} ${STYLE['col-3']}`}>
            <div className={`${STYLE['col']} ${STYLE['picky-date-time-calendar__next']}`} onClick={this.pickMonth.bind(this, pickedYearMonth.month, NEXT_TRANSITION)}>
              <span className={`${STYLE['picky-date-time-calendar__icon']} picky-date-time-keyboard_arrow_right`}></span>
            </div>
            <div className={`${STYLE['col']} ${STYLE['picky-date-time-calendar__sub-next']}`} onClick={this.pickYear.bind(this, pickedYearMonth.year, NEXT_TRANSITION)}>
              <span className={`${STYLE['picky-date-time-calendar__icon']} picky-date-time-last_page`}></span>
            </div>
          </div>
        </div>
        <div className={`${STYLE['picky-date-time-calendar__content']}`}>
          <div className={`${STYLE['picky-date-time-calendar__table']}`}>
            <div className={`${STYLE['picky-date-time-calendar__table-row']}`}>
              {captionHtml}
            </div>
          </div>
          <ReactCSSTransitionGroup
            className={`picky-date-time-calendar__body-container ${size}`}
            transitionName={direction == NEXT_TRANSITION ? 'forward' : 'backward'}
            transitionAppearTimeout={500}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            style={transitionContainerStyle}
          >
            {content}
          </ReactCSSTransitionGroup>
        </div>
        <div className={`${STYLE['picky-date-time-calendar__button']} ${STYLE['picky-date-time-calendar__today']}`} onClick={this.reset.bind(this)}>
          <span className={`${STYLE['picky-date-time-calendar__inline-span']}`}>{LANG[locale]['reset-date']}</span>
          <span className={`${STYLE['picky-date-time-calendar__inline-span']} ${STYLE['picky-date-time-calendar__icon']} picky-date-time-refresh`} onClick={this.changeSelectorPanelYearSet.bind(this, yearSelectorPanel + SELECTOR_YEAR_SET_NUMBER, NEXT_TRANSITION)}></span>
        </div>
        {/*<div className={`${cx(STYLE['picky-date-time-calendar__mask'], showMask && STYLE['visible'])}`}></div>*/}
      </div>
    );
  }
}

class CalendarBody extends React.Component {
  render() {
    let {
      size,
      data,
      currentYearMonthDate,
      pickedDateInfo,
      pickedYearMonth,
      onClick,
    } = this.props;
    let {
      year,
      month,
      date,
    } = currentYearMonthDate;
    let pickedDateYear = pickedDateInfo.year;
    let pickedDateMonth = pickedDateInfo.month;
    let pickedDate = pickedDateInfo.date;
    let pickedYear = pickedYearMonth.year;
    let pickedMonth = pickedYearMonth.month;
    let content = Object.keys(data).map((key) => {
      let colHtml;
      if (data[key].length){
        colHtml = data[key].map((item, key) => {
          let isPicked = pickedDate == item.name && pickedDateMonth == item.month && pickedDateYear == item.year;
          let isDisabled = pickedMonth != item.month;
          const datePickerItemClass = cx(
            STYLE['picky-date-time-calendar__table-cel'],
            STYLE['picky-date-time-calendar__date-item'],
            STYLE[size],
            isDisabled && STYLE['disabled'],
            date == item.name && month == item.month && year == item.year && STYLE['today'],
            isPicked && STYLE['active'],
          );
          return (
            <div className={`${datePickerItemClass}`} key={key} onClick={!isDisabled ? this.props.onClick.bind(this, item.name) : ``}>
              {item.name}
              {isPicked ? <span className={`${STYLE['picky-date-time-calendar__icon']} picky-date-time-check`}></span> : ``}
            </div>
          );
        });
      }
      return (
        <div className={`${STYLE['picky-date-time-calendar__table-row']}`} key={key}>
          {colHtml}
        </div>
      );
    });
    return(
      <div className={`${STYLE['picky-date-time-calendar__table']} slide`}>
        {content}
      </div>
    );
  }
}

CalendarBody.propTypes = {
  onClick: PropTypes.func,
}

CalendarBody.defaultProps = {
  onClick: () => {},
}

Calendar.propTypes = {
  size: PropTypes.string,
  locale: PropTypes.string,
  onYearPicked: PropTypes.func,
  onMonthPicked: PropTypes.func,
  onDatePicked: PropTypes.func,
  onResetDate: PropTypes.func,
};

Calendar.defaultProps = {
  size: 'm',
  locale: 'en-US',
  onYearPicked: () => {},
  onMonthPicked: () => {},
  onDatePicked: () => {},
  onResetDate: () => {},
}

export default Calendar;