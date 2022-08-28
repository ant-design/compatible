import React from 'react';
import { DatePicker} from '../src';
const { RangePicker } = DatePicker;
import { render } from '@testing-library/react';

describe('DatePicker', () => {
  it('DatePicker dropdownClassName', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <DatePicker dropdownClassName="test" />,
    );

    expect(errSpy).toHaveBeenCalledWith(
      "Warning: [antd: DatePicker] `dropdownClassName` is removed in v5, please use `popupClassName` instead.",
    );

      // TODO: Remove this when antd release version
    // expect(container.querySelector('.test')).toBeTruthy();

    errSpy.mockRestore();
  });

  it('DatePicker.RangePicker dropdownClassName', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <RangePicker dropdownClassName="test" />,
    );

    expect(errSpy).toHaveBeenCalledWith(
      "Warning: [antd: RangePicker] `dropdownClassName` is removed in v5, please use `popupClassName` instead.",
    );

    // TODO: Remove this when antd release version
    // expect(container.querySelector('.test')).toBeTruthy();

    errSpy.mockRestore();
  });
});
