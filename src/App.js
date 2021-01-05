/* global google */
import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import data from './data.json';
import './App.css';
import Menu from './component/menu/index';
import InfoWindow from './component/infoWindow/index';
import Marker from './component/marker/index';
import Eye from './component/buttoneye/eye';
import {CaretRightOutlined,CaretLeftOutlined } from '@ant-design/icons';
import firebase from './firebase/config'
//import HeatMap from './component/heatmap/index';

function App(props) {

  //thay đổi icon khi ẩn hiện menu
  const [icon, setIcon] = useState(<CaretRightOutlined style={{ fontSize: '30px' }} />);

  //xét việc ẩn hiện của menu
  const [eye, setEye] = useState(false);

  //truyền data marker
  const [markers, setMarkers] = useState([]);

  //xét việc ẩn hiện của infoWindow
  const [selected, setSelected] = useState(null);

  //xét vị trí của icon khi ẩn hiện menu
  const [marginLeft, setMarginLeft] = useState('-625px');

  //heatMap
  const [heatMapVisible, setHeatMapVisible] = useState(true);
  const [heatMap, setHeatMap] = useState(null);

  //các điểm của heatMap
  const [heatMapPoint, setHeatMapPoint] = useState([
    {
      lat: 21.005994,
      lng: 105.843141
    },
    {
      lat: 21.004514,
      lng: 105.933037
    },
    {
      lat: 21.046535,
      lng: 105.860945
    }
  ]);

  //lấy dữ liệu từ firebase Store
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('Farm').get();
      setMarkers(data.docs.map(doc => doc.data()));
    }
    fetchData()
  }, [])

  //heatmap
  const el = useRef(heatMap);

  const heatMapData = {
    positions: heatMapPoint,
    options: {
      radius: 20,
      opacity: 0.6
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

  const toggleButton = () => {
    setHeatMapVisible(!heatMapVisible);
    console.log(heatMapVisible)
    // setHeatMap(()=>{ 
    //   if (props.googleMap !== undefined) {
    //   props.googleMap.heatmap.setMap(heatMapVisible ? props.googleMap.map : null)
    // }
    // })

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

  const clickEye = () => {//ham nay xu ly giao dien khi menu an hien
    if (eye === true) {
      setEye(false);
      setMarginLeft('-625px');
      setIcon(<CaretRightOutlined style={{ fontSize: '30px' }}/>)
    } else {
      setEye(true);
      setMarginLeft('-225px');
      setIcon(<CaretLeftOutlined style={{ fontSize: '30px' }}/>)
    }
  }

  const clickInfo = () => {
    setSelected(null);
  }

  //click vào map để lấy marker (inforWindow có tọa độ gps)
  const clickMap = (latlng) => {
    const newMarker = [
      ...markers,
      {
        lat: latlng.lat,
        lng: latlng.lng
      }
    ];

    setMarkers(newMarker);
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

  const clickCheckBox = (id) => {
    let newmar = markers.map((marker) => { console.log(marker.name) });
  }

  const googleMapPolygon = (map, maps) => {
    var triangleCoords = [
      {
        lat: 21.005994,
        lng: 105.843141
      },
      {
        lat: 21.004514,
        lng: 105.933037
      },
      {
        lat: 21.046535,
        lng: 105.860945
      },
    ];
    console.log(map, maps);

    var bermudaTriangle = new maps.Polygon({
      paths: triangleCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35
    });
    bermudaTriangle.setMap(map);
  };

  return (
    <div style={{ height: '90vh', width: '100%', display: 'flex' }}>
      <GoogleMapReact
        ref={el}
        bootstrapURLKeys={{
          key: 'AIzaSyBSoilOkkmHnYmt2O8qzPX228VKDtWH9KA',
          libraries: ['visualization'],
        }}
        defaultCenter={map.center}
        defaultZoom={map.zoom}
        // heatmapLibrary={true}
        // heatmap={heatMapData}
        // yesIWantToUseGoogleMapApiInternals
        // onGoogleApiLoaded={({ map, maps }) => googleMapPolygon(map, maps)}
        //layerTypes={['TrafficLayer', 'TransitLayer','BicyclingLayer']}
        onClick={clickMap}
      >
        {eye ? (markers.map((marker) =>
          <Marker
            {...{ lat: marker.lat, lng: marker.lng }}
            clickMarker={() => { setSelected(marker) }} />
        )) : null}

        {selected ? (
          <InfoWindow
            {...{ lat: selected.lat, lng: selected.lng }}
            selected={selected}
            click={clickInfo} />
        ) : null}

        {eye ? (<Menu markerList={markers} handler={handleSearch} />) : null}

        <Eye clickEye={clickEye} icon={icon} marginLeft={marginLeft} />

      </GoogleMapReact>
      {/* <button className='toggleButton' onClick={toggleButton} >Heat Map</button> */}
    </div>
  );
}

export default App;