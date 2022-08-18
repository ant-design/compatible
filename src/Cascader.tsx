import * as React from 'react';
import { Cascader } from 'antd';
import warning from 'rc-util/lib/warning';

type CascaderProps = Parameters<typeof Cascader>[0];
type CascaderRef = CascaderProps['ref'];

type CompatibleCascaderProps = CascaderProps & {
  /** @deprecated Please use `popupClassName` instead. */
  dropdownClassName?: string;
};

const CompatibleCascader = React.forwardRef(
  (
    { dropdownClassName, popupClassName, ...restProps }: CompatibleCascaderProps,
    ref: CascaderRef,
  ) => {
    warning(
      !dropdownClassName,
      `[Compatible: Cascader] 'dropdownClassName' is deprecated. Please use 'popupClassName' instead.`,
    );

    return (
      <Cascader {...restProps} popupClassName={popupClassName || dropdownClassName} ref={ref} />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  CompatibleCascader.displayName = 'CompatibleCascader';
}

export default CompatibleCascader;
