import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from "react-router-dom";
import firebaseData from '../../service/firebaseAPI';
import firebase from '../../firebase/config'

const { Header } = Layout
function HeaderApp() {

  const check = firebaseData.email();

  const refPage = () => {
    window.location.reload(false);
    firebase.auth().signOut();
  }
  return (
    <>
      <Header>
        <Menu theme="dark" mode="horizontal" >
          <Menu.Item key="1"><Link to='/'>Trang chủ</Link></Menu.Item>
          {check ? (
            <Menu.Item onClick={refPage}><Link to='/'>Đăng xuất</Link></Menu.Item>
          ): (
              <Menu.Item key="2"><Link to='/login'>Đăng nhập</Link></Menu.Item>
          )}
          {check ? (<Menu.Item key="3"><Link to='/form-infor'>Kênh người bán</Link></Menu.Item>) : null}
        {check ? (<Menu.Item key="4"><Link to='/infor'>Thông tin trại</Link></Menu.Item>) : null}
        </Menu>
    </Header>
    </>
  )
}

export default React.memo(HeaderApp);