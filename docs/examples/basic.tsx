import React from 'react';
import { AutoComplete, ConfigProvider } from '../../src';

export default () => {
  return (
    <AutoComplete
      style={{ width: 200 }}
      options={[
        {
          label: 'bamboo',
          value: 'bamboo',
        },
        {
          label: 'little',
          value: 'little',
        },
      ]}
    />
  );
};
