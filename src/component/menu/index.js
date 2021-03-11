import React, { useState, useRef } from 'react';
import './menu.css';
import image from '../image/kinhlup.png';
import InfoList from '../infoList/index';
import Search from '../search/index';
import { PropertySafetyFilled } from '@ant-design/icons';


function Menu({ markerList, handler }) {
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

  let listItem = [];

  if (search.length > 0) {
    markerList.forEach((item) => {
      if (String(item.id).toLowerCase().indexOf(search) != -1) {
        listItem.push(item);
      }
    })
  } else {
    listItem = markerList
  }

  // if(search.length > 0){
  //   let newData = markerList.filter((item)=>{return search == item.id})
  //   console.log(newData)
  // }else {
  //   listItem = markerList
  // }

  console.log(listItem)
  const handleSearch = (e) => {
    let value = e.target.value;
    console.log(value)
    setMarginTop('10px');
    setShowList(true);
    setShowInfo(false);
    setSearch(value);
    //handler(search);
  }



  return (
    <>
      <div className='menu'>
        {showInfo ? info : null}
        <Search
          marginTop={marginTop}
          search={search}
          handleSearch={handleSearch}
          image={image}
        />
        {showList ? (
          <ul className="menu_list">
            {listItem.map((item, index) => {
              const clickItem = () => {
                setMarginTop('-370px');
                setShowInfo(true);
                setShowList(false);
                setInfo(<InfoList marker={item} />);
              }
              return (
                <>
                  <li
                    className='menu_list-item'
                    style={{ padding: '10px', fontSize: '16px' }}
                    key={index}
                    onClick={clickItem}
                  >
                    {item.id}</li>
                </>
              )
            })}
          </ul>
        ) : null}
      </div>
    </>
  )
}

export default React.memo(Menu)