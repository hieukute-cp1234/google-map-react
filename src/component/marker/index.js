import React from 'react'
import ImgMarker from '../image/markerr.png'
import './marker.css'

function Marker(props) {
  const styleImage = {
    width: '28px',
    height: '48px',
    margin: '-60px 0 0 -13px'
  }
  return (
    <div class="tooltip">
      <img
        style={styleImage}
        src={ImgMarker}
        onClick={props.clickMarker}
      />
      <div class="tooltiptext">title</div>
    </div>
  )
}

export default React.memo(Marker)