import { ConfigProvider, Menu, MenuProps } from 'antd';
import { defaultTheme, darkTheme } from '@ant-design/compatible';
import { AppstoreOutlined, CalendarOutlined, LinkOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Navigation One', '1', <MailOutlined />),
  getItem('Navigation Two', '2', <CalendarOutlined />),
  getItem('Navigation Two', 'sub1', <AppstoreOutlined />, [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
  ]),
  getItem('Navigation Three', 'sub2', <SettingOutlined />, [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
  ]),
  getItem(
    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
      Ant Design
    </a>,
    'link',
    <LinkOutlined />,
  ),
];

const Demo = () => {
  return (
    <Menu items={items} style={{width: 256}}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline" />
  )
}

export default () => {
  return (
    <div style={{display: 'flex'}}>
      <div>
        Default:
        <ConfigProvider theme={defaultTheme}>
          <Demo />
        </ConfigProvider>
      </div>
      <div style={{marginLeft: 40}}>
        Dark:
        <ConfigProvider theme={darkTheme}>
          <Demo />
        </ConfigProvider>
      </div>
    </div>
  )
}
