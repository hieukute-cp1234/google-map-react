/* global google */
import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import data from './data.json';
import './App.css';
import Menu from './component/menu/index';
import InfoWindow from './component/infoWindow/index';
import Marker from './component/marker/index';
import Eye from './component/buttoneye/eye';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import firebase from './firebase/config'
import { message, Modal, Button } from 'antd'
//import HeatMap from './component/heatmap/index';

function App(props) {

  //draw polygon
  const [loadingPolygon, setLoadingPolygon] = useState(false);
  const [checkMarker, setCheckMarker] = useState(true);

  //lưu thành phần của googleMap khi render
  const [maps, setMaps] = useState(null);
  //lưu API của google khhi render
  const [mapAPI, setMapAPI] = useState(null);

  //modal
  const [loadingModal, setLoadingModal] = useState(false);
  const [modal, setModal] = useState(false);

  //thay đổi icon khi ẩn hiện menu
  const [icon, setIcon] = useState(<CaretRightOutlined style={{ fontSize: '30px' }} />);

  //xét việc ẩn hiện của menu
  const [eye, setEye] = useState(false);

  //truyền data marker
  const [markers, setMarkers] = useState([]);

  //xét việc ẩn hiện của infoWindow
  const [selected, setSelected] = useState(null);

  //xét vị trí của icon khi ẩn hiện menu
  const [marginLeft, setMarginLeft] = useState('0px');

  //heatMap
  const [heatMapVisible, setHeatMapVisible] = useState(true);
  const [heatMap, setHeatMap] = useState(null);

  //lấy vị trí muốn lưu khi click
  const [gps, setGps] = useState({})
  //const [pointPolygon,setPointPolygon] = useState([])

  //các điểm của heatMap
  const [heatMapPoint, setHeatMapPoint] = useState([]);

  //lấy dữ liệu từ firebase Store
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('Farm').get();
      const result = data.docs.map(doc => doc.data());
      setMarkers(result);
      console.log(result)
      return result;
    }
    fetchData()
  }, [modal == true])

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
      const data = await db.collection('Farm').get();
      const result = data.docs.map(doc => doc.data());
      setHeatMapPoint(result);
      setCheckMarker(false);
    } else {
      setCheckMarker(true);
      setHeatMapPoint([]);
    }
  }

  const onClickMap = ({ x, y, lat, lng, e }) => {
    if (!heatMapVisible) {
      return;
    }
    setHeatMapPoint([
      ...heatMapPoint, { lat, lng }
    ]);
    if (props.googleMap !== undefined) {
      const point = new google.maps.LatLng(lat, lng);
      props.googleMap.heatmap.data.push(point);
    }
  }

  //seach
  const handleSearch = (keyword) => {
    console.log(keyword);
    if (keyword) {
      let newMarkers = data.filter((marker) => { return marker.name <= keyword });
      console.log(newMarkers);
      setMarkers([...newMarkers]);
    }
    else setMarkers(data);
  }

  const clickEye = () => {
    //ham nay xu ly giao dien khi menu an hien
    if (eye === true) {
      setEye(false);
      setMarginLeft('0px');
      setIcon(<CaretRightOutlined style={{ fontSize: '30px' }} />)
    } else {
      setEye(true);
      setMarginLeft('400px');
      setIcon(<CaretLeftOutlined style={{ fontSize: '30px' }} />)
    }
  }

  //click vào map để lấy marker 
  const clickMap = (latlng) => {
    // const newMarker = [
    //   ...markers,
    //   {
    //     lat: latlng.lat,
    //     lng: latlng.lng
    //   }
    // ];
    // setMarkers(newMarker);

    setGps({
      lat: latlng.lat,
      lng: latlng.lng
    })
    setModal(true);
    setSelected(null);
    console.log(latlng);
  }

  const map = {
    center: {
      lat: 21.027763,
      lng: 105.83416
    },
    zoom: 12
  }

  const drawPolygon = () => {
    console.log(maps);
    console.log(mapAPI);
    // setCheckPolygon(!checkPolygon);
    // console.log(checkPolygon)
    // if (checkPolygon === true) {
    //   setLoadingPolygon(true);
    //   setTimeout(() => {
    //     setLoadingPolygon(false);
    //     googleMapPolygon(maps, mapAPI);
    //   }, 1000)
    // }else{
    //   setPointPolygon([]);
    //   console.log('rong');
    // }
    setLoadingPolygon(true);
    setTimeout(() => {
      setLoadingPolygon(false);
      googleMapPolygon(maps, mapAPI);
    }, 1000)
  }

  //load API google
  const onMap = (map, maps) => {
    setMaps(map);
    setMapAPI(maps);
  }

  const googleMapPolygon = async (map, maps) => {
    const db = firebase.firestore();
    const data = await db.collection('Farm').get();
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
      message.success('Vẽ thành công!', 2);
      console.log('vẽ thành công!')
    }
  };

  const handleCancel = () => {
    setModal(false);
  }

  const handleSubmit = () => {
    const db = firebase.firestore();
    db.collection('Farm').add({
      lat: gps.lat,
      lng: gps.lng
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
        // ref={(el)=>(props.googleMap = el)}
        bootstrapURLKeys={{
          key: 'AIzaSyBSoilOkkmHnYmt2O8qzPX228VKDtWH9KA',
          libraries: ['visualization'],
        }}
        defaultCenter={map.center}
        defaultZoom={map.zoom}
        heatmapLibrary={true}
        heatmap={heatMapData}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => onMap(map, maps)}
        //layerTypes={['TrafficLayer', 'TransitLayer','BicyclingLayer']}
        onClick={clickMap}
      >
        {checkMarker ? (markers.map((marker) =>
          <Marker
            {...{ lat: marker.lat, lng: marker.lng }}
            clickMarker={() => setSelected(marker)} />
        )) : null}

        {selected ? (
          <InfoWindow
            {...{ lat: selected.lat, lng: selected.lng }}
            selected={selected}
            click={() => { setSelected(null) }} />
        ) : null}

      </GoogleMapReact>

      <button type="primary" className="heat_map" onClick={toggleHeatMap}>Heat Map</button>
      <button type="primary" className="draw_polygon" onClick={drawPolygon} loading={loadingPolygon}>Draw Polygon</button>
      <button type="primary" className="marker" onClick={() => setCheckMarker(!checkMarker)}>Marker</button>
      <Eye clickEye={clickEye} icon={icon} marginLeft={marginLeft} />

      {eye ? (<Menu markerList={markers} handler={handleSearch} />) : null}

      <Modal
        visible={modal}
        title="Tọa độ bạn vừa chọn!"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Bỏ qua
          </Button>,
          <Button key="submit" type="primary" loading={loadingModal} onClick={handleSubmit}>
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