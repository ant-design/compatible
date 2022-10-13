import React from 'react';
import { Comment } from '../src';
import { render } from '@testing-library/react';

describe('Comment', () => {
  it('work', () => {
    const { container } = render(<Comment content="" />);
    expect(container).toMatchSnapshot();
  });
});
