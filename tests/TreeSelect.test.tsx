import React from 'react';
import { TreeSelect } from '../src';
import { render } from '@testing-library/react';

describe('TreeSelect', () => {
  it('dropdownClassName', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <TreeSelect
        open
        dropdownClassName="test"
      />,
    );

    expect(errSpy).toHaveBeenCalledWith(
      "Warning: [antd: TreeSelect] `dropdownClassName` is removed in v5, please use `popupClassName` instead.",
    );

    // TODO: Remove this when antd release version
    // expect(container.querySelector('.test')).toBeTruthy();

    errSpy.mockRestore();
  });
});
