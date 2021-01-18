import React from 'react'
import './inforNA.css'

export default function Div(props){
  let number;
  return (
    <div className="wapper">
      {/* {props.product.map((item,index)=><p key={index}>{item.amount}</p>)} */}
      <p>{props.product[0].amount}</p>
    </div>
  )
}