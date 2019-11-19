import React from 'react';
import { render } from 'enzyme';
import { Input } from 'antd';
import { Form } from '../../src';
import { FormComponentProps } from '../../src/form';

describe('Form', () => {
  it('should render correctly', () => {
    class MyForm extends React.Component<FormComponentProps> {
      render() {
        return (
          <Form>
            <Form.Item>
              {this.props.form.getFieldDecorator('name')(<Input />)}
            </Form.Item>
          </Form>
        );
      }
    }

    const WrappedForm = Form.create()(MyForm);

    const wrapper = render(<WrappedForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
