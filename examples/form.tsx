import React from 'react';
import { Row, Col, Input, Select } from 'antd';
import { Form } from '../src';
import 'antd/dist/antd.css';
import '../assets/index.css';

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

class FormVertical extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form layout="vertical">
          <Row {...LAYOUT.ROW} type="flex">
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
      </div>
    );
  }
}
export default Form.create()(FormVertical);
