import React from 'react';
import { Mentions } from '../src';
import { render } from '@testing-library/react';

describe('Mentions', () => {
  it('dropdownClassName', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <Mentions
        dropdownClassName="test"
      />,
    );

    expect(errSpy).toHaveBeenCalledWith(
      "Warning: [Compatible: Mentions] 'dropdownClassName' is deprecated. Please use 'popupClassName' instead.",
    );

    // TODO: Remove this when antd release version
    // expect(container.querySelector('.test')).toBeTruthy();

    errSpy.mockRestore();
  });
});
