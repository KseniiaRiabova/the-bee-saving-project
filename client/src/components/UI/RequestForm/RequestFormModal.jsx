import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BACKEND_URL } from '../../configs/envConfig';
import MapComponent from './MapComponent';
import FetchLocationData from '../../../lib/FetchLocationData';
import useRequestStore from '../../../stores/useRequestStore';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-geosearch/dist/geosearch.css';

import Modal from '../modal/Modal';
import { ModalHeader } from '../modal/ModalHeader';
import { ModalBody } from '../modal/ModalBody';
import { ModalFooter } from '../modal/ModalFooter';

export const RequestFormModal = ({ showModal, setShowModal }) => {
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
    // // <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-gray-500 bg-opacity-75 transition-opacity'>
    // //   <div className='relative p-4 w-full max-w-lg max-h-full'>
    // //     <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
    <>
      {showModal ? (
        <Modal>
          <ModalHeader
            title='Request Details'
            onClose={() => setShowModal(false)}
          />

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <ModalBody>
              <div className='grid gap-3 grid-cols-2'>
                {/* Title */}
                <div className='col-span-12'>
                  <label htmlFor='title'>Title *</label>
                  <input
                    id='title'
                    name='title'
                    type='text'
                    value={formData.title}
                    onChange={handleChange}
                    className='mt-2'
                  />

                  {errors.title && (
                    <p className='text-error-color text-sm'>
                      Enter valid title
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className='col-span-12'>
                  <label htmlFor='description'>Description *</label>
                  <textarea
                    id='description'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    className='mt-2'
                  />

                  {errors.description && (
                    <p className='text-error-color text-sm'>
                      Enter valid description
                    </p>
                  )}
                </div>

                {/* Map Rendering */}
                <div className='col-span-12'>
                  <label>Map</label>
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
                  <label htmlFor='city'>City *</label>
                  <input
                    id='city'
                    name='city'
                    type='text'
                    value={formData.city}
                    onChange={handleChange}
                    className='mt-2'
                  />
                </div>

                <div className='col-span-6'>
                  <label htmlFor='country'>Country *</label>
                  <input
                    id='country'
                    name='country'
                    type='text'
                    value={formData.country}
                    onChange={handleChange}
                    className='mt-2'
                  />
                </div>

                {/* Street Address */}
                <div className='col-span-8'>
                  <label htmlFor='street'>Street Address</label>
                  <input
                    id='street'
                    name='street'
                    type='text'
                    value={formData.street}
                    onChange={handleChange}
                    placeholder='Street name'
                    className='mt-2'
                  />
                </div>

                {/* House Number */}
                <div className='col-span-4'>
                  <label htmlFor='houseNumber'>House #</label>
                  <input
                    id='houseNumber'
                    name='houseNumber'
                    type='text'
                    value={formData.houseNumber}
                    onChange={handleChange}
                    placeholder='123'
                    className='mt-2'
                  />
                </div>

                {/* Apartment and Postal Code */}
                <div className='col-span-6'>
                  <label htmlFor='apartment'>Apt/Flat #</label>
                  <input
                    id='apartment'
                    name='apartment'
                    type='text'
                    value={formData.apartment}
                    onChange={handleChange}
                    placeholder='Apt 4B'
                    className='mt-2'
                  />
                </div>

                <div className='col-span-6'>
                  <label htmlFor='postalCode'>Postal Code</label>
                  <input
                    id='postalCode'
                    name='postalCode'
                    type='text'
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder='12345'
                    className='mt-2'
                  />
                </div>

                {/* Phone number */}
                <div className='col-span-12'>
                  <label htmlFor='contactNumber'>Phone Number *</label>
                  <input
                    id='contactNumber'
                    name='contactNumber'
                    type='text'
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder='Enter your phone number'
                    className='mt-2'
                  />

                  {errors.contactNumber && (
                    <p className='text-error-color text-sm'>
                      Enter valid phone number
                    </p>
                  )}
                </div>
              </div>
            </ModalBody>

            {/* Buttons */}
            <ModalFooter>
              <button
                className='btn-outline'
                type='button'
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button type='submit'>Save Changes</button>
            </ModalFooter>
          </form>
        </Modal>
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
