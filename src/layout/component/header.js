import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from "react-router-dom";
import firebase from '../../firebase/config';
import { CheckUser } from '../checkUser/check';

const { Header } = Layout
function HeaderApp() {

  const [name,setName] = useState();

  const click = () => {

  }
  return (
    <>
      <Header>
        <Menu theme="dark" mode="horizontal" >
          <Menu.Item key="1"><Link to='/'>React Map</Link></Menu.Item>
          <Menu.Item key="2"><Link to='/login'>Đăng nhập</Link></Menu.Item>
          <Menu.Item key="3"><Link to='/infor'>Kênh người bán</Link></Menu.Item>
          {/* <Menu.Item key='4'>{name}</Menu.Item> */}
          {/* <Button onClick={click}>click</Button> */}
        </Menu>
      </Header>
    </>
  )
}

export default React.memo(HeaderApp);