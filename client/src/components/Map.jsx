import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, latLngBounds } from 'leaflet';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import greenBeeIconUrl from '../assets/icons/green-bee.png';
import redBeeIconUrl from '../assets/icons/red-bee.png';

/* =======================
   Marker Icons
======================= */
const greenBeeIcon = new Icon({
  iconUrl: greenBeeIconUrl,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

const redBeeIcon = new Icon({
  iconUrl: redBeeIconUrl,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

/* =======================
   Fit map to markers
======================= */
const FitBounds = ({ requests }) => {
  const map = useMap();

  useEffect(() => {
    const positions = requests
      .filter(r => r?.location?.coordinates?.length === 2)
      .map(r => [
        r.location.coordinates[1], // latitude
        r.location.coordinates[0], // longitude
      ]);

    if (!positions.length) return;

    // Single marker → center & zoom
    if (positions.length === 1) {
      map.setView(positions[0], 10, { animate: true });
      map.panBy([0, 80], { animate: true });
    }
    // Multiple markers → fit bounds
    else {
      const bounds = latLngBounds(positions);
      map.fitBounds(bounds, {
        paddingTopLeft: [40, 520],
        paddingBottomRight: [40, 40],
        maxZoom: 12,
        animate: true,
      });
    }

    // Fix resize issues
    setTimeout(() => {
      map.invalidateSize();
    }, 150);
  }, [requests, map]);

  return null;
};

/* =======================
   Map Component
======================= */
export const Map = ({ requests }) => {
  if (!Array.isArray(requests)) return null;

  return (
    <div className='pb-5 md:pb-10'>
      <MapContainer
        className='
          leaflet-container
          w-full
          h-[18rem] sm:h-[24rem] md:h-[32rem] lg:h-[36rem]
          rounded-lg
          z-0
        '
        center={[0, 0]}
        zoom={2}
        minZoom={2}
        maxBounds={[
          [-85, -180],
          [85, 180],
        ]}
        maxBoundsViscosity={1.0}
      >
        {/* Auto-center map */}
        <FitBounds requests={requests} />

        {/* Light theme */}
        <TileLayer
          className='block dark:hidden'
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          attribution='&copy; OSM &copy; CARTO'
        />

        {/* Dark theme */}
        <TileLayer
          className='hidden dark:block'
          url='https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
          attribution='&copy; OSM &copy; CARTO'
        />

        {/* Labels for dark theme */}
        <TileLayer
          className='hidden dark:block'
          url='https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png'
        />

        {/* Markers */}
        {requests.map((marker) => {
          const coords = marker?.location?.coordinates;

          if (!coords || coords.length !== 2) return null;

          return (
            <Marker
              key={marker.id}
              position={[coords[1], coords[0]]}
              icon={marker.isActive ? greenBeeIcon : redBeeIcon}
            >
              <Popup>
                <div className='text-base space-y-1.5'>
                  <h3 className='text-center mb-1'>
                    {marker.location?.country || 'Unknown'}
                  </h3>
                  <p>
                    <span className='font-bold'>City:</span>{' '}
                    {marker.location?.city || 'Unknown'}
                  </p>
                  <p>
                    <span className='font-bold'>Latitude:</span> {coords[0]}
                  </p>
                  <p>
                    <span className='font-bold'>Longitude:</span> {coords[1]}
                  </p>
                  <p>
                    <span className='font-bold'>Status:</span>{' '}
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

/* =======================
   PropTypes
======================= */
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

FitBounds.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      }).isRequired,
    })
  ).isRequired,
};
