import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BACKEND_URL } from '../../configs/envConfig';
import MapComponent from './MapComponent';
import FetchLocationData from '../../../lib/FetchLocationData';
import useRequestStore from '../../../stores/useRequestStore';
import { ButtonClose } from '../ButtonClose';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-geosearch/dist/geosearch.css';

export const RequestFormModal = ({ showModal, setShowModal }) => {
  const customLabelStyles =
    'block mb-2 font-medium text-gray-900 dark:text-white';
  const customInputStyles =
    'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500';

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
    street: '',
    houseNumber: '',
    apartment: '',
    postalCode: '',
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
      await addRequest(formData, token);
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
        <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-gray-500 bg-opacity-75 transition-opacity'>
          <div className='relative p-4 w-full max-w-lg max-h-full'>
            <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
              <div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
                <h3>Request Details</h3>
                <ButtonClose onClose={() => setShowModal(false)} />
              </div>

              <div className='relative bg-white rounded-lg dark:bg-gray-700'>
                <form className='p-4 mx-4 md:p-5'>
                  <div className='grid gap-3 grid-cols-2'>
                    {/* Title */}
                    <div className='col-span-12'>
                      <label htmlFor='title' className={customLabelStyles}>
                        Title *
                      </label>
                      <div className='mt-2'>
                        <input
                          id='title'
                          name='title'
                          type='text'
                          value={formData.title}
                          onChange={handleChange}
                          className={customInputStyles}
                        />
                      </div>
                      {errors.title && (
                        <p className='text-red-500 text-sm'>
                          Enter valid title
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div className='col-span-12'>
                      <label
                        htmlFor='description'
                        className={customLabelStyles}
                      >
                        Description *
                      </label>
                      <div className='mt-2'>
                        <textarea
                          id='description'
                          name='description'
                          value={formData.description}
                          onChange={handleChange}
                          className={customInputStyles}
                        />
                      </div>
                      {errors.description && (
                        <p className='text-red-500 text-sm'>
                          Enter valid description
                        </p>
                      )}
                    </div>

                    {/* Map Rendering */}
                    <div className='col-span-12'>
                      <label className={customLabelStyles}>Map</label>
                      <MapContainer
                        center={markerPosition}
                        zoom={11}
                        style={{ width: '100%', height: '300px' }}
                      >
                        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                        <MapComponent
                          markerPosition={markerPosition}
                          FetchLocationData={FetchLocationData}
                          setFormData={setFormData}
                          setMarkerPosition={setMarkerPosition}
                        />
                      </MapContainer>
                    </div>

                    {/* City and Country */}
                    <div className='col-span-6'>
                      <label htmlFor='city' className={customLabelStyles}>
                        City *
                      </label>
                      <div className='mt-2'>
                        <input
                          id='city'
                          name='city'
                          type='text'
                          value={formData.city}
                          onChange={handleChange}
                          className={customInputStyles}
                        />
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <label htmlFor='country' className={customLabelStyles}>
                        Country *
                      </label>
                      <div className='mt-2'>
                        <input
                          id='country'
                          name='country'
                          type='text'
                          value={formData.country}
                          onChange={handleChange}
                          className={customInputStyles}
                        />
                      </div>
                    </div>

                    {/* Street Address */}
                    <div className='col-span-8'>
                      <label htmlFor='street' className={customLabelStyles}>
                        Street Address
                      </label>
                      <div className='mt-2'>
                        <input
                          id='street'
                          name='street'
                          type='text'
                          value={formData.street}
                          onChange={handleChange}
                          className={customInputStyles}
                          placeholder='Street name'
                        />
                      </div>
                    </div>

                    {/* House Number */}
                    <div className='col-span-4'>
                      <label
                        htmlFor='houseNumber'
                        className={customLabelStyles}
                      >
                        House #
                      </label>
                      <div className='mt-2'>
                        <input
                          id='houseNumber'
                          name='houseNumber'
                          type='text'
                          value={formData.houseNumber}
                          onChange={handleChange}
                          className={customInputStyles}
                          placeholder='123'
                        />
                      </div>
                    </div>

                    {/* Apartment and Postal Code */}
                    <div className='col-span-6'>
                      <label htmlFor='apartment' className={customLabelStyles}>
                        Apt/Flat #
                      </label>
                      <div className='mt-2'>
                        <input
                          id='apartment'
                          name='apartment'
                          type='text'
                          value={formData.apartment}
                          onChange={handleChange}
                          className={customInputStyles}
                          placeholder='Apt 4B'
                        />
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <label htmlFor='postalCode' className={customLabelStyles}>
                        Postal Code
                      </label>
                      <div className='mt-2'>
                        <input
                          id='postalCode'
                          name='postalCode'
                          type='text'
                          value={formData.postalCode}
                          onChange={handleChange}
                          className={customInputStyles}
                          placeholder='12345'
                        />
                      </div>
                    </div>

                    <div className='col-span-12'>
                      <label
                        htmlFor='contactNumber'
                        className={customLabelStyles}
                      >
                        Phone Number *
                      </label>
                      <div className='mt-2'>
                        <input
                          id='contactNumber'
                          name='contactNumber'
                          type='text'
                          value={formData.contactNumber}
                          onChange={handleChange}
                          className={customInputStyles}
                          placeholder='Enter your phone number'
                        />
                      </div>
                      {errors.contactNumber && (
                        <p className='text-red-500 text-sm'>
                          Enter valid phone number
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className='flex items-center justify-end gap-1 p-6 border-t border-solid border-gray-300 rounded-b'>
                    <button
                      className='btn-outline'
                      type='button'
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className='active:bg-emerald-600'
                      type='button'
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
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
