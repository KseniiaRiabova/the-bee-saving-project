import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import greenBeeIconUrl from '../assets/icons/green-bee.png';
import redBeeIconUrl from '../assets/icons/red-bee.png';
import PropTypes from 'prop-types';

const greenBeeIcon = new Icon({
  iconUrl: greenBeeIconUrl,
  iconSize: [35, 35],
});

const redBeeIcon = new Icon({
  iconUrl: redBeeIconUrl,
  iconSize: [35, 35],
});

export const Map = ({ requests }) => {
  if (!Array.isArray(requests)) {
    return null;
  }

  return (
    <div className='flex justify-center pb-5 md:pb-10'>
      <MapContainer
        className='leaflet-container w-[150rem] h-[32rem] z-0'
        center={[0, 0]}
        zoom={2}
        minZoom={2}
        // scrollWheelZoom={true}
        //maxZoom={8}
        maxBounds={[
          [-85, -180],
          [85, 180],
        ]}
        maxBoundsViscosity={1.0} // Fix position on border
      >
        {/* <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      /> */}

        {/* light theme */}
        <TileLayer
          className='block dark:hidden'
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />

        {/* dark theme */}
        <TileLayer
          className='hidden dark:block'
          url='https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
          attribution='&copy; OSM &copy; CARTO'
        />
        {/* white labels for dark theme*/}
        <TileLayer
          className='hidden dark:block'
          url='https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png'
        />

        {requests.map((marker) => {
          if (!marker?.location?.coordinates?.length) return null;

          return (
            <Marker
              key={marker.id}
              position={[
                marker.location.coordinates[0],
                marker.location.coordinates[1],
              ]}
              icon={marker.isActive ? greenBeeIcon : redBeeIcon}
            >
              <Popup>
                <div className='text-base space-y-1.5'>
                  <h3 className='text-center mb-1'>
                    {marker.location?.country || 'Unknown'}
                  </h3>
                  <p>
                    <span className='font-bold'>City</span>:
                    {marker.location?.city || 'Unknown'}
                  </p>
                  <p>
                    <span className='font-bold'>Latitude</span>:
                    {marker.location.coordinates[0]}
                  </p>
                  <p>
                    <span className='font-bold'>Longitude</span>:
                    {marker.location.coordinates[1]}
                  </p>
                  <p>
                    <span className='font-bold'>Status</span>:
                    {marker.isActive ? 'Found' : 'Saved'}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

Map.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      location: PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
        country: PropTypes.string,
        city: PropTypes.string,
      }).isRequired,
      isActive: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
