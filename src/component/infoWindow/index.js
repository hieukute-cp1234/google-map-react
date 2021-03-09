import React from 'react'
import '../infoWindow/infoWindow.css'
import PropTypes from 'prop-types'

InfoWindow.propTypes = {
  click: PropTypes.func,
  selected: PropTypes.array
}

function InfoWindow(props) {
  return (
    <>
      <div className="divTitle">
        <div className="divTitle_delete" onClick={props.click}>x</div>
        <div style={{ paddingLeft: '10px', marginTop: '0px', fontSize: '12px', lineHeight: '0.8' }}>
          {props.selected.product.map((item, index) => (
            <>
              <p key={index}>Nông sản chính: {item.name}</p>
              <p key={index}>Số lượng: {item.amount}</p>
            </>
          ))} 
          <p>Lat: {props.selected.lat}</p>
          <p>Lng: {props.selected.lng}</p>
        </div>
      </div>
    </>
  )
}

export default React.memo(InfoWindow)