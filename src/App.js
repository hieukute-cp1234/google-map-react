/* global google */ //để dùng API googleMap
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

import firebase from './firebase/config';
import data from './data.json';//data fake
import GoogleMapReact from 'google-map-react';
import firebaseData from './service/firebaseAPI';
import ImgMarker from './component/image/marker0.png';

import Menu from './component/menu/index';
import ActionClick from './component/actionClick/index';
import InfoWindow from './component/infoWindow/index';
import Marker from './component/marker/index';
import Eye from './component/buttoneye/eye';

import {
  CaretRightOutlined,
  CaretLeftOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { message, Modal, Button, Input } from 'antd';

function App(props) {

  const checkUser = firebaseData.email();
  console.log(checkUser)

  //lưu thành phần của googleMap khi render
  const [maps, setMaps] = useState(null);
  //lưu API của google khhi render
  const [mapAPI, setMapAPI] = useState(null);

  //draw polygon
  const [checkPolygon, setCheckPolygon] = useState(false);
  const [pointPolygon, setPointPolygon] = useState([]);

  //lấy vị trí muốn lưu khi click
  const [gps, setGps] = useState({});

  //ẩn hiện marker
  const [checkMarker, setCheckMarker] = useState(false);
  const [checkSearchMarker, setCheckSearchMarker] = useState(false);

  //truyền data marker
  const [markers, setMarkers] = useState([]);

  //state heat map
  const [heatMapVisible, setHeatMapVisible] = useState(true);
  //point heat map
  const [heatMapPoint, setHeatMapPoint] = useState([]);

  //modal lưu tọa độ
  const [modal, setModal] = useState(false);
  const [modalUpdateGps, setModalUpdateGps] = useState(false);
  const [id, setId] = useState('');//lưu lại id tren firebase
  const [modalClick, setModalClick] = useState(false);

  //thay đổi icon khi ẩn hiện menu
  const [icon, setIcon] = useState(<CaretRightOutlined style={{ fontSize: '16px' }} />);
  const [icon2, setIcon2] = useState(<MenuUnfoldOutlined style={{ fontSize: '16px' }} />);

  //xét việc ẩn hiện của menu
  const [eyeSearch, setEyeSearch] = useState(false);
  const [eyeMenu, setEyeMenu] = useState(false);

  //xét vị trí của icon khi ẩn hiện menu
  const [marginLeft, setMarginLeft] = useState('0px');
  const [marginLeft2, setMarginLeft2] = useState('0px');

  //xét việc ẩn hiện của infoWindow
  const [selected, setSelected] = useState(null);

  //lấy dữ liệu từ firebase Store
  useEffect(() => {//du lieu marker
    const fetchData = async () => {
      try {
        const response = await firebaseData.fetchData();
        console.log(response)
        setMarkers(response)
      } catch (error) {
        console.log('loi', error)
      }
    }
    fetchData();
  }, [checkMarker])

  useEffect(() => {//du lieu polygon
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('Polygon').get();
      const result = data.docs.map(doc => doc.data());
      setPointPolygon(result)
    }
    fetchData()
  }, [modal])

  //load API google
  const onMap = (map, maps) => {
    setMaps(map);
    setMapAPI(maps);
  }

  //vị trí ban đầu của map
  const map = {
    center: {
      lat: 21.027763,
      lng: 105.83416
    },
    zoom: 12
  }

  //heatmap
  const heatMapData = {
    positions: heatMapPoint,
    options: {
      radius: 20,
      opacity: 0.6
    },
  }

  //ẩn hiện heatmap
  const toggleHeatMap = async () => {
    setHeatMapVisible(!heatMapVisible);
    if (heatMapVisible == true) {
      const db = firebase.firestore();
      const data = await db.collection('Farm').get();
      const result = data.docs.map(doc => doc.data());
      setHeatMapPoint(result);
    } else {
      setHeatMapPoint([]);
    }
  }

  //menu
  const clickEyeSearch = () => {
    //xử lý giao diện seach
    if (eyeSearch === true) {
      setCheckSearchMarker(false)
      setEyeSearch(false);
      setMarginLeft('0px');
      setMarginLeft2('0px');
      setIcon(<CaretRightOutlined style={{ fontSize: '16px' }} />);
      setIcon2(<MenuUnfoldOutlined style={{ fontSize: '16px' }} />);
    } else {
      setCheckSearchMarker(true);
      setEyeSearch(true);
      setEyeMenu(false);
      setMarginLeft2('400px');
      setMarginLeft('400px');
      setIcon(<CaretLeftOutlined style={{ fontSize: '16px' }} />);
      setIcon2(<MenuFoldOutlined style={{ fontSize: '16px' }} />);
    }
  }

  const clickEyeMenu = () => {
    //xử lý giao diện menu chức năng
    if (eyeMenu === true) {
      setCheckSearchMarker(false);
      setEyeMenu(false);
      setMarginLeft2('0px');
      setMarginLeft('0px');
      setIcon(<CaretRightOutlined style={{ fontSize: '16px' }} />);
      setIcon2(<MenuUnfoldOutlined style={{ fontSize: '16px' }} />);
    } else {
      setCheckSearchMarker(false);
      setEyeMenu(true);
      setEyeSearch(false);
      setMarginLeft2('180px');
      setMarginLeft('180px');
      setIcon(<CaretRightOutlined style={{ fontSize: '16px' }} />);
      setIcon2(<MenuFoldOutlined style={{ fontSize: '16px' }} />);
    }
  }

  //vẽ polygon
  const drawPolygon = () => {
    setCheckPolygon(true);
    setCheckMarker(false);
    googleMapPolygon(maps, mapAPI);
    console.log(mapAPI);
  }

  //load polygon
  const googleMapPolygon = async (map, maps) => {
    const db = firebase.firestore();
    const data = await db.collection('Polygon').get();
    const result = data.docs.map(doc => doc.data());
    var pointPolygon = result;
    if (result == '') {
      message.error('cần ít nhất 3 điểm!', 4);
    } else {
      var polygon = new maps.Polygon({
        paths: pointPolygon,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      });
      polygon.setMap(map);
      polygon.addListener('click', () => {
        polygon.setMap(null)
        message.success('Ẩn trang trại')
        setCheckPolygon(false);
        setTimeout(() => {
          setCheckMarker2(true)
        }, 300)
      })
      message.success('Vẽ thành công!', 2);
    }
  };

  //dung API cho marker
  var Markers = async (map, maps) => {
    for (let i = 0; i < markers.length; i++) {
      const icon = {
        url: ImgMarker,
      }
      if (markers != '') {
        let marker = new maps.Marker({
          position: {
            lat: markers[i].lat,
            lng: markers[i].lng
          },
          map,
          title: markers[i].id,
          icon: icon,
          draggable: true,
          animation: maps.Animation.DROP
        })

        let InforMarker = new maps.InfoWindow({
          content: `${markers[i].id}`,
        });

        marker.addListener("click", () => { 
          marker.setMap(null)
          setCheckMarker2(false)
          setCheckMarker(false)
          setTimeout(() => {
            setCheckMarker2(true)
          },300)
         })
        marker.addListener('drag', () => {
          setCheckMarker2(false)
          setCheckMarker(true)
          console.log(markers[i].id)
          setId(markers[i].id)
        })
      } else {
        message.success('Chưa có Marker!');
      }
    }
    console.log(markers);
  }

  const [checkMarker2,setCheckMarker2] = useState(false)
  //click lấy vị trí 
  const clickMap = (latlng) => {
    setGps({
      lat: latlng.lat,
      lng: latlng.lng
    });
    console.log(latlng)
    if (checkPolygon === true && selected == null) {
      setModal(true);
      setSelected(null);
    } else {
      setModal(false);
    }

    if (checkMarker === true) {
      setModalUpdateGps(true);
    } 
    
    if(checkMarker2 === true){
      setModalClick(true);
    }
  }

  //ẩn hiện marker
  const toggleMarker = () => {
    setCheckMarker2(true)
    setCheckMarker(false);
    setCheckPolygon(false);
    Markers(maps, mapAPI);//dung API
  }

  //modal lưu tọa độ vaof firebase
  const handleCancel = () => {
    setModal(null);
    setModalClick(null);
  }

  const handleCancel2 = () => {
    setModalUpdateGps(false);
    setCheckMarker2(true)
    setCheckMarker(false)
  }

  const handleSubmit2 = () => {//modal cho thay doi latlng farm
    const db = firebase.firestore();
    db.collection('Farm').doc(id).update({
      lat: gps.lat,
      lng: gps.lng
    })
    setModalUpdateGps(false);
    message.success('Cập nhật thành công!')
    setCheckMarker2(true)
    setCheckMarker(false)
  }

  const handleSubmit3 = () => {
    const db = firebase.firestore();
    db.collection('Farm')
      .doc(changeId).set(
        {
          lat: gps.lat,
          lng: gps.lng,
          product:[
            {
              name:'khong co',
              amount:'khong co'
            }
          ],
          m2:null
        }
      )
      .then(function () {
        message.success('Lưu thành công', 2);
      })
      .catch(function (e) {
        message.error('Lưu thất bại', 2);
      })
      setModalClick(false)
  }

  const handleSubmit = () => {//modal cua polygon
    const db = firebase.firestore();
    db.collection('Polygon').add({
      lat: gps.lat,
      lng: gps.lng
    }).then(function () {
      console.log('Lưu thành công');
      message.success('Lưu thành công!', 2);
    }).catch(function (e) {
      console.log('Không thể lưu', e);
      message.error('Lưu thất bại', 2)
    })
    setModal(false);
    
  }

  //search
  const [search, setSearch] = useState('')
  let listItem = []
  if (search.length > 0) {
    markers.forEach((item) => {
      if (String(item.id).toLowerCase().indexOf(search) != -1) {
        listItem.push(item);
      }
    })
  } else {
    listItem = markers
  }
  console.log(listItem)
  const handleSearch = (key) => {
    setSearch(key);
  }

  const [changeId, setChangeId] = useState('')

  const change = (e) => {
    let val = e.target.value
    setChangeId(val)
  }

  return (
    <div style={{ height: '90vh', width: '100%', display: 'flex' }}>
      <GoogleMapReact
        bootstrapURLKeys={{//key API google
          key: 'AIzaSyBSoilOkkmHnYmt2O8qzPX228VKDtWH9KA',
          libraries: ['visualization'],//chưa đùng đến
        }}
        defaultCenter={map.center}
        defaultZoom={map.zoom}
        heatmapLibrary={true}
        heatmap={heatMapData}//load heatMap
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => onMap(map, maps)}//load API
        //layerTypes={['TrafficLayer', 'TransitLayer','BicyclingLayer']}//thay đổi bản đồ
        onClick={clickMap}
      >

        {checkPolygon ? (
          pointPolygon.map((marker) => {//ẩn hiện marker polygon
            console.log(marker)
            return (<Marker
              {...{ lat: marker.lat, lng: marker.lng }}
              title={marker}
            />)
          }
          )) : null}

        {checkSearchMarker ? (
          listItem.map((marker) => {//ẩn hiện marker polygon
            console.log(marker)
            return (<Marker
              {...{ lat: marker.lat, lng: marker.lng }}
              title={marker}
              clickMarker={() => {
                setSelected(marker)
              }} />)
          }
          )) : null}

        {selected ? (//ẩn hiện inforWindow
          <InfoWindow
            {...{ lat: selected.lat, lng: selected.lng }}
            selected={selected}
            click={() => { setSelected(null) }} />
        ) : null}

      </GoogleMapReact>

      <Eye //menu search
        marginTop={'10px'}
        clickEye={clickEyeSearch}
        icon={icon}
        marginLeft={marginLeft}
      />

      {eyeSearch ? (
        <Menu
          markerList={listItem}
          handle={handleSearch}
        />) : null}

      {checkUser ? (
        <Eye //menu chức năng
          marginTop={'65px'}
          clickEye={clickEyeMenu}
          icon={icon2}
          marginLeft={marginLeft2}
        />
      ) : null}


      {eyeMenu ? (
        <ActionClick
          marker={toggleMarker}
          heatmap={toggleHeatMap}
          polygon={drawPolygon}
        />) : null}

      <Modal //hiện khi click lấy tọa độ polygon
        visible={modal}
        title="Tọa độ bạn vừa chọn!"
        okText="Lưu"
        cancelText="Bỏ qua"
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <p>Lat: {gps.lat}</p>
        <p>Lng: {gps.lng}</p>
      </Modal>

      <Modal //thay doi toa do farm
        visible={modalUpdateGps}
        title="Tọa độ mới"
        onOk={handleSubmit2}
        onCancel={handleCancel2}
        okText="Lưu"
        cancelText="Bỏ qua"
      >
        <p>Lat: {gps.lat}</p>
        <p>Lng: {gps.lng}</p>
      </Modal>

      <Modal
        visible={modalClick}
        onOk={handleSubmit3}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Bỏ qua"
      >
        <p>Lat: {gps.lat}</p>
        <p>Lng: {gps.lng}</p>
        <p>Tên trang trại</p>
        <Input onChange={change}></Input>
      </Modal>
    </div>
  );
}

export default App;