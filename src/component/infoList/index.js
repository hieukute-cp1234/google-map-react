import React from 'react'
import PropTypes from 'prop-types'
import '../infoList/list.css'
import { EnvironmentOutlined, GlobalOutlined } from '@ant-design/icons'

InfoList.propTypes = {
  marker: PropTypes.array,
}

export default function InfoList(props) {
  return (
    <>
      <img src={props.marker.img} style={{ width: '550px', height: '300px' }} />
      <div>
        <h1 style={{ marginLeft: '10px' }}>{props.marker.name}</h1>
        <div className="div1">
          <EnvironmentOutlined style={{ color: 'blue', fontSize: '20px' }} />
          <p className="text">{props.marker.adress}</p>
        </div>
        <div className="div1">
          <GlobalOutlined style={{ color: 'blue', fontSize: '20px' }} />
          <a
            className="text"
            target="_blank"
            href={props.marker.link}
          >{props.marker.infor}</a>
        </div>
      </div>
    </>
  )
}