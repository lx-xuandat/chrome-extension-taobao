import React, { useState, useEffect } from 'react'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import axios from 'axios';
import { routes } from '@configs'

export const ToolBar = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    axios.get(routes.config)
      .then(response => {
        setConfig(response.data.configs);
      })
      .catch(error => {
        console.error('Error fetching config:', error);
      });
  }, []);

  const menuItems = [
    {
      key: 'acount',
      icon: <UserOutlined />,
      label: '个人中心 - Trung Tâm Cá Nhân',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '个人设置 - Cài Đặt',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录 - Đăng Xuất',
    },

  ];

  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} items={menuItems} mode="horizontal" />
  )
}
