import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';

const { BaseLayer } = LayersControl; // <-- Destructure BaseLayer

const Location = () => {
  return (
    <MapContainer
      center={[20.5937, 78.9629]} // Centered over India 🇮🇳
      zoom={5}
      minZoom={0}
      maxZoom={18}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100%' }}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>

        <BaseLayer name="Satellite View (Esri)">
      
          <TileLayer
            attribution="Tiles &copy; Esri"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
    
        </BaseLayer>

        <BaseLayer name="Topo Map">
          <TileLayer
            attribution='Map data &copy; OpenTopoMap'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>
      </LayersControl>

      <Marker position={[28.6139, 77.2090]}> {/* Delhi */}
        <Popup>New Delhi, Capital of India</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Location;

