import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, LayersControl, WMSTileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pointJson from './data/point';
import lineJson from './data/line';
import polygonJson from './data/polygon';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Component to handle map events
function MapEvents({ setCoordinates }) {
  const map = useMapEvents({
    mousemove: (e) => {
      setCoordinates(e.latlng);
    }
  });
  return null;
}

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState({ lat: 28.3949, lng: 84.1240 });
  
  // Custom icon - use try/catch to handle potential import errors
  let myIcon;
  try {
    myIcon = L.icon({
      iconUrl: require('./img/red_marker.png'),
      iconSize: [40, 40],
    });
  } catch (error) {
    console.warn("Custom marker icon not found, using default icon");
    myIcon = new L.Icon.Default();
  }

  // Polygon style
  const polygonStyle = {
    fillColor: 'red',
    fillOpacity: 1,
    color: '#c0c0c0',
  };

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer   
        center={[28.3949, 84.1240]} 
        zoom={8} 
        style={{ height: '100vh', width: '100%' }}
      >
        {/* Use the MapEvents component to handle events */}
        <MapEvents setCoordinates={setCoordinates} />
        
        <LayersControl position="topright" collapsed={false}>
          {/* Base Layers */}
          <LayersControl.BaseLayer name="OSM" checked>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Water color">
            <TileLayer
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}"
              subdomains="abcd"
              ext="jpg"
            />
          </LayersControl.BaseLayer>

          {/* Overlay Layers */}
          <LayersControl.Overlay name="Markers" checked>
            <Marker position={[28.3949, 84.1240]} icon={myIcon}>
              <Popup>This is Nepal</Popup>
            </Marker>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="GeoJSON Points">
            <GeoJSON data={pointJson} />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="GeoJSON Lines">
            <GeoJSON data={lineJson} />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="WMS Layer">
            <WMSTileLayer
              url="http://localhost:8080/geoserver/wms"
              layers="geoapp:admin"
              format="image/png"
              transparent
            />
          </LayersControl.Overlay>
        </LayersControl>

        {/* Additional Layers */}
        <GeoJSON 
          data={polygonJson}
          style={polygonStyle}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(`<b>Name: </b>${feature.properties.name}`);
          }}
        />
      </MapContainer>

      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '50%',
        zIndex: 1000,
        background: 'white',
        padding: '5px'
      }}>
        Lat: {coordinates.lat.toFixed(4)}, Lng: {coordinates.lng.toFixed(4)}
      </div>
    </div>
  );
};

export default MapComponent;