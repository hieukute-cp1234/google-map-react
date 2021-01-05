import React from 'react'
import ImgMarker from '../image/markerr.png'
import PropTypes from 'prop-types'

Marker.propsTypes = {
  clickMarker: PropTypes.func,
}

export default function Marker(props) {
  const styles = {
    width: '28px',
    height: '48px',
    margin: '-48px 0 0 -14px'
  }
  return (
    <>
      <div className="div_image">
        click gps
      </div>
      <img
        className='image'
        style={styles}
        src={ImgMarker}
        onClick={props.clickMarker}
      />
    </>
  )
}