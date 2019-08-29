/** @jsx jsx */
import { jsx, css, ClassNames } from '@emotion/core';
import * as React from 'react';
import { Icon, EIconName } from '../icons/icons';
import { Button } from './Button';
import { CSSTransition } from 'react-transition-group';
import { IFormContext, FormContext } from './Form';
import { FormValidatorRequired } from './validators/FormValidator';

const DAY_SIZE = 32;
const ANIMATION_TIME = 300;

interface IDatePickerProps {
  weekStartDay: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  value: Date;
  locale: string;
  name: string;
  onChange?: (date: Date) => void;
  tabIndex?: number;
  boundDate?: Date;
  boundDateMode?: 'before' | 'after';
  size?: 'small' | 'large';
  currentViewDate?: Date;
  validator?: FormValidatorRequired;
}

interface IDatePickerState {
  value: Date;
  currentDate: Date;
  currentViewDateStart: Date;
  currentViewDateEnd: Date;
  mode: EDatePickerMode;
  isOpened: boolean;
  isFocused: boolean;
}

interface IHeaderItem {
  title: string;
}

interface IDay {
  active: boolean;
  isSelectable: boolean;
  isToday: boolean;
  date: Date;
}

interface IYear {
  date: Date;
  isSelectable: boolean;
}

interface IMonth {
  date: Date;
  isSelectable: boolean;
}

enum EDatePickerMode {
  Days,
  Months,
  Years,
}

enum EDatePickerEqType {
  EQ,
  LT,
  GT,
}

const SUNDAY: number = 330000000;
const DEFAULT_MODE: EDatePickerMode = EDatePickerMode.Days;
const YEARS_VIEW_COUNT: number = 24;

export class DatePicker extends React.Component<
  IDatePickerProps,
  IDatePickerState
