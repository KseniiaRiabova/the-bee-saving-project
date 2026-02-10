import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup, useMapEvent, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const MapComponent = ({
  markerPosition,
  setMarkerPosition,
  FetchLocationData,
  setFormData,
}) => {
  const [userLocation, setUserLocation] = useState(null);
  const map = useMap();

  // Function to handle map click and set marker
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    const position = [lat, lng];
    setMarkerPosition(position);
    FetchLocationData(lat, lng, setFormData);

    // Move map on click and center it around the clicked position
    map.setView(position, 13); // 13 is the zoom level
  };

  useMapEvent('click', handleMapClick);

  useEffect(() => {
    // Get user's current location and set the initial marker
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            setMarkerPosition([latitude, longitude]);
            map.setView([latitude, longitude], 13); // Center map on user's location
            FetchLocationData(latitude, longitude, setFormData); // Fetch initial data
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    };

    getUserLocation();
  }, [map, setMarkerPosition, FetchLocationData, setFormData]);

  useEffect(() => {
    if (!userLocation) return;

    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: false,
      autoClose: true,
      searchLabel: 'Search for location...',
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on('geosearch/showlocation', (result) => {
      const { location } = result;
      const lat = location.y;
      const lon = location.x;

      setMarkerPosition([lat, lon]);

      const parts = location.label.split(',').map((s) => s.trim());

      const country = parts.length >= 1 ? parts[parts.length - 1] : '';
      const city = parts.length >= 2 ? parts[parts.length - 2] : '';
      const streetInfo = parts.length > 2 ? parts.slice(0, -2).join(', ') : '';

      setFormData((prevData) => ({
        ...prevData,
        latitude: lat,
        longitude: lon,
        city,
        country,
        street: streetInfo,
        fullAddress: location.label,
      }));

      // Also fetch detailed reverse geocoding data
      FetchLocationData(lat, lon, setFormData);

      // Move the map to the selected location
      map.setView([lat, lon], 13);
    });

    return () => {
      map.removeControl(searchControl);
      map.off('geosearch/showlocation');
    };
  }, [userLocation, map, setMarkerPosition, setFormData, FetchLocationData]);

  return (
    <Marker position={markerPosition}>
      <Popup>
        <span>
          Latitude: {markerPosition[0]}, Longitude: {markerPosition[1]}
        </span>
      </Popup>
    </Marker>
  );
};

// ✅ PropTypes
MapComponent.propTypes = {
  markerPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  setMarkerPosition: PropTypes.func.isRequired,
  FetchLocationData: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default MapComponent;
