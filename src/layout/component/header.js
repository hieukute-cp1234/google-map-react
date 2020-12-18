import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from "react-router-dom";

const { Header } = Layout
function HeaderApp() {
  return (
    <>
      <Header>
        <Menu theme="dark" mode="horizontal" >
          <Menu.Item key="1"><Link to='/'>React Map</Link></Menu.Item>
          <Menu.Item key="2"><Link to='/login'>Đăng nhập</Link></Menu.Item>
          <Menu.Item key="3"><Link to='/infor'>Kênh người bán</Link></Menu.Item>
        </Menu>
      </Header>
    </>
  )
}

export default React.memo(HeaderApp);