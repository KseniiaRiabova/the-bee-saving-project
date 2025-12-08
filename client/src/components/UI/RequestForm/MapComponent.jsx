import { useState, useEffect } from 'react';
import { Marker, Popup, useMapEvent, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';

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
            setMarkerPosition([latitude, longitude]); // Place marker on user's location
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

    // Listen to "location selected" event from search control
    map.on('geosearch/showlocation', (result) => {
      const { location } = result;
      const lat = location.y;
      const lon = location.x;

      setMarkerPosition([lat, lon]);

      // Better location parsing
      const parts = location.label.split(',').map((s) => s.trim());
      const city = parts.length >= 2 ? parts[parts.length - 2] : '';
      const country = parts.length >= 1 ? parts[parts.length - 1] : '';

      setFormData((prevData) => ({
        ...prevData,
        latitude: lat,
        longitude: lon,
        city: city,
        country: country,
      }));

      // Move the map to the selected location
      map.setView([lat, lon], 13); // Center the map on the search result
    });

    return () => {
      map.removeControl(searchControl);
      map.off('geosearch/showlocation');
    };
  }, [userLocation, map, setMarkerPosition, setFormData]);

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

export default MapComponent;
