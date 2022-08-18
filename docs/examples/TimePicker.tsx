import React from 'react';
import { TimePicker,  } from '../../src';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export default () => {
  const onChange = (time: Dayjs, timeString: string) => {
    console.log(time, timeString);
  };

  return (
    <TimePicker onChange={onChange} defaultValue={dayjs('00:00:00', 'HH:mm:ss')} />
  );
};
