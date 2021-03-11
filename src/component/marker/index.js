import React from 'react'
import './marker.css'

//chua dung
const marker0 = require('../image/marker0.png');
const marker1 = require('../image/marker1.png');
const marker2 = require('../image/marker2.png');
const marker3 = require('../image/marker3.png');

function Marker(props) {

  const arrMarker = [marker0, marker1, marker2, marker3];//chua dung

  const styleImage = {
    width: '28px',
    height: '48px',
    margin: '-61px 0 0 -14px'
  }
  return (
    <div class="tooltip" draggable='true'>
      <img
        style={styleImage}
        src={marker0}
        onClick={props.clickMarker}
      />
    </div>
  )
}

export default React.memo(Marker)