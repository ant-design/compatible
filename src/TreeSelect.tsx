import * as React from 'react';
import { TreeSelect } from 'antd';
import warning from 'rc-util/lib/warning';
import type { TreeNode } from 'rc-tree-select';
type TreeSelectProps = Parameters<typeof TreeSelect>[0];
type TreeSelectRef = TreeSelectProps['ref'];

type CompatibleTreeSelectProps = TreeSelectProps & {
  /** @deprecated Please use `popupClassName` instead. */
  dropdownClassName?: string;
};

const CompatibleTreeSelect = React.forwardRef(
  (
    { dropdownClassName, popupClassName, ...restProps }: CompatibleTreeSelectProps,
    ref: TreeSelectRef,
  ) => {
    warning(
      !dropdownClassName,
      `[Compatible: TreeSelect] 'dropdownClassName' is deprecated. Please use 'popupClassName' instead.`,
    );

    return (
    <TreeSelect {...restProps} popupClassName={popupClassName || dropdownClassName} ref={ref} />
    );
  },
) as unknown as ((
  props: React.PropsWithChildren<TreeSelectProps>,
) => React.ReactElement) & {
  displayName: string;
  TreeNode: typeof TreeNode;
};

if (process.env.NODE_ENV !== 'production') {
  CompatibleTreeSelect.displayName = 'CompatibleTreeSelect';
}

export default CompatibleTreeSelect;
