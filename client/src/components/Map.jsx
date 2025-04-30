import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import mapData from './mapData';
import greenBeeIconUrl from '../assets/icons/green-bee.png';
import redBeeIconUrl from '../assets/icons/red-bee.png';
 
import { useState, useEffect,useCallback  } from 'react';
// import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { BACKEND_URL } from './configs/envConfig';

const greenBeeIcon = new Icon({
  iconUrl: greenBeeIconUrl,
  iconSize: [35, 35]
});

const redBeeIcon = new Icon({
  iconUrl: redBeeIconUrl,
  iconSize: [35, 35]
});

export const Map = ({requests,setRequests}) => {
  // console.log("requests:" + requests)
  const { getAccessTokenSilently, user } = useAuth0();
  const fetchUserData = useCallback(async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${BACKEND_URL}/requests`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });


      if (!response.ok) {
        throw new Error('Failed to cancel the request');
      }

      if (response.ok) {
        const parsedResponse=await response.json()
        
        // const real=await response.json()
        // console.log(real)
       
       
        const data = parsedResponse.requests
        setRequests(data)
        // console.log(data)
        

         
        
     
      }

    } catch (error) {
      console.error('Failed to cancel the request:', error);
      console.error(error);
    }
  }, [getAccessTokenSilently, BACKEND_URL]);
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
  // console.log(requests)
  
   
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
      {requests.map(marker => (
        <Marker
        key={marker.id}
          
          position={[marker.location.coordinates[0], marker.location.coordinates[1]]}
          icon={marker.isActive ? greenBeeIcon : redBeeIcon}>

         
          <Popup>
            <div>
              <h2 className="text-center underline mb-1"> {marker.location.country} </h2>
              <div>
                <span className="underline">City</span>: {marker.location.city}
              </div>
              <div>
                <span className="underline">Latitude</span>:
                {marker.location.coordinates[0]}
              </div>
              <div>
                <span className="underline">Longitude</span>:
                {marker.location.coordinates[1]}
              </div>
              <div>
                <span className="underline">Status</span>:
                {marker.status ? 'Saved' : 'Found'}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
