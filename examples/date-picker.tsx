import React from 'react';
import DatePicker from '../src/date-picker';
import 'antd/dist/antd.css';
import '../assets/index.css';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default function Demo() {
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  return (
    <div>
      <DatePicker onChange={onChange} />
      <br />
      <DatePicker onChange={onChange} showTime />
      <br />
      <MonthPicker onChange={onChange} placeholder="Select month" />
      <br />
      <RangePicker onChange={onChange} />
      <br />
      <WeekPicker onChange={onChange} placeholder="Select week" />
    </div>
  );
}
