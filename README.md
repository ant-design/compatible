# Ant Design Compatible

[![NPM version](https://img.shields.io/npm/v/@ant-design/compatible.svg?style=flat)](https://npmjs.org/package/@ant-design/compatible)
[![NPM downloads](http://img.shields.io/npm/dm/@ant-design/compatible.svg?style=flat)](https://npmjs.org/package/@ant-design/compatible)
[![CircleCI](https://circleci.com/gh/ant-design/compatible.svg?style=svg)](https://circleci.com/gh/ant-design/compatible)

## Install

```bash
yarn add @ant-design/compatible
```

## Usage

Helps you to compatible different components between v3 and v4.

Follow Component are provided compatible version:

- Form
- Icon
- Mention

```jsx
import { Form } from '@ant-design/compatible';

import '@ant-design/compatible/assets/index.css'; // If you need
```

## Introduction

### Form

Form of v3 api is different with v4:

```jsx
// V3
import { Form, Input, Button } from 'antd';

class MyForm extends React.Component {
  render() {
    const { form } = this.props;
    return (
      <Form>
        {form.getFieldDecorator('username')(<Input />)}
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
import { Form as LegacyForm } from '@ant-design/compatible';
import { Input, Button } from 'antd';
import '@ant-design/compatible/assets/index.css';

class MyForm extends React.Component {
  render() {
    const { form } = this.props;
    return (
      <LegacyForm>
        {form.getFieldDecorator('username')(<Input />)}
        <Button>Submit</Button>
      </LegacyForm>
    );
  }
}

export default Form.create()(MyForm);
```

### Icon

Just import `Icon` from package `@ant-design/compatible` and the reset is almost same as before.

```jsx
// V3
import { Icon, Button } from 'antd';

class MyIconList extends React.Component {
  render() {
    return (
      <div className="icons-list">
        <Button>hello button</Button>
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

Change to:

```jsx
// V4 with compatible
import { Icon as LegacyIcon } from '@ant-design/compatible';

class MyIconList extends React.Component {
  render() {
    return (
      <div className="icons-list">
        <Button>hello button</Button>
        <LegacyIcon type="home" />
        <LegacyIcon type="setting" theme="filled" />
        <LegacyIcon type="smile" theme="outlined" />
        <LegacyIcon type="sync" spin />
        <LegacyIcon type="smile" rotate={180} />
        <LegacyIcon type="loading" />
      </div>
    );
  }
}

export default MyIconList;
```

### Mention

The legacy usage in v3

```jsx
import { Mention } from 'antd';

const { toString } = Mention;

ReactDOM.render(
  <Mention
    style={{ width: '100%' }}
    onChange={onChange}
    defaultSuggestions={[
      'afc163',
      'benjycui',
      'yiminghe',
      'RaoHai',
      '中文',
      'にほんご',
    ]}
    onSelect={onSelect}
    placement="top"
  />,
  mountNode,
);
```

Compatible usage in v4

```jsx
import { Mention } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

const { toString } = Mention;

ReactDOM.render(
  <Mention
    style={{ width: '100%' }}
    onChange={onChange}
    defaultSuggestions={[
      'afc163',
      'benjycui',
      'yiminghe',
      'RaoHai',
      '中文',
      'にほんご',
    ]}
    onSelect={onSelect}
    placement="top"
  />,
  mountNode,
);
```

## FAQ

### Missing `Grid` style when use `Form`.

You should import `Grid` style by youself.

```js
import 'antd/es/grid/style/css'; // By CSS
// import 'antd/es/grid/style';         // By LESS
```
