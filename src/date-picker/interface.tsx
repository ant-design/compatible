import * as React from 'react';
import * as moment from 'moment';
import { TimePickerProps } from '../time-picker';
import { tuple } from '../_util/type';

export interface PickerProps {
  id?: number | string;
  name?: string;
  prefixCls?: string;
  inputPrefixCls?: string;
  format?: string | string[];
  disabled?: boolean;
  allowClear?: boolean;
  className?: string;
  pickerClass?: string;
  pickerInputClass?: string;
  suffixIcon?: React.ReactNode;
  style?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  dropdownClassName?: string;
  locale?: any;
  size?: 'large' | 'small' | 'default';
  getCalendarContainer?: (triggerNode: Element) => HTMLElement;
  open?: boolean;
  onOpenChange?: (status: boolean) => void;
  disabledDate?: (current: moment.Moment | null) => boolean;
  dateRender?: (
    current: moment.Moment,
    today: moment.Moment,
  ) => React.ReactNode;
  autoFocus?: boolean;
  onFocus?: React.FocusEventHandler;
  onBlur?: (e: React.SyntheticEvent) => void;
}

export interface SinglePickerProps {
  value?: moment.Moment | null;
  defaultValue?: moment.Moment | null;
  defaultPickerValue?: moment.Moment | null;
  placeholder?: string;
  renderExtraFooter?: (mode: DatePickerMode) => React.ReactNode;
  onChange?: (date: moment.Moment | null, dateString: string) => void;
}

const DatePickerModes = tuple('time', 'date', 'month', 'year', 'decade');
export type DatePickerMode = typeof DatePickerModes[number];

export interface DatePickerProps extends PickerProps, SinglePickerProps {
  showTime?: TimePickerProps | boolean;
  showToday?: boolean;
  open?: boolean;
  disabledTime?: (
    current?: moment.Moment | null,
  ) => {
    disabledHours?: () => number[];
    disabledMinutes?: () => number[];
    disabledSeconds?: () => number[];
  };
  onOpenChange?: (status: boolean) => void;
  onPanelChange?: (value: moment.Moment | null, mode: DatePickerMode) => void;
  onOk?: (selectedTime: moment.Moment | null) => void;
  mode?: DatePickerMode;
}

export interface MonthPickerProps extends PickerProps, SinglePickerProps {
  monthCellContentRender?: (
    date: moment.Moment,
    locale: any,
  ) => React.ReactNode;
}

export type RangePickerValue =
  | undefined[]
  | null[]
  | [moment.Moment]
  | [undefined, moment.Moment]
  | [moment.Moment, undefined]
  | [null, moment.Moment]
  | [moment.Moment, null]
  | [moment.Moment, moment.Moment];
export type RangePickerPresetRange =
  | RangePickerValue
  | (() => RangePickerValue);

export interface RangePickerProps extends PickerProps {
  className?: string;
  tagPrefixCls?: string;
  value?: RangePickerValue;
  defaultValue?: RangePickerValue;
  defaultPickerValue?: RangePickerValue;
  timePicker?: React.ReactNode;
  onChange?: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  onCalendarChange?: (
    dates: RangePickerValue,
    dateStrings: [string, string],
  ) => void;
  onOk?: (selectedTime: RangePickerPresetRange) => void;
  showTime?: TimePickerProps | boolean;
  showToday?: boolean;
  ranges?: Record<string, RangePickerPresetRange>;
  placeholder?: [string, string];
  mode?: string | string[];
  separator?: React.ReactNode;
  disabledTime?: (
    current: RangePickerValue,
    type: string,
  ) => {
    disabledHours?: () => number[];
    disabledMinutes?: () => number[];
    disabledSeconds?: () => number[];
  };
  onPanelChange?: (value?: RangePickerValue, mode?: string | string[]) => void;
  renderExtraFooter?: () => React.ReactNode;
  onMouseEnter?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export interface WeekPickerProps extends PickerProps, SinglePickerProps {
  // - currently no own props -
}

export interface DatePickerDecorator
  extends React.ClassicComponentClass<DatePickerProps> {
  RangePicker: React.ClassicComponentClass<RangePickerProps>;
  MonthPicker: React.ClassicComponentClass<MonthPickerProps>;
  WeekPicker: React.ClassicComponentClass<WeekPickerProps>;
}
