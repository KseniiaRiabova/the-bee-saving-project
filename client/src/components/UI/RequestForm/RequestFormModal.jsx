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

const MODAL_STORAGE_KEY = 'userRequestModalOpen';
const MODAL_CLOSED_KEY = 'userRequestModalClosed';

export const RequestFormModal = ({ showModal: showModalProp, setShowModal: setShowModalProp }) => {
  const { getAccessTokenSilently } = useAuth0();
  const { addRequest } = useRequestStore();

  const [errors, setErrors] = useState({});
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);

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

  // Persistent modal state
  const [showModal, setShowModal] = useState(() => {
    const closed = localStorage.getItem(MODAL_CLOSED_KEY);
    const stored = localStorage.getItem(MODAL_STORAGE_KEY);

    if (closed === 'true') return false; // intentionally closed
    if (stored === 'true') return true;   // open previously
    if (showModalProp !== undefined) return showModalProp;

    return true; // default open for first time
  });

  // Sync local modal state to localStorage
  useEffect(() => {
    localStorage.setItem(MODAL_STORAGE_KEY, showModal ? 'true' : 'false');
    if (setShowModalProp) setShowModalProp(showModal);
  }, [showModal, setShowModalProp]);

  // Close handler
  const handleClose = () => {
    setShowModal(false);
    localStorage.setItem(MODAL_CLOSED_KEY, 'true');
  };

  // Escape key close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showModal) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  // Fetch user location when modal opens
  useEffect(() => {
    if (!showModal) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition([latitude, longitude]);
          FetchLocationData(latitude, longitude, setFormData);
        },
        (error) => console.error('Error getting user location:', error)
      );
    }
  }, [showModal]);

  // Fetch user data when modal opens
  useEffect(() => {
    if (!showModal) return;

    const fetchUserData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${BACKEND_URL}/dashboard`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to get user data');
        const parsed = await response.json();
        const data = parsed.user;
        setFormData((prev) => ({
          ...prev,
          contactNumber: data.metadata?.contactNumber || '',
        }));
      } catch (e) {
        console.error(e);
      }
    };
    fetchUserData();
  }, [getAccessTokenSilently, showModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setErrors({});
      handleClose();
    } catch (error) {
      console.error('Error creating request:', error);
      setErrors({ submit: true });
    }
  };

  if (!showModal) return null;

  return (
    <Modal onBackdropClick={handleClose}>
      <ModalHeader title='Request Details' onClose={handleClose} />

      <form onSubmit={handleSubmit}>
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
              {errors.title && <p className='text-error-color text-sm'>Enter valid title</p>}
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
                <p className='text-error-color text-sm'>Enter valid description</p>
              )}
            </div>

            {/* Map */}
            <div className='col-span-12'>
              <label>Map</label>
              <MapContainer center={markerPosition} zoom={11} style={{ width: '100%', height: '300px' }}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                <MapComponent
                  markerPosition={markerPosition}
                  FetchLocationData={FetchLocationData}
                  setFormData={setFormData}
                  setMarkerPosition={setMarkerPosition}
                />
              </MapContainer>
            </div>

            {/* City / Country */}
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

            {/* Street / House */}
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

            {/* Apt / Postal */}
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

            {/* Contact */}
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
                <p className='text-error-color text-sm'>Enter valid phone number</p>
              )}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <button type='button' className='btn-outline' onClick={handleClose}>
            Close
          </button>
          <button type='submit'>Save Changes</button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

RequestFormModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default RequestFormModal;
