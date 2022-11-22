import React from 'react';
import { ConfigProvider } from 'antd';
import { Comment } from '../src';
import { render } from '@testing-library/react';

describe('Comment', () => {
  it('no hash', () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          hashed: false,
        }}
      >
        <Comment content="" />
      </ConfigProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
