import React from 'react';
import { Icon } from '../src';
import { render } from '@testing-library/react';

describe('Form', () => {
  it('work', () => {
    const { container } = render(<Icon type="smile" />);
    expect(container).toMatchSnapshot();
  });
});
