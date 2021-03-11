import React from 'react'
import './action.css'
import { Button } from 'antd'

function Action(props) {
  return (
    <div className='action'>
      <Button
        type="primary"
        className='button'
        onClick={props.marker}
      >Hiển thị trang trại
      </Button>
      <Button
        type="primary"
        className='button'
        onClick={props.heatmap}
      >Bản đồ nhiệt
      </Button>
      <Button
        type="primary"
        className='button'
        onClick={props.polygon}
      >Vẽ trang trại
      </Button>
    </div>
  )
}

export default Action;