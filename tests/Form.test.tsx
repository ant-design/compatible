import React from 'react';
import { ConfigProvider } from 'antd';
import { Form } from '../src';
import { render } from '@testing-library/react';

describe('Form', () => {
  it('work', () => {
    const { container } = render(<Form />);
    expect(container).toMatchSnapshot();
  });

  it('no hash', () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          hashed: false,
        }}
      >
        <Form />
      </ConfigProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
