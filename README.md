# Ant Design Compatible

Helps you to compatible different components between v3 and v4.

For example, Form of v3 api is different with v4:

```jsx
// V3
import { Form, Input, Button } from 'antd';

class MyForm extends React.Component {
  render() {
    return (
      <Form>
        {getFieldDecorator('username')(
          <Input />,
        )}
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default Form.create()(MyForm);
```

Change to:

```jsx
// V4 with compatible
import { LegacyForm as Form, Input, Button } from '@ant-design/compatible';

class MyForm extends React.Component {
  render() {
    return (
      <Form>
        {getFieldDecorator('username')(
          <Input />,
        )}
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default Form.create()(MyForm);
```

Follow Component are provided compatible version:
* Form -> LegacyForm (not yet)
* Mention --> LegacyMention (not yet)
* Icon --> LegacyIcon

## Icon

```jsx
// V3
// import { Icon } from 'antd';
// V4 with compatible
import { LegacyIcon as Icon } from '@ant-design/compatible';

class MyIconList extends React.Component {
  render() {
    return (
      <div className="icons-list">
        <Icon type="home" />
        <Icon type="setting" theme="filled" />
        <Icon type="smile" theme="outlined" />
        <Icon type="sync" spin />
        <Icon type="smile" rotate={180} />
        <Icon type="loading" />
      </div>
    );
  }
}

export default MyIconList;
```
