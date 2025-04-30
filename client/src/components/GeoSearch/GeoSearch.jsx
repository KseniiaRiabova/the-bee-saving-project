// components/GeoSearch.js
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

const GeoSearch = ({ setFormData }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: true,
      autoClose: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on('geosearch/showlocation', (result) => {
      const { x: longitude, y: latitude, label } = result.location;

      const parts = label.split(',').map((s) => s.trim());
      const city = parts.length >= 2 ? parts[parts.length - 2] : '';
      const country = parts.length >= 1 ? parts[parts.length - 1] : '';

      setFormData((prev) => ({
        ...prev,
        latitude: latitude.toFixed(6),
        longitude: longitude.toFixed(6),
        city,
        country,
      }));
    });

    return () => map.removeControl(searchControl);
  }, [map, setFormData]);

  return null;
};

export default GeoSearch;
