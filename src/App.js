/* global google */
import React, { useState, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import data from './data.json';
import './App.css';
import Menu from './component/menu/index';
import InfoWindow from './component/infoWindow/index';
import Marker from './component/marker/index';
import Eye from './component/buttoneye/eye';
import { EyeInvisibleFilled, EyeFilled } from '@ant-design/icons';
//import HeatMap from './component/heatmap/index';

function App(props) {

  const [icon, setIcon] = useState(<EyeFilled style={{ fontSize: '30px' }} />);//thay icon khi an hien menu
  const [eye, setEye] = useState(false);//xet viec an hien cua menu
  const [markers, setMarkers] = useState(data);
  const [selected, setSelected] = useState(null);//xet viec an hien cua infoWindow
  const [marginLeft, setMarginLeft] = useState('-910px');//xet vi tri cua icon  khi menu an hien
  const [heatMapVisible, setHeatMapVisible] = useState(true);
  const [heatMap, setHeatMap] = useState(null);
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
      setMarginLeft('-910px');
      setIcon(<EyeFilled style={{ fontSize: '30px' }} />);
    } else {
      setEye(true);
      setMarginLeft('-360px');
      setIcon(<EyeInvisibleFilled style={{ fontSize: '30px' }} />);
    }
  }

  const clickInfo = () => {
    setSelected(null);
  }

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
  }

  const map = {
    center: {
      lat: 21.027763,
      lng: 105.83416
    },
    zoom: 13
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
    console.log(map, maps)
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
        onClick={onClickMap}
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