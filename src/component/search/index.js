import React from 'react'
import './search.css'
import PropTypes from 'prop-types'

Search.propTypes = {
  search: PropTypes.string,
  handleSearch: PropTypes.func,
  marginTop: PropTypes.string
}

function Search(props) {
  return (
    <>
      <div className='menu__search' style={{ marginTop: props.marginTop }}>
        <input
          value={props.search}
          className='menu__search-input'
          type="text"
          placeholder="Tìm kiếm trên Google Map React..."
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