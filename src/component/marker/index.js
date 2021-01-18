import React from 'react'
import ImgMarker from '../image/markerr.png'
import PropTypes from 'prop-types'

Marker.propsTypes = {
  clickMarker: PropTypes.func,
}

function Marker(props) {
  const styles = {
    width: '28px',
    height: '48px',
    // width: '25px',
    // height: '25px',
    margin: '-60px 0 0 -13px'
  }
  return (
    <div>
      <img
        className='image'
        style={styles}
        src={ImgMarker}
        onClick={props.clickMarker}
      />
    </div>
  )
}

export default React.memo(Marker)