import React from 'react'
import './eye.css'
import PropTypes from 'prop-types'


Eye.propTypes={
    clickEye:PropTypes.func,
}

export default function Eye(props){
    return(
        <div className="div" onClick={props.clickEye} style={{marginLeft:props.marginLeft}}>
            {props.icon}
        </div>
    )
}