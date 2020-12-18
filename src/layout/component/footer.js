import React from 'react'
import { Layout } from 'antd';
import {CompassOutlined} from '@ant-design/icons'

const {Footer} = Layout;
const FooterApp = ()=>{
  return (
    <Footer style={{ textAlign: 'center' }}>
      <p>Google Map React <CompassOutlined /></p>
    </Footer>
  )
}

export default React.memo(FooterApp);