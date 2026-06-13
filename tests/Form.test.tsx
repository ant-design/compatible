import React from 'react';
import { ConfigProvider, Input } from 'antd';
import { Form } from '../src';
import { fireEvent, render } from '@testing-library/react';

describe('Form', () => {
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

  it('keeps duplicated field value when another field updates', () => {
    const Demo = Form.create()(({ form }: any) => {
      const { getFieldDecorator } = form;

      return (
        <Form>
          <Form.Item label="Title">
            {getFieldDecorator('title', {})(<Input placeholder="title" />)}
          </Form.Item>
          <Form.Item label="Title">
            {getFieldDecorator('title', {})(<Input placeholder="title" />)}
          </Form.Item>
          <Form.Item label="age">
            {getFieldDecorator('age', {})(<Input placeholder="age" />)}
          </Form.Item>
        </Form>
      );
    });

    const { getAllByPlaceholderText, getByPlaceholderText } = render(<Demo />);
    const titleInputs = getAllByPlaceholderText('title');
    const ageInput = getByPlaceholderText('age');

    fireEvent.change(titleInputs[0], { target: { value: 'foo' } });
    expect((titleInputs[0] as HTMLInputElement).value).toBe('foo');
    expect((titleInputs[1] as HTMLInputElement).value).toBe('foo');

    fireEvent.change(ageInput, { target: { value: '18' } });
    expect((titleInputs[0] as HTMLInputElement).value).toBe('foo');
    expect((titleInputs[1] as HTMLInputElement).value).toBe('foo');
    expect((ageInput as HTMLInputElement).value).toBe('18');
  });
});
