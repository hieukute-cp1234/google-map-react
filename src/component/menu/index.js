import React, { useState, useRef } from 'react';
import './menu.css';
import image from '../image/kinhlup.png';
import InfoList from '../infoList/index';
import Search from '../search/index';
import { PropertySafetyFilled } from '@ant-design/icons';
import { List, Typography } from 'antd'


function Menu(props) {
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

  //ham search
  const handleSearch = (e) => {
    let value = e.target.value;
    console.log(value)
    setMarginTop('10px');
    setShowList(true);
    setShowInfo(false);
    setSearch(value);
    props.handle(search);
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
          <List
            style={{ marginTop:'10px'}}
            className="menu_list"
            bordered
            dataSource={props.markerList}
            renderItem={item => {
              const clickItem = () => {
                setMarginTop('-420px');
                setShowInfo(true);
                setShowList(false);
                setInfo(<InfoList marker={item} />);
              }
              return (
                <List.Item className='menu_list-item' onClick={clickItem}>
                  {item.id}
                </List.Item>
                )
            }
          }
        />) : null}
      </div>
    </>
  )
}

export default React.memo(Menu)