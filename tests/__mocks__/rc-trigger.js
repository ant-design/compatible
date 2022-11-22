import * as React from 'react';
import Trigger from 'rc-trigger/lib/mock';

export default React.forwardRef((props, ref) => {
  return <Trigger {...props} ref={ref} />;
});
