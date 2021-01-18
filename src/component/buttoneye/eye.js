import React from 'react'
import './eye.css'
import PropTypes from 'prop-types'


Eye.propTypes = {
  clickEye: PropTypes.func,
}

function Eye(props) {
  return (
    <div
      className="div"
      onClick={props.clickEye}
      style={{ marginLeft: props.marginLeft, marginTop: props.marginTop }}
    >{props.icon}
    </div>
  )
}

export default React.memo(Eye);