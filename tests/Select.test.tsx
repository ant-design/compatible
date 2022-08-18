import React from 'react';
import { Select } from '../src';
import { render } from '@testing-library/react';

describe('Select', () => {
  it('dropdownClassName', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <Select
        open
        dropdownClassName="test"
        value="1"
      >
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">2</Select.Option>
      </Select>,
    );

    expect(errSpy).toHaveBeenCalledWith(
      "Warning: [Compatible: Select] 'dropdownClassName' is deprecated. Please use 'popupClassName' instead.",
    );

    // TODO: Remove this when antd release version
    // expect(container.querySelector('.test')).toBeTruthy();

    errSpy.mockRestore();
  });
});
