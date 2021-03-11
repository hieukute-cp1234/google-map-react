import React from 'react'
import './search.css'

function Search(props) {
  return (
    <>
      <div className='menu__search' style={{ marginTop: props.marginTop }}>
        <input
          value={props.search}
          className='menu__search-input'
          type="text"
          placeholder="Nhập tên trang trại cần tìm..."
          onChange={props.handleSearch}
        />
        <button className='menu__search-button'>
          <img style={{ width: '20px', height: '20px' }} src={props.image} />
        </button>
      </div>
    </>
  )
}

export default React.memo(Search);