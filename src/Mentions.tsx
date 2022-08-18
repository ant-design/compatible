import * as React from 'react';
import { Mentions } from 'antd';
import warning from 'rc-util/lib/warning';

type MentionsProps = Parameters<typeof Mentions>[0];
type MentionsRef = MentionsProps['ref'];

type CompatibleMentionsProps = MentionsProps & {
  /** @deprecated Please use `popupClassName` instead. */
  dropdownClassName?: string;
};

const CompatibleMentions = React.forwardRef(
  (
    { dropdownClassName, popupClassName, ...restProps }: CompatibleMentionsProps,
    ref: MentionsRef,
  ) => {
    warning(
      !dropdownClassName,
      `[Compatible: Mentions] 'dropdownClassName' is deprecated. Please use 'popupClassName' instead.`,
    );

    return (
      <Mentions {...restProps} popupClassName={popupClassName || dropdownClassName} ref={ref} />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  CompatibleMentions.displayName = 'CompatibleMentions';
}

export default CompatibleMentions;
