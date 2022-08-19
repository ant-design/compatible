import * as React from 'react';
import { AutoComplete } from 'antd';
import warning from 'rc-util/lib/warning';

type AutoCompleteProps = Parameters<typeof AutoComplete>[0];
type AutoCompleteRef = AutoCompleteProps['ref'];

type CompatibleAutoCompleteProps = AutoCompleteProps & {
  /** @deprecated Please use `popupClassName` instead. */
  dropdownClassName?: string;
};

const CompatibleAutoComplete = React.forwardRef(
  (
    { dropdownClassName, popupClassName, ...restProps }: CompatibleAutoCompleteProps,
    ref: AutoCompleteRef,
  ) => {
    warning(
      !dropdownClassName,
      "[antd: AutoComplete] `dropdownClassName` is removed in v5, please use `popupClassName` instead.",
    );

    return (
      <AutoComplete {...restProps} popupClassName={popupClassName || dropdownClassName} ref={ref} />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  CompatibleAutoComplete.displayName = 'CompatibleAutoComplete';
}

export default CompatibleAutoComplete;
