import React from 'react';
import {
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Button,
  TimePicker,
  Cascader,
  InputNumber,
} from 'antd';
import { Icon, Form } from '../../src';

const { Option } = Select;

const LAYOUT = {
  ROW: { gutter: 24 },
  COL: { span: 8 },
  NORMAL: {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  },
  WIDTH: {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  },
};

const { MonthPicker, RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }],
};

class FormVertical extends React.Component<any> {
  onSubmit = async event => {
    event.preventDefault();
    const { validateFields } = this.props.form;
    const values = await validateFields();
    console.log(values);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form layout="vertical">
          <Row {...LAYOUT.ROW}>
            <Col {...LAYOUT.COL}>
              <Form.Item label="input">
                {getFieldDecorator('input')(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col {...LAYOUT.COL}>
              <Form.Item label="select">
                {getFieldDecorator('select')(
                  <Select defaultValue="1">
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                    <Option value="3">Option 3</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col {...LAYOUT.COL}>
              <Form.Item label="input2">
                {getFieldDecorator('input2')(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div
          style={{
            maxWidth: 800,
          }}
        >
          <Form layout="inline" onSubmit={this.onSubmit}>
            <Form.Item hasFeedback validateStatus="warning">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
          <Form layout="horizontal">
            <Form.Item label="Field A">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Field B">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Form>
          <Form layout="vertical">
            <Form.Item label="Field A">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Field B">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Form>
          <Form layout="inline">
            <Form.Item label="Field A">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Field B">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Form>
          <Form {...formItemLayout}>
            <Form.Item
              label="Fail"
              validateStatus="error"
              help="Should be combination of numbers & alphabets"
            >
              <Input placeholder="unavailable choice" id="error" />
            </Form.Item>

            <Form.Item label="Warning" validateStatus="warning">
              <Input placeholder="Warning" id="warning" />
            </Form.Item>

            <Form.Item
              label="Validating"
              hasFeedback
              validateStatus="validating"
              help="The information is being validated..."
            >
              <Input placeholder="I'm the content is being validated" id="validating" />
            </Form.Item>

            <Form.Item label="Success" hasFeedback validateStatus="success">
              <Input placeholder="I'm the content" id="success" />
            </Form.Item>

            <Form.Item label="Warning" hasFeedback validateStatus="warning">
              <Input placeholder="Warning" id="warning2" />
            </Form.Item>

            <Form.Item
              label="Fail"
              hasFeedback
              validateStatus="error"
              help="Should be combination of numbers & alphabets"
            >
              <Input placeholder="unavailable choice" id="error2" />
            </Form.Item>

            <Form.Item label="Success" hasFeedback validateStatus="success">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Warning" hasFeedback validateStatus="warning">
              <TimePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Error" hasFeedback validateStatus="error">
              <Select defaultValue="1">
                <Option value="1">Option 1</Option>
                <Option value="2">Option 2</Option>
                <Option value="3">Option 3</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Validating"
              hasFeedback
              validateStatus="validating"
              help="The information is being validated..."
            >
              <Cascader defaultValue={['1']} options={[]} />
            </Form.Item>

            <Form.Item label="inline" style={{ marginBottom: 0 }}>
              <Form.Item
                validateStatus="error"
                help="Please select the correct date"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <DatePicker />
              </Form.Item>
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  textAlign: 'center',
                }}
              >
                -
              </span>
              <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                <DatePicker />
              </Form.Item>
            </Form.Item>

            <Form.Item label="Success" hasFeedback validateStatus="success">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Success" hasFeedback validateStatus="success">
              <Input allowClear placeholder="with allowClear" />
            </Form.Item>

            <Form.Item label="Warning" hasFeedback validateStatus="warning">
              <Input.Password placeholder="with input password" />
            </Form.Item>

            <Form.Item label="Error" hasFeedback validateStatus="error">
              <Input.Password allowClear placeholder="with input password and allowClear" />
            </Form.Item>
            <Form.Item name="date-picker" label="DatePicker" {...config}>
              <DatePicker />
            </Form.Item>
            <Form.Item name="date-time-picker" label="DatePicker[showTime]" {...config}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item name="month-picker" label="MonthPicker" {...config}>
              <MonthPicker />
            </Form.Item>
            <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
              <RangePicker />
            </Form.Item>
            <Form.Item name="range-time-picker" label="RangePicker[showTime]" {...rangeConfig}>
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item name="time-picker" label="TimePicker" {...config}>
              <TimePicker />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 },
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default Form.create()(FormVertical);
