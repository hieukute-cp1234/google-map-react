/* global google */
import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

import './heatmap.css'

class HeatMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  constructor(props) {
    super(props)
    this.state = {
      heatmapVisible: true,
      heatmapPoints: [
        { lat: 59.95, lng: 30.33 },
        { lat: 59.96, lng: 30.32 }
      ]
    }
  }

  onMapClick({ x, y, lat, lng, event }) {
    if (!this.state.heatmapVisible) {
      return
    }

    this.setState({
      heatmapPoints: [...this.state.heatmapPoints, { lat, lng }]
    })
    if (this._googleMap !== undefined) {
      const point = new google.maps.LatLng(lat, lng)
      this._googleMap.heatmap.data.push(point)
    }
    
  }

  toggleHeatMap() {
    this.setState({
      heatmapVisible: !this.state.heatmapVisible
    }, () => {
      if (this._googleMap !== undefined) {
        this._googleMap.heatmap.setMap(this.state.heatmapVisible ? this._googleMap.map_ : null)
      }
    })
    console.log(this.setState)
  }

  render() {

    const apiKey = { key: 'AIzaSyBSoilOkkmHnYmt2O8qzPX228VKDtWH9KA' }
    const heatMapData = {
      positions: this.state.heatmapPoints,
      options: {
        radius: 20,
        opacity: 0.6
      }
    }

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          ref={(el) => (console.log(this._googleMap = el))}
          bootstrapURLKeys={apiKey}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          heatmapLibrary={true}
          heatmap={heatMapData}
          onClick={this.onMapClick.bind(this)}
        >
        </GoogleMapReact>
        <button className="toggleButton" onClick={this.toggleHeatMap.bind(this)}>Toggle heatmap</button>
      </div>
    )
  }
}

export default HeatMap;