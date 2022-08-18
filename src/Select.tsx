import * as React from 'react';
import { Select } from 'antd';
import warning from 'rc-util/lib/warning';
import  type { Option } from 'rc-select';
type SelectProps = Parameters<typeof Select>[0];
type SelectRef = SelectProps['ref'];

type CompatibleSelectProps = SelectProps& {
  /** @deprecated Please use `popupClassName` instead. */
  dropdownClassName?: string;
};

const CompatibleSelect = React.forwardRef(
  (
    { dropdownClassName, popupClassName, ...restProps }: CompatibleSelectProps,
    ref: SelectRef,
  ) => {
    warning(
      !dropdownClassName,
      `[Compatible: Select] 'dropdownClassName' is deprecated. Please use 'popupClassName' instead.`,
    );

    return (
      <Select {...restProps} popupClassName={popupClassName || dropdownClassName} ref={ref} />
    );
  },
)  as unknown as ((
  props: React.PropsWithChildren<SelectProps>,
) => React.ReactElement) & {
  displayName: string;
  Option: typeof Option;
};

if (process.env.NODE_ENV !== 'production') {
  CompatibleSelect.displayName = 'CompatibleSelect';
}

export default CompatibleSelect;
