import React from 'react';
import { DatePicker, } from '../../src';
import type { DatePickerProps } from '../../src';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

export default () => (
  <>
    <DatePicker onChange={onChange} />
  </>
);
