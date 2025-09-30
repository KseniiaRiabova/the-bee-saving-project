import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import greenBeeIconUrl from '../assets/icons/green-bee.png';
import redBeeIconUrl from '../assets/icons/red-bee.png';
import PropTypes from 'prop-types';

const greenBeeIcon = new Icon({
  iconUrl: greenBeeIconUrl,
  iconSize: [35, 35]
});

const redBeeIcon = new Icon({
  iconUrl: redBeeIconUrl,
  iconSize: [35, 35]
});

export const Map = ({ requests }) => {
  if (!Array.isArray(requests)) {
    return null;
  }

  return (
    <MapContainer
      className="leaflet-container w-[150rem] h-[25rem] z-0"
      center={[0, 0]}
      zoom={2}
      minZoom={2}
    // scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {requests.map(marker => {
        if (!marker?.location?.coordinates?.length) return null;

        return (
          <Marker
            key={marker.id}
            position={[marker.location.coordinates[0], marker.location.coordinates[1]]}
            icon={marker.isActive ? greenBeeIcon : redBeeIcon}
          >
            <Popup>
              <div>
                <h2 className="text-center underline mb-1">{marker.location?.country || 'Unknown'}</h2>
                <div>
                  <span className="underline">City</span>: {marker.location?.city || 'Unknown'}
                </div>
                <div>
                  <span className="underline">Latitude</span>: {marker.location.coordinates[0]}
                </div>
                <div>
                  <span className="underline">Longitude</span>: {marker.location.coordinates[1]}
                </div>
                <div>
                  <span className="underline">Status</span>: {marker.isActive ? 'Found' : 'Saved'}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

Map.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      location: PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
        country: PropTypes.string,
        city: PropTypes.string
      }).isRequired,
      isActive: PropTypes.bool.isRequired
    })
  ).isRequired
};
