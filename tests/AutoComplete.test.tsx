import React from 'react';
import { AutoComplete } from '../src';
import { render } from '@testing-library/react';

describe('AutoComplete', () => {
  it('dropdownClassName', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <AutoComplete
        open
        dropdownClassName="test"
        value="bam"
        options={[{ label: 'bamboo', value: 'bamboo' }]}
      />,
    );

    expect(errSpy).toHaveBeenCalledWith(
      "Warning: [Compatible: AutoComplete] 'dropdownClassName' is deprecated. Please use 'popupClassName' instead.",
    );

    // TODO: Remove this when antd release version
    // expect(container.querySelector('.test')).toBeTruthy();

    errSpy.mockRestore();
  });
});
