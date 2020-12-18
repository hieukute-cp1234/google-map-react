import React, { useState } from 'react';
import '../menu/menu.css';
import image from '../image/kinhlup.png';
import InfoList from '../infoList/index';
import Search from '../search/index'
import { PropertySafetyFilled } from '@ant-design/icons';

export default function Menu({ markerList, handler}) {

  const [search, setSearch] = useState('');
  const [info, setInfo] = useState(null);//xet xuat hien cua thong tin truong
  const [showInfo, setShowInfo] = useState(true);//xet an hien cua thong tin cac truong sau da hien khi click
  const [showList, setShowList] = useState(true);//xet viec an hien cua list cac truong
  const [marginTop, setMarginTop] = useState('10px');//xet vi tri cua input khi hien thi anh

  const handleSearch = (e) => {
    let value = e.target.value;
    setMarginTop('10px');
    setShowList(true);
    setShowInfo(false);
    setSearch(value);
    handler(search);
  }

  return (
    <div className='menu'>
      {showInfo ? info : null}
      <Search
        marginTop={marginTop}
        search={search}
        handleSearch={handleSearch}
        image={image}
      />

      {showList ? (
        <ul className='menu_list'>
          {markerList.map((marker) => {
            const clickItem = () => {
              setMarginTop('-380px');
              setShowInfo(true);
              setShowList(false);
              setInfo(<InfoList marker={marker} />)
            }
            return (
              <li className='menu_list-item'>
                {/* <input type='checkbox' id={marker.name} onClick={check} /> */}
                <div
                  style={{ padding: '10px', fontSize: '16px' }}
                  onClick={clickItem}
                >{marker.name}</div>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}