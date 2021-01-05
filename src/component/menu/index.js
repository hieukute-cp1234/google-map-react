import React, { useState } from 'react';
import '../menu/menu.css';
import image from '../image/kinhlup.png';
import InfoList from '../infoList/index';
import Search from '../search/index'
//import { PropertySafetyFilled } from '@ant-design/icons';

export default function Menu({ markerList, handler }) {
  //seach trên menu
  const [search, setSearch] = useState('');

  //xét sự xuất hiện của thông tin trường
  const [info, setInfo] = useState(null);

  //xet việc ẩn hiện của thông tin các trrường sau khi click
  const [showInfo, setShowInfo] = useState(true);

  //xét việc ẩn hiện của list các trường sau khi seach
  const [showList, setShowList] = useState(true);

  //vị trí của input seach sau khi ảnh hiển thị
  const [marginTop, setMarginTop] = useState('10px');

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
              setMarginTop('-290px');
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
                >
                  {marker.name}
                </div>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}