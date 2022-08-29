import * as React from 'react';
import { DatePicker } from 'antd';

import warning from 'rc-util/lib/warning';

type FCProps<Component> = Component extends React.ComponentType<infer Props> ? Props : never;
type InferProps = FCProps<typeof DatePicker>;

type CompatibleDatePickerProps = InferProps & {
  /** @deprecated Please use `popupClassName` instead. */
  dropdownClassName?: string;
  popupClassName?: string;
}

const CompatibleDatePicker = React.forwardRef(
  (
    { dropdownClassName, popupClassName,...restProps }: CompatibleDatePickerProps,
      ref
  ) => {
    warning(
      !dropdownClassName,
      "[antd: DatePicker] `dropdownClassName` is removed in v5, please use `popupClassName` instead.",
    );

    return (
      <DatePicker {...restProps} popupClassName={popupClassName || dropdownClassName} ref={ref} />
    );
  },
);


CompatibleDatePicker.RangePicker = React.forwardRef(
  (
    { dropdownClassName, popupClassName,...restProps }: CompatibleDatePickerProps,
    ref
  ) => {
    console.log('dropdownClassName--->>>',dropdownClassName)
    warning(
      !dropdownClassName,
      "[antd: RangePicker] `dropdownClassName` is removed in v5, please use `popupClassName` instead.",
    );

    return (
      <DatePicker.RangePicker {...restProps} popupClassName={popupClassName || dropdownClassName} ref={ref} />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  CompatibleDatePicker.displayName = 'CompatibleDatePicker';
}

export default CompatibleDatePicker;
