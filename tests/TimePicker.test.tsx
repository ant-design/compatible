import React from 'react';
import { TimePicker } from '../src';
import { render } from '@testing-library/react';

describe('TimePicker', () => {


  it('TimePicker dropdownClassName', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <TimePicker
        dropdownClassName="test"
      />,
    );

    expect(errSpy).toHaveBeenNthCalledWith(1,
      "Warning: [antd: TimePicker] `dropdownClassName` is deprecated which will be removed in next major version. Please use `popupClassName` instead."
    );

    // TODO: Remove this when antd release version
    // expect(container.querySelector('.test')).toBeTruthy();

    errSpy.mockRestore();
  });

  it('TimePicker.RangePicker dropdownClassName', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <TimePicker.RangePicker
        dropdownClassName="test"
      />,
    );

    expect(errSpy).toHaveBeenNthCalledWith(1,
      "Warning: [antd: RangePicker] `dropdownClassName` is deprecated which will be removed in next major version. Please use `popupClassName` instead."
    );

    // TODO: Remove this when antd release version
    // expect(container.querySelector('.test')).toBeTruthy();

    errSpy.mockRestore();
  });
});
