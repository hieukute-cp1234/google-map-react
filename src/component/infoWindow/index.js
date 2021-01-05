import React from 'react'
import '../infoWindow/infoWindow.css'
import PropTypes from 'prop-types'

InfoWindow.propTypes = {
  click: PropTypes.func,
  selected: PropTypes.array
}

export default function InfoWindow(props) {
  return (
    <>
      <div className="divTitle">
        <div className="divTitle_delete" onClick={props.click}>x</div>
        <div style={{ padding: '1px', textAlign: 'center', fontSize: '12px' }}>
          <h4>{`${props.selected.name}`}</h4>
          <p>{`${props.selected.adress}`}</p>
          <p>{props.selected.lat}</p>
          <p>{props.selected.lng}</p>
        </div>
      </div>
    </>
  )
}