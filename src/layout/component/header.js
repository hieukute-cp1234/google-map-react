import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from "react-router-dom";
import firebase from '../../firebase/config';

const { Header } = Layout
function HeaderApp() {

  return (
    <>
      <Header>
        <Menu theme="dark" mode="horizontal" >
          <Menu.Item key="1"><Link to='/'>React Map</Link></Menu.Item>
          <Menu.Item key="2"><Link to='/login'>Đăng nhập</Link></Menu.Item>
          <Menu.Item key="3"><Link to='/form-infor'>Kênh người bán</Link></Menu.Item>
          <Menu.Item key="3"><Link to='/infor'>Thông tin trại</Link></Menu.Item>
        </Menu>
      </Header>
    </>
  )
}

export default React.memo(HeaderApp);