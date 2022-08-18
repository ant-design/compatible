import React from 'react';
import { Cascader } from '../src';
import { render } from '@testing-library/react';

describe('Cascader', () => {

  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

  it('dropdownClassName', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <Cascader options={options} dropdownClassName="test" />
    );

    expect(errSpy).toHaveBeenCalledWith(
      "Warning: [Compatible: Cascader] 'dropdownClassName' is deprecated. Please use 'popupClassName' instead.",
    );

    // TODO: Remove this when antd release version
    // expect(container.querySelector('.test')).toBeTruthy();

    errSpy.mockRestore();
  });
});
