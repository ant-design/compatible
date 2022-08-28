import * as React from 'react';
import { TimePicker } from 'antd';
import warning from 'rc-util/lib/warning';

type TimePickerProps = Parameters<typeof TimePicker>[0];
type TimePickerRef = TimePickerProps['ref'];

type RangePickerProps = Parameters<typeof TimePicker>[0];
type RangePickerRef = RangePickerProps['ref'];

type CompatibleTimePickerProps = TimePickerProps & {
  /** @deprecated Please use `popupClassName` instead. */
  dropdownClassName?: string;
};

type CompatibleRangePickerProps = RangePickerProps & {
  /** @deprecated Please use `popupClassName` instead. */
  dropdownClassName?: string;
};

const CompatibleTimePicker = React.forwardRef(
  (
    { dropdownClassName, popupClassName, ...restProps }: CompatibleTimePickerProps,
    ref: TimePickerRef,
  ) => {
    warning(
      !dropdownClassName,
      "[antd: TimePicker] `dropdownClassName` is removed in v5, please use `popupClassName` instead.",
    );

    return (
      <TimePicker {...restProps} popupClassName={popupClassName || dropdownClassName} ref={ref} />
    );
  },
);



CompatibleTimePicker.RangePicker = React.forwardRef(
  (
    { dropdownClassName, popupClassName, ...restProps }: CompatibleRangePickerProps,
    ref: RangePickerRef,
  ) => {
    warning(
      !dropdownClassName,
      "[antd: RangePicker] `dropdownClassName` is removed in v5, please use `popupClassName` instead.",
    );

    return (
      <TimePicker.RangePicker {...restProps} popupClassName={popupClassName || dropdownClassName} ref={ref} />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  CompatibleTimePicker.displayName = 'CompatibleTimePicker';
}
export default CompatibleTimePicker;
