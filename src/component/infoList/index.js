import React from 'react'
import '../infoList/list.css'
import Farm from '../image/trangtrai.jpg'
import { EnvironmentOutlined, GlobalOutlined, CompassOutlined, PhoneOutlined } from '@ant-design/icons'

function InfoList(props) {
  return (
    <>
      <img src={Farm} style={{ width: '400px', height: '220px' }} />
      <div>
        <h1 style={{ marginLeft: '10px' }}>Trang trại {props.marker.id}</h1>
        <div className="div1">
          <EnvironmentOutlined style={{ color: 'blue', fontSize: '20px' }} />
          {props.marker.product.map((item, index) =>
            <>
              <p key={index} className="text">Nông sản: {item.name}</p><br />
              <p key={index} className="text">Số lượng: {item.amount}</p>
            </>
          )}
        </div>
        <div className="div1">
          <GlobalOutlined style={{ color: 'blue', fontSize: '20px' }} />
          <a
            className="text"
            target="_blank"
            href='#'
          >{`http//${props.marker.id}.vn`}</a>
        </div>
        <div className="div1">
          <PhoneOutlined style={{ color: 'blue', fontSize: '20px' }} />
          <p className="text">0372242161</p>
        </div>
        <div className="div1">
          <CompassOutlined style={{ color: 'blue', fontSize: '20px' }} />
          <p className="text">Diện tích {props.marker.m2} m2</p>
        </div>
      </div>
    </>
  )
}

export default React.memo(InfoList)