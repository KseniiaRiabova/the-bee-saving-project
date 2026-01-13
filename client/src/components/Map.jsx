import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L, { Icon, latLngBounds } from 'leaflet';
import 'leaflet.markercluster';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import greenBeeIconUrl from '../assets/icons/green-bee.png';
import redBeeIconUrl from '../assets/icons/red-bee.png';

/* =======================
   Marker Icons
======================= */
const greenBeeIcon = new Icon({
  iconUrl: greenBeeIconUrl,
  iconSize: [44, 44], // ensure minimum 44px
  iconAnchor: [22, 44], // adjust anchor to bottom center
  popupAnchor: [0, -30],
  className: 'leaflet-marker-touch',
});

const redBeeIcon = new Icon({
  iconUrl: redBeeIconUrl,
  iconSize: [44, 44],
  iconAnchor: [22, 44],
  popupAnchor: [0, -30],
  className: 'leaflet-marker-touch',
});

/* =======================
   Marker Cluster Component
======================= */
const MarkerCluster = ({ requests }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Remove previous cluster layers
    map.eachLayer(layer => {
      if (layer?.options?.cluster) map.removeLayer(layer);
    });

    // @ts-ignore
    const clusterGroup = L.markerClusterGroup({
      maxClusterRadius: 60,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      zoomToBoundsOnClick: true,
      disableClusteringAtZoom: map.getMaxZoom(),
    });
    clusterGroup.options.cluster = true;

    requests
      .filter(r => r?.location?.coordinates?.length === 2)
      .forEach(marker => {
        const [lng, lat] = marker.location.coordinates;
        const m = L.marker([lat, lng], {
          icon: marker.isActive ? greenBeeIcon : redBeeIcon,
        });
        const popupContent = `
        <div style="font-size:14px;">
          <h3 style="text-align:center;margin-bottom:4px;">${marker.location?.country || 'Unknown'}</h3>
          <p><strong>City:</strong> ${marker.location?.city || 'Unknown'}</p>
          <p><strong>Latitude:</strong> ${lat}</p>
          <p><strong>Longitude:</strong> ${lng}</p>
          <p><strong>Status:</strong> ${marker.isActive ? 'Found' : 'Saved'}</p>
        </div>
      `;
        m.bindPopup(popupContent);
        clusterGroup.addLayer(m);
      });

    map.addLayer(clusterGroup);

    const positions = requests
      .filter(r => r?.location?.coordinates?.length === 2)
      .map(r => L.latLng(
        r.location.coordinates[1], // latitude
        r.location.coordinates[0] // longitude
      ));

    // Single marker → center & zoom
    if (positions.length === 1) {
      map.setView(positions[0], 10, { animate: true });
    }
    // Multiple markers → fit bounds
    else if (positions.length > 1) {
      const bounds = latLngBounds(positions);
      // map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12, animate: true });
      map.fitBounds(bounds, {
        paddingTopLeft: [40, 520],
        paddingBottomRight: [40, 40],
        maxZoom: 12,
        animate: true,
      });
    }

    // Fix resize issues
    setTimeout(() => map.invalidateSize(), 150);
  }, [map, requests]);

  return null;
};

MarkerCluster.propTypes = {
  requests: PropTypes.array.isRequired,
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
        maxZoom={12}
        maxBounds={[
          [-85, -180],
          [85, 180],
        ]}
        maxBoundsViscosity={1.0}
      >
        {/* Tile Layers */}
        <TileLayer
          className='block dark:hidden'
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          attribution='&copy; OSM &copy; CARTO'
        />

        {/* Light theme */}
        <TileLayer
          className='hidden dark:block'
          url='https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
          attribution='&copy; OSM &copy; CARTO'
        />

        {/* Dark theme */}
        <TileLayer
          className='hidden dark:block'
          url='https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png'
        />

        {/* Marker Clustering */}
        <MarkerCluster requests={requests} />
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
