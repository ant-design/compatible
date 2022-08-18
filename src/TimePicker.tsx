import * as React from 'react';
import { TimePicker } from 'antd';
import warning from 'rc-util/lib/warning';

type TimePickerProps = Parameters<typeof TimePicker>[0];
type TimePickerRef = TimePickerProps['ref'];

type CompatibleTimePickerProps = TimePickerProps & {
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
      `[Compatible: TimePicker] 'dropdownClassName' is deprecated. Please use 'popupClassName' instead.`,
    );

    return (
      <TimePicker {...restProps} popupClassName={popupClassName || dropdownClassName} ref={ref} />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  CompatibleTimePicker.displayName = 'CompatibleTimePicker';
}

export default CompatibleTimePicker;