> {
  public state: IDatePickerState = {
    value: new Date(),
    currentDate: new Date(),
    currentViewDateStart: new Date(),
    currentViewDateEnd: new Date(),
    mode: EDatePickerMode.Days,
    isOpened: false,
    isFocused: false,
  };

  static defaultProps = {
    size: 'large',
    currentViewDate: null,
    tabIndex: 1,
    onChange: () => {},
  };

  input: HTMLInputElement | null = null;
  formContext: IFormContext | null = null;
  isMouseDown: boolean = false;

  private getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  private getYears(): IYear[] {
    const years: IYear[] = [];
    const yearsDateCenter: Date = new Date(this.state.currentViewDateStart);

    yearsDateCenter.setFullYear(
      yearsDateCenter.getFullYear() - YEARS_VIEW_COUNT / 2 + 1,
    );

    for (let i: number = 0; i < YEARS_VIEW_COUNT; i++) {
      const date: Date = new Date(yearsDateCenter);
      let isSelectable: boolean = true;

      if (
        this.props.boundDate &&
        this.props.boundDateMode === 'before' &&
        this.compareYears(this.props.boundDate, date, EDatePickerEqType.GT)
      ) {
        isSelectable = false;
      }

      if (
        this.props.boundDate &&
        this.props.boundDateMode === 'after' &&
        this.compareYears(this.props.boundDate, date, EDatePickerEqType.LT)
      ) {
        isSelectable = false;
      }

      years.push({
        isSelectable: isSelectable,
        date: date,
      });

      yearsDateCenter.setFullYear(yearsDateCenter.getFullYear() + 1);
    }

    return years;
  }

  private getMonths(): IMonth[] {
    const months: IMonth[] = [];
    const monthsDate: Date = new Date(this.state.currentViewDateStart);

    monthsDate.setMonth(0);

    for (let i: number = 0; i < 12; i++) {
      const date: Date = new Date(monthsDate);
      let isSelectable: boolean = true;

      if (
        this.props.boundDate &&
        this.props.boundDateMode === 'before' &&
        this.compareMonths(this.props.boundDate, date, EDatePickerEqType.GT)
      ) {
        isSelectable = false;
      }

      if (
        this.props.boundDate &&
        this.props.boundDateMode === 'after' &&
        this.compareMonths(this.props.boundDate, date, EDatePickerEqType.LT)
      ) {
        isSelectable = false;
      }

      months.push({
        isSelectable: isSelectable,
        date: date,
      });

      monthsDate.setMonth(monthsDate.getMonth() + 1);
    }

    return months;
  }

  private getHeaderItems(): IHeaderItem[] {
    const items: IHeaderItem[] = [];
    const date: Date = new Date(SUNDAY);

    date.setDate(date.getDate() + this.props.weekStartDay);

    for (let i = 0; i <= 6; i++) {
      items.push({
        title: date.toLocaleDateString(this.props.locale, {
          weekday: 'narrow',
        }),
      });

      date.setDate(date.getDate() + 1);
    }

    return items;
  }

  private getDays(): IDay[] {
    const daysInMonth: number = this.getDaysInMonth(
      this.state.currentViewDateStart,
    );
    const days: IDay[] = [];
    const firstDayNumber: number = this.state.currentViewDateStart.getDay();
    let weekDayIteration: number = 0;

    if (firstDayNumber > 0) {
      const prevMonth: Date = new Date(this.state.currentViewDateStart);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      const daysInMonthPrev: number = this.getDaysInMonth(prevMonth);

      for (let i: number = this.props.weekStartDay; i < firstDayNumber; i++) {
        const date: Date = new Date(prevMonth);
        const day: number = daysInMonthPrev + i - (firstDayNumber - 1);
        const isToday = this.compareDates(
          new Date(),
          date,
          EDatePickerEqType.EQ,
        );
        let isSelectable: boolean = true;

        date.setDate(day);

        if (
          this.props.boundDate &&
          this.props.boundDateMode === 'before' &&
          this.compareDates(this.props.boundDate, date, EDatePickerEqType.GT)
        ) {
          isSelectable = false;
        }

        if (
          this.props.boundDate &&
          this.props.boundDateMode === 'after' &&
          this.compareDates(this.props.boundDate, date, EDatePickerEqType.LT)
        ) {
          isSelectable = false;
        }

        days.push({
          isSelectable,
          active: false,
          date,
          isToday,
        });

        weekDayIteration++;

        if (weekDayIteration >= 7) {
          weekDayIteration = 0;
        }
      }
    }

    for (let i: number = 1; i <= daysInMonth; i++) {
      const date: Date = new Date(this.state.currentViewDateStart);
      const isToday = this.compareDates(new Date(), date, EDatePickerEqType.EQ);
      let isSelectable: boolean = true;

      date.setDate(i);

      if (
        this.props.boundDate &&
        this.props.boundDateMode === 'before' &&
        this.compareDates(this.props.boundDate, date, EDatePickerEqType.GT)
      ) {
        isSelectable = false;
      }

      if (
        this.props.boundDate &&
        this.props.boundDateMode === 'after' &&
        this.compareDates(this.props.boundDate, date, EDatePickerEqType.LT)
      ) {
        isSelectable = false;
      }

      days.push({
        isSelectable,
        active: true,
        date,
        isToday,
      });

      weekDayIteration++;

      if (weekDayIteration === 7) {
        weekDayIteration = 0;
      }
    }

    const nextMonth: Date = new Date(this.state.currentViewDateStart);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const date: Date = new Date(SUNDAY);

    date.setDate(date.getDate() + this.props.weekStartDay);

    if (weekDayIteration > 0) {
      for (let i = 0, count = 7 - weekDayIteration; i < count; i++) {
        const date: Date = new Date(nextMonth);
        const isToday = this.compareDates(
          new Date(),
          date,
          EDatePickerEqType.EQ,
        );
        let isSelectable: boolean = true;

        date.setDate(i + 1);

        if (
          this.props.boundDate &&
          this.props.boundDateMode === 'before' &&
          this.compareDates(this.props.boundDate, date, EDatePickerEqType.GT)
        ) {
          isSelectable = false;
        }

        if (
          this.props.boundDate &&
          this.props.boundDateMode === 'after' &&
          this.compareDates(this.props.boundDate, date, EDatePickerEqType.LT)
        ) {
          isSelectable = false;
        }

        days.push({
          isSelectable,
          active: false,
          date,
          isToday,
        });
      }
    }

    return days;
  }

  public componentDidUpdate(prevProps: IDatePickerProps) {
    if (this.props.value.getTime() !== prevProps.value.getTime()) {
      this.setState({
        value: this.props.value,
      });

      this.setContextValue(this.props.value);
    }
  }

  public componentDidMount() {
    this.setState({
      value: this.props.value,
    });

    if (this.formContext && this.props.validator) {
      this.formContext.setModelFieldValidator(this.props.name, [
        this.props.validator,
      ]);
    }

    this.setContextValue(this.props.value);
    this.setCurrentViewDates(this.props.value);
  }

  private setCurrentViewDates(date: Date): void {
    const firstDayDate: Date = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayDate: Date = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    );

    this.setState({
      currentViewDateStart: firstDayDate,
      currentViewDateEnd: lastDayDate,
    });
  }

  private prev(): void {
    switch (this.state.mode) {
      case EDatePickerMode.Days: {
        const date: Date = new Date(this.state.currentViewDateStart);
        date.setMonth(date.getMonth() - 1);
        this.setCurrentViewDates(date);

        break;
      }

      case EDatePickerMode.Months: {
        const date: Date = new Date(this.state.currentViewDateStart);
        date.setFullYear(date.getFullYear() - 1);
        this.setCurrentViewDates(date);

        break;
      }

      case EDatePickerMode.Years: {
        const date: Date = new Date(this.state.currentViewDateStart);
        date.setFullYear(date.getFullYear() - YEARS_VIEW_COUNT);
        this.setCurrentViewDates(date);

        break;
      }
    }
  }

  private next(): void {
    switch (this.state.mode) {
      case EDatePickerMode.Days: {
        const date: Date = new Date(this.state.currentViewDateStart);
        date.setMonth(date.getMonth() + 1);
        this.setCurrentViewDates(date);

        break;
      }

      case EDatePickerMode.Months: {
        const date: Date = new Date(this.state.currentViewDateStart);
        date.setFullYear(date.getFullYear() + 1);
        this.setCurrentViewDates(date);

        break;
      }

      case EDatePickerMode.Years: {
        const date: Date = new Date(this.state.currentViewDateStart);
        date.setFullYear(date.getFullYear() + YEARS_VIEW_COUNT);
        this.setCurrentViewDates(date);

        console.log(date);

        break;
      }
    }
  }

  private compareYears(d1: Date, d2: Date, eqType: EDatePickerEqType): boolean {
    switch (eqType) {
      case EDatePickerEqType.LT: {
        return d1.getFullYear() < d2.getFullYear();
      }

      case EDatePickerEqType.GT: {
        return d1.getFullYear() > d2.getFullYear();
      }

      case EDatePickerEqType.EQ:
      default: {
        return d1.getFullYear() === d2.getFullYear();
      }
    }
  }

  private compareMonths(
    d1: Date,
    d2: Date,
    eqType: EDatePickerEqType,
  ): boolean {
    switch (eqType) {
      case EDatePickerEqType.LT: {
        return (
          d1.getFullYear() < d2.getFullYear() ||
          (d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() < d2.getMonth())
        );
      }

      case EDatePickerEqType.GT: {
        return (
          d1.getFullYear() > d2.getFullYear() ||
          (d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() > d2.getMonth())
        );
      }

      case EDatePickerEqType.EQ:
      default: {
        return (
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth()
        );
      }
    }
  }

  private compareDates(d1: Date, d2: Date, eqType: EDatePickerEqType): boolean {
    switch (eqType) {
      case EDatePickerEqType.LT: {
        return (
          d1.getFullYear() < d2.getFullYear() ||
          (d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() < d2.getMonth()) ||
          (d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() < d2.getDate())
        );
      }

      case EDatePickerEqType.GT: {
        return (
          d1.getFullYear() > d2.getFullYear() ||
          (d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() > d2.getMonth()) ||
          (d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() > d2.getDate())
        );
      }

      case EDatePickerEqType.EQ:
      default: {
        return (
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate()
        );
      }
    }
  }

  private getDayStyle(day: IDay) {
    const rules = [styles.entity, styles.entityDay];

    if (day.active) {
      rules.push(styles.entityActive);
    } else {
      rules.push(styles.entityInactive);
    }

    if (
      this.compareDates(day.date, this.state.currentDate, EDatePickerEqType.EQ)
    ) {
      rules.push(styles.entityCurrent);
    }

    if (this.compareDates(day.date, this.state.value, EDatePickerEqType.EQ)) {
      rules.push(styles.entitySelected);
    }

    if (!day.isSelectable) {
      rules.push(styles.entityUnselectable);
    }

    if (
      this.props.boundDate &&
      this.props.boundDateMode === 'after' &&
      this.compareDates(this.props.boundDate, day.date, EDatePickerEqType.GT) &&
      this.compareDates(this.state.value, day.date, EDatePickerEqType.LT)
    ) {
      rules.push(styles.entityRanged);
    }

    if (
      this.props.boundDate &&
      this.props.boundDateMode === 'after' &&
      this.compareDates(this.props.boundDate, day.date, EDatePickerEqType.EQ)
    ) {
      rules.push(styles.entityRanged);
    }

    if (
      this.props.boundDate &&
      this.props.boundDateMode === 'before' &&
      this.compareDates(this.props.boundDate, day.date, EDatePickerEqType.LT) &&
      this.compareDates(this.state.value, day.date, EDatePickerEqType.GT)
    ) {
      rules.push(styles.entityRanged);
    }

    if (
      this.props.boundDate &&
      this.props.boundDateMode === 'before' &&
      this.compareDates(this.props.boundDate, day.date, EDatePickerEqType.EQ)
    ) {
      rules.push(styles.entityRanged);
    }

    return rules;
  }

  private getMonthStyle(month: IMonth) {
    const rules = [styles.entity, styles.entityMonth];

    if (
      this.compareMonths(month.date, this.state.value, EDatePickerEqType.EQ)
    ) {
      rules.push(styles.entitySelected);
    }

    if (!month.isSelectable) {
      rules.push(styles.entityUnselectable);
    }

    return rules;
  }

  private getYearStyle(year: IYear) {
    const rules = [styles.entity, styles.entityYear];

    if (this.compareYears(year.date, this.state.value, EDatePickerEqType.EQ)) {
      rules.push(styles.entitySelected);
    }

    if (!year.isSelectable) {
      rules.push(styles.entityUnselectable);
    }

    return rules;
  }

  private selectYear(year: IYear): void {
    if (year.isSelectable) {
      this.setCurrentViewDates(year.date);
      this.setMode(EDatePickerMode.Months);
    }
  }

  private selectMonth(month: IMonth): void {
    if (month.isSelectable) {
      this.setCurrentViewDates(month.date);
      this.setMode(EDatePickerMode.Days);
    }
  }

  private selectDay(day: IDay): void {
    if (day.isSelectable) {
      this.setSelectedDate(day.date);
    }
  }

  private setMode(mode: EDatePickerMode): void {
    if (mode === this.state.mode) {
      mode = DEFAULT_MODE;
    }

    this.setState({
      mode: mode,
    });
  }

  public shouldComponentUpdate(
    nextProps: IDatePickerProps,
    nextState: IDatePickerState,
  ): boolean {
    if (this.state.value.getTime() !== nextState.value.getTime()) {
      return true;
    }

    if (this.state.mode !== nextState.mode) {
      return true;
    }

    if (this.state.isFocused !== nextState.isFocused) {
      return true;
    }

    if (this.state.isOpened !== nextState.isOpened) {
      return true;
    }

    if (
      this.props.boundDate &&
      nextProps.boundDate &&
      this.props.boundDate.getTime() !== nextProps.boundDate.getTime()
    ) {
      return true;
    }

    if (
      this.props.boundDateMode &&
      nextProps.boundDateMode &&
      this.props.boundDateMode !== nextProps.boundDateMode
    ) {
      return true;
    }

    if (this.state.currentDate.getTime() !== nextState.currentDate.getTime()) {
      return true;
    }

    if (
      !this.state.currentViewDateStart ||
      this.state.currentViewDateStart.getTime() !==
        nextState.currentViewDateStart.getTime()
    ) {
      return true;
    }

    if (
      !this.state.currentViewDateStart ||
      this.state.currentViewDateEnd.getTime() !==
        nextState.currentViewDateEnd.getTime()
    ) {
      return true;
    }

    if (this.props.locale !== nextProps.locale) {
      return true;
    }

    if (this.props.value.getTime() !== nextProps.value.getTime()) {
      return true;
    }

    if (this.props.weekStartDay !== nextProps.weekStartDay) {
      return true;
    }

    return false;
  }

  mouseDownRootHandler = () => {
    this.isMouseDown = true;
  };

  mouseUpRootHandler = () => {
    this.isMouseDown = false;
  };

  handleOutsideClick = () => {
    if (this.isMouseDown) {
      return;
    }

    this.close();
  };

  handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { isOpened } = this.state;

    switch (event.keyCode) {
      // Space
      case 32: {
        if (!isOpened) {
          this.open();
        } else {
          this.close();
        }

        break;
      }

      // Up
      case 38: {
        if (isOpened) {
          event.stopPropagation();
          event.preventDefault();
        } else {
          this.open();
        }

        break;
      }

      // Down
      case 40: {
        if (isOpened) {
          event.stopPropagation();
          event.preventDefault();
        } else {
          this.open();
        }

        break;
      }

      // Enter
      case 13: {
        if (isOpened) {
          this.close();
        } else {
          this.open();
        }

        break;
      }
    }
  };

  open = () => {
    this.setState({
      isOpened: true,
    });

    document.addEventListener('mousedown', this.handleOutsideClick, false);
  };

  close = () => {
    this.setState({
      isOpened: false,
    });

    document.removeEventListener('mousedown', this.handleOutsideClick, false);
  };

  mouseDownHandler = () => {
    if (this.state.isOpened) {
      this.close();
    } else {
      this.open();
    }
  };

  handleFocus = () => {
    if (this.formContext) {
      this.formContext.clearFieldValidation(this.props.name);
    }
  };

  handleBlur = () => {
    this.setState({
      isFocused: false,
    });

    if (this.isMouseDown) {
      return;
    }

    this.close();
  };

  setSelectedDate(date: Date) {
    let dateIsValid = true;
    const { boundDate, boundDateMode } = this.props;

    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);

    if (boundDate && boundDateMode) {
      boundDate.setMilliseconds(0);
      boundDate.setSeconds(0);
      boundDate.setMinutes(0);
      boundDate.setHours(0);

      switch (boundDateMode) {
        case 'after': {
          if (boundDate.getTime() < date.getTime()) {
            dateIsValid = false;
          }

          break;
        }

        case 'before': {
          if (boundDate.getTime() > date.getTime()) {
            dateIsValid = false;
          }

          break;
        }
      }
    }

    if (dateIsValid) {
      this.setState({
        value: date,
      });

      this.setCurrentViewDates(date);
      this.setContextValue(date);
    }

    if (this.props.onChange) {
      this.props.onChange(date);
    }
  }

  setContextValue(date: Date) {
    if (this.formContext) {
      this.formContext.setModelFieldValue(
        this.props.name,
        date.toDateString(),
        date,
      );

      this.formContext.clearFieldValidation(this.props.name);
    }
  }

  render() {
    if (this.state.currentViewDateEnd && this.state.currentViewDateStart) {
      let years: IYear[] = [];
      let months: IMonth[] = [];
      let days: IDay[] = [];

      switch (this.state.mode) {
        case EDatePickerMode.Years: {
          years = this.getYears();
          break;
        }

        case EDatePickerMode.Months: {
          months = this.getMonths();
          break;
        }

        case EDatePickerMode.Days: {
          days = this.getDays();
          break;
        }
      }

      return (
        <FormContext.Consumer>
          {context => {
            if (!this.formContext) {
              this.formContext = context;
            }

            // const errors = context.getFieldErrors(this.props.name);

            return (
              <div
                css={styles.root}
                onKeyDown={this.handleKeydown}
                onMouseDown={this.mouseDownRootHandler}
                onMouseUp={this.mouseUpRootHandler}
                onFocus={this.handleFocus}
                onKeyUp={() => {
                  this.setState({
                    isFocused: true,
                  });
                }}
                onBlur={this.handleBlur}
                tabIndex={this.props.tabIndex}
              >
                <div
                  onMouseDown={this.mouseDownHandler}
                  className={`${this.state.isFocused ? 'focused' : ''} ${
                    this.state.isOpened ? 'opened' : ''
                  }`}
                  css={[styles.input, styles.sizes[this.props.size || 'large']]}
                >
                  <Icon
                    css={styles.datepickerIcon}
                    color={'rgb(var(--TEXT_FADED))'}
                    width="16px"
                    height="16px"
                    name={EIconName.Scheduler}
                  />

                  <span>
                    {this.state.value.toLocaleDateString(this.props.locale)}
                  </span>
                </div>

                <ClassNames>
                  {({ css }) => (
                    <CSSTransition
                      unmountOnExit
                      appear
                      in={this.state.isOpened}
                      timeout={ANIMATION_TIME}
                      onExited={() => {
                        this.setState({
                          mode: EDatePickerMode.Days,
                        });
                      }}
                      classNames={{
                        enter: css(animations.enter),
                        enterActive: css(animations.enterActive),
                        exit: css(animations.exit),
                        exitActive: css(animations.exitActive),
                      }}
                    >
                      <div css={styles.content}>
                        <div css={styles.controls}>
                          <span
                            css={[styles.controlsButton, styles.prevControl]}
                            onClick={this.prev.bind(this)}
                          >
                            <Icon
                              css={styles.prevControlIcon}
                              name={EIconName.Arrow}
                              width="12px"
                              height="12px"
                              color={'rgb(var(--TEXT_FADED))'}
                            />
                          </span>

                          <span
                            onClick={this.setMode.bind(
                              this,
                              EDatePickerMode.Years,
                            )}
                            css={[
                              styles.controlsButton,
                              styles.controlsButtonGroup,
                            ]}
                          >
                            {this.state.mode === EDatePickerMode.Days && (
                              <React.Fragment>
                                <span css={styles.yearControl}>
                                  {this.state.currentViewDateStart.toLocaleDateString(
                                    this.props.locale,
                                    {
                                      month: 'long',
                                      year: 'numeric',
                                    },
                                  )}
                                </span>
                              </React.Fragment>
                            )}

                            {this.state.mode === EDatePickerMode.Months && (
                              <React.Fragment>
                                <span css={styles.yearControl}>
                                  {this.state.currentViewDateStart.toLocaleDateString(
                                    this.props.locale,
                                    {
                                      year: 'numeric',
                                    },
                                  )}
                                </span>
                              </React.Fragment>
                            )}

                            {this.state.mode === EDatePickerMode.Years && (
                              <React.Fragment>
                                <span css={styles.yearControl}>
                                  {years[0].date.toLocaleDateString(
                                    this.props.locale,
                                    {
                                      year: 'numeric',
                                    },
                                  )}
                                  {'–'}
                                  {years[
                                    years.length - 1
                                  ].date.toLocaleDateString(this.props.locale, {
                                    year: 'numeric',
                                  })}
                                </span>
                              </React.Fragment>
                            )}
                          </span>

                          <span
                            css={[styles.controlsButton, styles.nextControl]}
                            onClick={this.next.bind(this)}
                          >
                            <Icon
                              css={styles.nextControlIcon}
                              name={EIconName.Arrow}
                              width="12px"
                              height="12px"
                              color={'rgb(var(--TEXT_FADED))'}
                            />
                          </span>
                        </div>

                        {this.state.mode === EDatePickerMode.Days && (
                          <React.Fragment>
                            <div css={styles.header}>
                              {this.getHeaderItems().map((item, i) => {
                                return (
                                  <div css={styles.headerItem} key={i}>
                                    {item.title}
                                  </div>
                                );
                              })}
                            </div>

                            <div css={styles.body}>
                              {days.map((item, i) => {
                                return (
                                  <div
                                    onClick={this.selectDay.bind(this, item)}
                                    css={this.getDayStyle(item)}
                                    key={i}
                                  >
                                    <span css={styles.entityTitle}>
                                      {item.date.toLocaleDateString(
                                        this.props.locale,
                                        {
                                          day: 'numeric',
                                        },
                                      )}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </React.Fragment>
                        )}

                        {this.state.mode === EDatePickerMode.Months && (
                          <div css={styles.body}>
                            {months.map((month: IMonth, i) => {
                              return (
                                <div
                                  key={i}
                                  css={this.getMonthStyle(month)}
                                  onClick={this.selectMonth.bind(this, month)}
                                >
                                  <span css={styles.entityTitle}>
                                    {month.date.toLocaleDateString(
                                      this.props.locale,
                                      {
                                        month: 'short',
                                      },
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {this.state.mode === EDatePickerMode.Years && (
                          <div css={styles.body}>
                            {years.map((year: IYear, i) => {
                              return (
                                <div
                                  key={i}
                                  css={this.getYearStyle(year)}
                                  onClick={this.selectYear.bind(this, year)}
                                >
                                  <span css={styles.entityTitle}>
                                    {year.date.toLocaleDateString(
                                      this.props.locale,
                                      {
                                        year: 'numeric',
                                      },
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        <div css={styles.buttons}>
                          <div css={styles.buttonContainer}>
                            <Button
                              tabIndex={-1}
                              color="default"
                              size="small"
                              onClick={this.close}
                              disabled={
                                this.state.mode !== EDatePickerMode.Days
                              }
                            >
                              Ok
                            </Button>
                          </div>

                          <div css={styles.buttonContainer}>
                            <Button
                              tabIndex={-1}
                              color="faded"
                              size="small"
                              onClick={() => {
                                this.setSelectedDate(new Date());
                              }}
                            >
                              Today
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CSSTransition>
                  )}
                </ClassNames>
              </div>
            );
          }}
        </FormContext.Consumer>
      );
    } else {
      return null;
    }
  }
}

const styles = {
  root: css`
    position: relative;
    outline: none;
  `,

  datepickerIcon: css`
    height: 100%;
    margin-right: var(--INPUT_SIDE_PADDING);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  `,

  prevControl: css`
    cursor: pointer;
    width: ${DAY_SIZE}px;
    padding: 0;
  `,

  prevControlIcon: css`
    transform: rotateZ(90deg) translateY(1px);
  `,

  nextControl: css`
    cursor: pointer;
    width: ${DAY_SIZE}px;
    padding: 0;
  `,

  nextControlIcon: css`
    transform: rotateZ(-90deg) translateY(1px);
  `,

  montYearControl: css`
    margin: 0 0.5ex;
    text-transform: capitalize;
  `,

  yearControl: css`
    margin: 0 0.5ex;
  `,

  controlsButtonGroup: css``,

  controlsButton: css`
    height: ${DAY_SIZE}px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    font-size: var(--FONT_SIZE_BASE);
    color: rgb(var(--TEXT_ACCENT));
    border-radius: var(--BORDER_RADIUS_LARGE);
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgb(var(--INPUT_BG_ACCENT));
    }
  `,

  content: css`
    width: ${DAY_SIZE * 7}px;
    user-select: none;
    position: absolute;
    background-color: rgb(var(--INPUT_BG));
    box-shadow: var(--ELEVATION_SHADOW_3);
    padding: var(--INPUT_SIDE_PADDING);
    border-radius: var(--BORDER_RADIUS_SMALL);
    border: 1px solid rgb(var(--ELEMENT_BORDER));
    top: calc(100% + 11px);
    left: 0;
    z-index: 10;

    &:before,
    &:after {
      bottom: 100%;
      left: 20px;
      border: solid transparent;
      content: ' ';
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:after {
      border-color: none;
      border-bottom-color: rgb(var(--INPUT_BG));
      border-width: 11px;
      margin-left: -11px;
    }

    &:before {
      border-color: none;
      border-bottom-color: rgb(var(--ELEMENT_BORDER));
      border-width: 12px;
      margin-left: -12px;
    }
  `,

  buttons: css`
    display: flex;
    justify-content: space-between;
    padding-top: 12px;
  `,

  buttonContainer: css`
    width: calc(50% - 6px);
    display: grid;
  `,

  controls: css`
    display: flex;
    justify-content: space-between;
  `,

  header: css`
    display: flex;
    width: 100%;
    justify-content: center;
  `,

  headerItem: css`
    flex-grow: 0;
    height: ${DAY_SIZE}px;
    width: ${DAY_SIZE}px;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    text-transform: uppercase;
    font-size: var(--FONT_SIZE_SMALL);
    color: rgb(var(--TEXT_FADED));
  `,

  entity: css`
    flex-grow: 0;
    flex-shrink: 0;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    height: ${DAY_SIZE - 6}px;
    width: ${DAY_SIZE - 6}px;
    position: relative;
    cursor: pointer;
    font-size: var(--FONT_SIZE_SMALL);
    margin: 2px;
    border: 1px solid transparent;
    border-radius: ${DAY_SIZE - 6}px;

    &:hover {
      background-color: rgb(var(--INPUT_BG_ACCENT));
    }
  `,

  entityDay: css``,

  entityYear: css`
    width: calc(25% - 6px);
  `,

  entityMonth: css`
    width: calc(25% - 6px);
  `,

  entityActive: css``,

  entityInactive: css`
    opacity: 0.6;
  `,

  entityCurrent: css`
    color: rgb(var(--TEXT_ACCENT));
    border-color: rgb(var(--ELEMENT_BORDER));
  `,

  entitySelected: css`
    font-weight: 600;
    color: rgb(var(--BUTTON_TEXT));
    background-color: rgb(var(--INPUT_BORDER_ACTIVE)) !important;
    border-color: rgb(var(--INPUT_BORDER_ACTIVE));
  `,

  entityUnselectable: css`
    opacity: 0.2;
    cursor: default;
    pointer-events: none;
  `,

  entityRanged: css``,

  body: css`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  `,

  entityTitle: css``,

  input: css`
    width: 100%;
    outline: none;
    -webkit-appearance: none;
    display: flex;
    cursor: pointer;
    align-items: center;
    border: 1px solid rgb(var(--ELEMENT_BORDER));
    background-color: rgb(var(--INPUT_BG));
    border-radius: var(--BORDER_RADIUS_SMALL);
    color: rgb(var(--TEXT_ACCENT));
    font-family: var(--FONT_FAMILY);
    padding: 0 var(--INPUT_SIDE_PADDING);
    box-sizing: border-box;
    font-size: var(--FONT_SIZE_BASE);
    text-overflow: ellipsis;
    transition: border-color 0.2s;

    &:hover {
      border-color: rgb(var(--INPUT_BORDER_ACCENT));
    }

    &.focused {
      border-color: rgb(var(--INPUT_BORDER_ACTIVE));
    }

    &.opened {
      border-color: rgb(var(--ELEMENT_BORDER));
    }

    &.error {
      border-color: rgb(var(--INPUT_BORDER_ERROR));
    }

    &:disabled {
      color: rgb(var(--TEXT));
      opacity: 0.5;
      pointer-events: none;
    }
  `,

  sizes: {
    small: css`
      height: var(--INPUT_HEIGHT_SMALL);
    `,

    large: css`
      height: var(--INPUT_HEIGHT_LARGE);
    `,
  },
};

const animations = {
  enter: css`
    opacity: 0;
  `,
  enterActive: css`
    opacity: 1;
    transition-duration: ${ANIMATION_TIME}ms;
  `,
  exit: css`
    opacity: 1;
  `,
  exitActive: css`
    opacity: 0;
    transition-duration: ${ANIMATION_TIME}ms;
  `,
};
