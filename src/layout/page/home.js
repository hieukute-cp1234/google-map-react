import React from 'react'
import Layout from '../component/layout'
import Map from '../../App'

function Home() {
  return (
    <Layout>
      <Map />
    </Layout>
  )
}

export default React.memo(Home);