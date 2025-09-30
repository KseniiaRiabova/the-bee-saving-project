import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BACKEND_URL } from '../../configs/envConfig';
import MapComponent from './MapComponent';
import FetchLocationData from '../../../lib/FetchLocationData';
import useRequestStore from '../../../stores/useRequestStore';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-geosearch/dist/geosearch.css';

export const RequestFormModal = ({ showModal, setShowModal }) => {
  const customLabelStyles =
    'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
  const customInputStyles =
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500';

  const { getAccessTokenSilently } = useAuth0();
  const { addRequest } = useRequestStore();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    city: '',
    country: '',
    contactNumber: '',
    image: '',
    isActive: true,
    isAccepted: false,
  });
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setMarkerPosition([latitude, longitude]);
            FetchLocationData(latitude, longitude, setFormData); // Already exists, sets formData
          },
          (error) => {
            console.error('Error getting user location:', error);
            // Optionally keep default location if error
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    if (showModal) {
      fetchUserLocation();
    }
  }, [showModal]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${BACKEND_URL}/dashboard`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to get RESPONSE');
        }

        if (response.ok) {
          const parsedResponse = await response.json();
          const data = parsedResponse.user;
          setFormData((prevData) => ({
            ...prevData,
            contactNumber: data.metadata?.contactNumber || '',
          }));
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (showModal) {
      fetchUserData();
    }
  }, [getAccessTokenSilently, showModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = true;
    if (!formData.description.trim()) newErrors.description = true;
    if (!formData.city) newErrors.city = true;
    if (!formData.country) newErrors.country = true;
    if (!formData.contactNumber) newErrors.contactNumber = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${BACKEND_URL}/requests/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create request');
      }

      const data = await response.json();
      await addRequest(data);
      setShowModal(false);
      setErrors({});
    } catch (error) {
      console.error('Error creating request:', error);
      setErrors({ submit: true });
    }
  };

  return (
    <>
      {showModal ? (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="relative p-4 w-full max-w-lg max-h-full">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-xl font-semibold">Request Details</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setShowModal(false)}
                >
                  <span className="text-black h-6 w-6 block bg-gray-400 rounded-full">
                    X
                  </span>
                </button>
              </div>

              <div className="relative bg-white rounded-lg dark:bg-gray-700">
                <form className="p-4 mx-4 md:p-5">
                  <div className="grid gap-3 grid-cols-2">
                    {/* Title */}
                    <div className="col-span-12">
                      <label htmlFor="title" className={customLabelStyles}>
                        Title *
                      </label>
                      <div className="mt-2">
                        <input
                          id="title"
                          name="title"
                          type="text"
                          value={formData.title}
                          onChange={handleChange}
                          className={customInputStyles}
                        />
                      </div>
                      {errors.title && (
                        <p className="text-red-500 text-sm">
                          Enter valid title
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="col-span-12">
                      <label htmlFor="description" className={customLabelStyles}>
                        Description *
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className={customInputStyles}
                        />
                      </div>
                      {errors.description && (
                        <p className="text-red-500 text-sm">
                          Enter valid description
                        </p>
                      )}
                    </div>

                    {/* Map Rendering */}
                    <div className="col-span-12">
                      <label className={customLabelStyles}>Map</label>
                      <MapContainer


                        center={markerPosition}
                        zoom={11}
                        style={{ width: '100%', height: '300px' }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MapComponent markerPosition={markerPosition} FetchLocationData={FetchLocationData} setFormData={setFormData} setMarkerPosition={setMarkerPosition} />
                      </MapContainer>
                    </div>

                    {/* City and Country */}
                    <div className="col-span-12">
                      <label htmlFor="city" className={customLabelStyles}>
                        City *
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={formData.city}
                          onChange={handleChange}
                          className={customInputStyles}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-span-12">
                      <label htmlFor="country" className={customLabelStyles}>
                        Country *
                      </label>
                      <div className="mt-2">
                        <input
                          id="country"
                          name="country"
                          type="text"
                          value={formData.country}
                          onChange={handleChange}
                          className={customInputStyles}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-span-12">
                      <label htmlFor="contactNumber" className={customLabelStyles}>
                        Phone Number *
                      </label>
                      <div className="mt-2">
                        <input
                          id="contactNumber"
                          name="contactNumber"
                          type="text"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          className={customInputStyles}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      {errors.contactNumber && (
                        <p className="text-red-500 text-sm">
                          Enter valid phone number
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-[#F4743B] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={(e) => { handleSubmit(e); }}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

MapComponent.propTypes = {
  markerPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  FetchLocationData: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  setMarkerPosition: PropTypes.func.isRequired,
};

RequestFormModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default RequestFormModal;
