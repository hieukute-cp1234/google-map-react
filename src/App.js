/* global google */
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

import firebase from './firebase/config';
import data from './data.json';//data fake
import GoogleMapReact from 'google-map-react';

import Menu from './component/menu/index';
import ActionClick from './component/actionClick/index';
import InforNumberAmount from './component/inforNumberAmount/index';
import InfoWindow from './component/infoWindow/index';
import Marker from './component/marker/index';
import Eye from './component/buttoneye/eye';

import {
  CaretRightOutlined,
  CaretLeftOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { message, Modal, Button } from 'antd' //các component cần thiết

function App(props) {

  //lưu thành phần của googleMap khi render
  const [maps, setMaps] = useState(null);
  //lưu API của google khhi render
  const [mapAPI, setMapAPI] = useState(null);

  //draw polygon
  const [loadingPolygon, setLoadingPolygon] = useState(true);

  //lấy vị trí muốn lưu khi click
  const [gps, setGps] = useState({});
  //ẩn hiện marker
  const [checkMarker, setCheckMarker] = useState(true);
  //truyền data marker
  const [markers, setMarkers] = useState([]);

  //lấy thông tin người dùng nhập
  //const [data1, setData] = useState([]);

  //state heat map
  const [heatMapVisible, setHeatMapVisible] = useState(true);
  //point heat map
  const [heatMapPoint, setHeatMapPoint] = useState([]);

  //modal
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

  //const [pointPolygon,setPointPolygon] = useState([])

  //lấy dữ liệu từ firebase Store
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('Hust').get();
      const resultData = data.docs.map(doc => doc.data());
      console.log(resultData);
      //setData(resultData[0].product);
      // for (let i = 0; i < resultData.length; i++) {
      //   console.log({ lat: resultData[i].lat, lng: resultData[i].lng })
      //   const Data=[...markers,
      //     {
      //       lat:resultData[i].lat,
      //       lng:resultData[i].lng
      //     }
      //   ]
      //   setMarkers(Data)
      // }

      setMarkers(resultData);
      return resultData;
    }
    fetchData();
  }, [modal == true])

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('Farm').get();
      const result = data.docs.map(doc => doc.data());
      //setMarkers(result);
      console.log(result);
      return result;
    }
    fetchData()
  }, [modal == true])

  //load API google
  const onMap = (map, maps) => {
    setMaps(map);
    setMapAPI(maps);
  }

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
    }
  }

  const toggleHeatMap = async () => {
    setHeatMapVisible(!heatMapVisible);
    if (heatMapVisible == true) {
      const db = firebase.firestore();
      const data = await db.collection('Hust').get();
      const result = data.docs.map(doc => doc.data());
      setHeatMapPoint(result);
      setCheckMarker(false);
    } else {
      setHeatMapPoint([]);
    }
  }

  const onClickMap = ({ x, y, lat, lng, e }) => {
    console.log('onclickmap')
    setHeatMapPoint([
      ...heatMapPoint, { lat, lng }
    ]);
  }

  //seach
  const handleSearch = (keyword) => {
    console.log(keyword);
    console.log(data)
    if (keyword) {
      let newData = data.filter((marker) => { return marker.name <= keyword });
      console.log(newData);
      //setData([...newData]);
    }
    //else 
    //setData(data);
  }
  //menu
  const clickEyeSearch = () => {
    //ham nay xu ly giao dien khi menu an hien
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
    //ham nay xu ly giao dien khi menu an hien
    if (eyeMenu === true) {
      setEyeMenu(false);
      setMarginLeft2('0px');
      setMarginLeft('0px');
      setIcon(<CaretRightOutlined style={{ fontSize: '16px' }} />);
      setIcon2(<MenuUnfoldOutlined style={{ fontSize: '16px' }} />);
    } else {
      setEyeMenu(true);
      setEyeSearch(false);
      setMarginLeft2('150px');
      setMarginLeft('150px');
      setIcon(<CaretLeftOutlined style={{ fontSize: '16px' }} />);
      setIcon2(<MenuFoldOutlined style={{ fontSize: '16px' }} />);
    }
  }

  //vẽ polygon
  const drawPolygon = () => {
    setLoadingPolygon(!loadingPolygon);
    googleMapPolygon(maps, mapAPI);
    console.log(mapAPI);
  }

  //load polygon
  const googleMapPolygon = async (map, maps) => {
    const db = firebase.firestore();
    const data = await db.collection('Hust').get();
    const result = data.docs.map(doc => doc.data());
    var pointPolygon = result;
    if (result == '') {
      message.success('cần ít nhất 2 điểm!', 4);
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
    }
    message.success('Vẽ thành công!', 2);
    console.log('vẽ thành công!');
  };

  //click vào map để lấy marker 

  // var diem = new maps.Marker()

  var Markers = (map, maps) => {
    // const db = firebase.firestore();
    // const data = await db.collection('Hust').get();
    // const result = data.docs.map(doc => doc.data());
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      if (data != '') {
        let marker = new maps.Marker({
          position: {
            lat: data[i].lat,
            lng: data[i].lng
          },
          map,
          title: 'hello'
        })
        let InforMarker = new maps.InfoWindow({
          content: data[i].name,
        });
        marker.addListener("click", () => { InforMarker.open(map, marker) })
      }
    }
  }

  const clickMap = (latlng) => {
    // const newMarker = [
    //   ...markers,
    //   {
    //     lat: latlng.lat,
    //     lng: latlng.lng
    //   }
    // ];
    // setMarkers(newMarker);
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

  const toggleMarker = () => {
    setCheckMarker(!checkMarker);
    Markers(maps,mapAPI)
  }

  //modal
  const handleCancel = () => {
    setModal(false);
  }

  const handleSubmit = () => {
    const db = firebase.firestore();
    db.collection('Hust').add({
      lat: gps.lat,
      lng: gps.lng,
      product: [
        {
          name: 'chưa có',
          amount: 0
        }
      ]
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
          libraries: ['visualization'],
        }}
        defaultCenter={map.center}
        defaultZoom={map.zoom}
        heatmapLibrary={true}
        heatmap={heatMapData}//load heatMap
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => onMap(map, maps)}//load API
        //layerTypes={['TrafficLayer', 'TransitLayer','BicyclingLayer']}
        onClick={clickMap}
      >

        {checkMarker ? (markers.map((marker) => {
          console.log(marker)
          return (<Marker
            {...{ lat: marker.lat, lng: marker.lng }}
            clickMarker={() => setSelected(marker)} />)
        }
        )) : null}

        {/* {checkMarker ? markers.map((gps) =>
          <InforNumberAmount
            {...{ lat: gps.lat, lng: gps.lng }}
            product={gps.product}
          />
        ) : null} */}

        {selected ? (
          <InfoWindow
            {...{ lat: selected.lat, lng: selected.lng }}
            selected={selected}
            click={() => { setSelected(null) }} />
        ) : null}

      </GoogleMapReact>

      <Eye
        marginTop={'10px'}
        clickEye={clickEyeSearch}
        icon={icon}
        marginLeft={marginLeft}
      />

      <Eye
        marginTop={'65px'}
        clickEye={clickEyeMenu}
        icon={icon2}
        marginLeft={marginLeft2}
      />

      {eyeSearch ? (
        <Menu
          markerList={markers}
          handler={handleSearch}
        />) : null}

      {eyeMenu ? (
        <ActionClick
          marker={toggleMarker}
          heatmap={toggleHeatMap}
          polygon={drawPolygon}
        />) : null}

      <Modal
        visible={modal}
        title="Tọa độ bạn vừa chọn!"
        footer={[
          <Button
            key="back"
            onClick={handleCancel}>
            Bỏ qua
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loadingModal}
            onClick={handleSubmit}>
            Lưu tọa độ
          </Button>,
        ]}
      >
        <p>Lat: {gps.lat}</p>
        <p>Lng: {gps.lng}</p>
      </Modal>
    </div>
  );
}

export default App;