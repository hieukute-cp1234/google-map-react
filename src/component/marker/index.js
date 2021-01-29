import React from 'react'
import ImgMarker from '../image/markerr.png'

function Marker(props) {
  const styles = {
    width: '28px',
    height: '48px',
    margin: '-60px 0 0 -13px'
  }
  return (
    <div>
      <img
        style={styles}
        src={ImgMarker}
        onClick={props.clickMarker}
      />
    </div>
  )
}

export default React.memo(Marker)