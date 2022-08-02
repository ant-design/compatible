import React from 'react';
import { AutoComplete } from '../src';
import { render } from '@testing-library/react';

describe('AutoComplete', () => {
  it('dropdownClassName', async () => {
    const { container } = render(<AutoComplete open dropdownClassName="test" />);

    console.log(container.innerHTML);
  });
});
