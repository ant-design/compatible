import React from 'react';
import { DatePicker, } from '../../src';
import { Space } from 'antd';
const { RangePicker } = DatePicker;

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

export default () => (
  <Space direction="vertical" size={12}>
    <DatePicker onChange={onChange} />
    <RangePicker />
  </Space>
);
