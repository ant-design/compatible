import React from 'react';
import { Mentions } from '../../src';
import type { OptionProps } from 'antd/es/mentions';

const { Option } = Mentions;

const onChange = (value: string) => {
  console.log('Change:', value);
};

const onSelect = (option: OptionProps) => {
  console.log('select', option);
};

export default () => {
  return (
    <Mentions
      style={{ width: '100%' }}
      onChange={onChange}
      onSelect={onSelect}
      defaultValue="@afc163"
    >
      <Option value="afc163">afc163</Option>
      <Option value="zombieJ">zombieJ</Option>
      <Option value="yesmeck">yesmeck</Option>
    </Mentions>
  );
};
