import React from 'react';
import { Select } from '../../src';
const { Option } = Select;
console.log('Select',Select)
export default () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
      <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
  );
};
