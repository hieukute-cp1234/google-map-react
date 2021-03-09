/* global google */ //để dùng API googleMap
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

import firebase from './firebase/config';
import data from './data.json';//data fake
import GoogleMapReact from 'google-map-react';
import firebaseData from './service/firebaseAPI';
import ImgMarker from './component/image/marker0.png'

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

  //lưu thành phần của googleMap khi render
  const [maps, setMaps] = useState(null);
  //lưu API của google khhi render
  const [mapAPI, setMapAPI] = useState(null);

  //draw polygon
  const [pointPolygon, setPointPolygon] = useState([])
  const [loadingPolygon, setLoadingPolygon] = useState(true);

  //lấy vị trí muốn lưu khi click
  const [gps, setGps] = useState({});
  //ẩn hiện marker
  const [checkMarker, setCheckMarker] = useState(true);
  //truyền data marker
  const [markers, setMarkers] = useState([]);

  //state heat map
  const [heatMapVisible, setHeatMapVisible] = useState(true);
  //point heat map
  const [heatMapPoint, setHeatMapPoint] = useState([]);

  //modal lưu tọa độ
  const [loadingModal, setLoadingModal] = useState(false);
  const [modal, setModal] = useState(false);

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
  useEffect(() => {
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

  //click đưa ra heatmap(chưa dùng)
  const onClickMap = ({ x, y, lat, lng, e }) => {
    console.log('onclickmap')
    setHeatMapPoint([
      ...heatMapPoint, { lat, lng }
    ]);
  }

  //seach
  const typingTimeoutRef = useRef(null);
  const handleSearch = (keyword) => {
    console.log(keyword);
    if (keyword) {
      let newData = markers.filter((marker) => { return marker.id = keyword });
      console.log(newData);
      setMarkers([newData])
    }
    else
      setMarkers(markers);
  }

  //menu
  const clickEyeSearch = () => {
    //xử lý giao diện seach
    if (eyeSearch === true) {
      setEyeSearch(false);
      setMarginLeft('0px');
      setMarginLeft2('0px');
      setIcon(<CaretRightOutlined style={{ fontSize: '16px' }} />);
      setIcon2(<MenuUnfoldOutlined style={{ fontSize: '16px' }} />);
    } else {
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
      setEyeMenu(false);
      setMarginLeft2('0px');
      setMarginLeft('0px');
      setIcon(<CaretRightOutlined style={{ fontSize: '16px' }} />);
      setIcon2(<MenuUnfoldOutlined style={{ fontSize: '16px' }} />);
    } else {
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
    setLoadingPolygon(!loadingPolygon);
    setCheckMarker(false)
    console.log(loadingPolygon)
    googleMapPolygon(maps, mapAPI);
    console.log(mapAPI);
  }

  //load polygon
  const googleMapPolygon = async (map, maps) => {
    setCheckMarker(false);
    const db = firebase.firestore();
    const data = await db.collection('Farm').get();
    const result = data.docs.map(doc => doc.data());
    var pointPolygon = result;
    if (result == '') {
      message.error('cần ít nhất 2 điểm!', 4);
    } else {
      var polygon = new maps.Polygon({
        paths: pointPolygon,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35
      });
      polygon.setMap(map);
      polygon.addListener('click', () => {
        polygon.setMap(null)
        message.success('Ẩn trang trại')
        setTimeout(() => {
          setCheckMarker(true)
        },300)
      })

    }
    message.success('Vẽ thành công!', 2);
  };

  //dung API cho marker
  var Markers = async (map, maps) => {
    setCheckMarker(!checkMarker)
    if (checkMarker === true) {
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
          marker.addListener("click", () => { marker.setMap(null) })
        } else {
          message.success('Chưa có Marker!');
        }
      }
    } else {
      setMarkers([])
    }
    console.log(markers);
  }

  //click lấy vị trí 
  const clickMap = (latlng) => {
    if (checkMarker == true && selected == null) {
      setGps({
        lat: latlng.lat,
        lng: latlng.lng
      });
      setModal(true);
      setSelected(null);
      console.log(latlng);
    }
  }

  //ẩn hiện marker
  const toggleMarker = () => {
    setCheckMarker(!checkMarker);
    Markers(maps, mapAPI);//dung API
  }

  //modal lưu tọa độ
  const handleCancel = () => {
    setModal(null);
  }

  //lưu tọa độ vào fire store
  const handleSubmit = () => {
    const db = firebase.firestore();
    db.collection('Farm').add({
      lat: gps.lat,
      lng: gps.lng,
      product: []
    }).then(function () {
      console.log('Lưu thành công');
    }).catch(function (e) {
      console.log('Không thể lưu', e);
    })
    setLoadingModal(true);
    setTimeout(() => {
      setLoadingModal(false);
      setModal(false);
      message.success('Lưu thành công!', 2);
    }, 2000)
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

        {/* {checkMarker ? (markers.map((marker) => {//ẩn hiện marker
          console.log(marker)
          return (<Marker
            {...{ lat: marker.lat, lng: marker.lng }}
            title={marker}
            draggable={true}
            clickMarker={() => {
              setSelected(marker)
            }} />)
        }
        )) : null} */}

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
          markerList={markers}
          handler={handleSearch}
        />) : null}

      <Eye //menu chức năng
        marginTop={'65px'}
        clickEye={clickEyeMenu}
        icon={icon2}
        marginLeft={marginLeft2}
      />

      {eyeMenu ? (
        <ActionClick
          marker={toggleMarker}
          heatmap={toggleHeatMap}
          polygon={drawPolygon}
        />) : null}

      <Modal //hiện khi click lấy tọa độ
        visible={modal}
        title="Tọa độ bạn vừa chọn!"
        // footer={[
        //   <Button
        //     key="back"
        //     onClick={handleCancel}
        //   >
        //     Bỏ qua
        //   </Button>,
        //   <Button
        //     key="submit"
        //     type="primary"
        //     loading={loadingModal}
        //     onClick={handleSubmit}
        //   >
        //     Lưu tọa độ
        //   </Button>,
        // ]}
        onOk={handleSubmit} onCancel={handleCancel}
      >
        <p>Lat: {gps.lat}</p>
        <p>Lng: {gps.lng}</p>
        <Input/>
      </Modal>
    </div>
  );
}

export default App;