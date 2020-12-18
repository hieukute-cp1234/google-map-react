import React from 'react'
import { Layout } from 'antd'
import Header from './header'
import Footer from './footer'

const { Content } = Layout

function LayoutApp(props) {
  return (
    <>
      <Layout className='layout'>
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">{props.children}</div>
        </Content>
        <Footer />
      </Layout>
    </>
  )
}

export default React.memo(LayoutApp);