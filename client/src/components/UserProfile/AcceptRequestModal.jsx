import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';
import CancelRequest from './CancelRequest';
import AcceptRequestCall from './AcceptRequestCall';
import CompleteRequest from './CompleteRequest';
// import { BACKEND_URL } from '../configs/envConfig';
import useRequestStore from '../../stores/useRequestStore';

import Modal from '../UI/modal/Modal';
import { ModalHeader } from '../UI/modal/ModalHeader';
import { ModalBody } from '../UI/modal/ModalBody';
import { ModalFooter } from '../UI/modal/ModalFooter';

function AcceptRequestModal({ request, onClose }) {
  const { updateRequest, cancelRequest, completeRequest } = useRequestStore();
  const [isEditable, setIsEditable] = useState(false);
  const [errors, setErrors] = useState({});
  const { getAccessTokenSilently } = useAuth0();
  const { user } = useAuth0();
  const [acceptedRequest, setAcceptedRequest] = useState(request);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const [formData, setFormData] = useState({
    title: request?.title || '',
    location: request?.location?.city || '',
    latitude: request?.location?.coordinates[0] || '',
    longitude: request?.location?.coordinates[1] || '',
    contactNumber: request?.contactNumber || '',
    description: request?.description || '',
    image: request?.image || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);
    setErrors({});
    try {
      const { longitude, latitude, location, ...restFormData } = formData;
      const validationData = {
        ...restFormData,
        contactNumber: formData.contactNumber,
        location: {
          type: 'Point',
          coordinates: [parseFloat(latitude), parseFloat(longitude)],
          city: location,
          country: request?.location?.country,
        },
        id: request.id,
      };
      const accessToken = await getAccessTokenSilently();
      const updatedRequest = await updateRequest(validationData, accessToken);
      setAcceptedRequest(updatedRequest);
    } catch (error) {
      let validationErrors = {};
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        validationErrors = error.response.data.error.details;
        setIsEditable(isEditable);
      }
      setErrors(validationErrors);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsEditable(!isEditable);
  //   setErrors({});
  //   try {
  //     const { longitude, latitude, location, ...restFormData } = formData;
  //     const validationData = {
  //       ...restFormData,
  //       contactNumber: formData.contactNumber,
  //       location: {
  //         type: 'Point',
  //         coordinates: [parseFloat(latitude), parseFloat(longitude)],
  //         city: location,
  //         country: request?.location?.country,
  //       },
  //     };
  //     const accessToken = await getAccessTokenSilently();
  //     const response = await axios.put(
  //       `${apiUrl}/requests/${request.id}`,
  //       validationData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     console.log('response', response.data.request);
  //   } catch (error) {
  //     let validationErrors = {};
  //     if (error) {
  //       validationErrors = error.response.data.error.details;
  //       setIsEditable(isEditable);
  //     }
  //     setErrors(validationErrors);
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAcceptSuccess = (updatedRequest) => {
    setAcceptedRequest((prevRequest) => ({
      ...prevRequest,
      isAccepted: true,
      beekeeperId: user.sub,
      beefinder: {
        ...prevRequest.beefinder,
        email: updatedRequest.beefinder?.email || prevRequest.beefinder?.email,
        contactNumber:
          updatedRequest.beefinder?.contactNumber ||
          prevRequest.beefinder?.contactNumber,
      },
    }));
  };
  const handleCancelRequest = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const canceled = await cancelRequest(acceptedRequest.id, accessToken);
      setAcceptedRequest((prevRequest) => ({
        ...prevRequest,
        ...canceled,
      }));
    } catch (error) {
      console.error('Failed to cancel the request:', error);
    }
  };

  const handleCompleteRequest = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const completed = await completeRequest(acceptedRequest.id, accessToken);
      setAcceptedRequest((prevRequest) => ({
        ...prevRequest,
        ...completed,
      }));
    } catch (error) {
      console.error('Failed to complete the request:', error);
    }
  };

  const isRequestPostedByUser = acceptedRequest?.beefinderId === user?.sub;
  const isRequestAccepted = acceptedRequest?.isAccepted;
  const isCurrentUserBeekeeper = acceptedRequest?.beekeeperId === user?.sub;
  const renderField = ({
    label,
    name,
    value,
    onChange,
    isEditable,
    error,
    errorMessage,
  }) => (
    <div className='flex items-center gap-2'>
      <span className='font-bold'>{label}:</span>
      {isEditable ? (
        <input
          type='text'
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <span>{value}</span>
      )}
      {error && <p className='text-error-color text-center'>{errorMessage}</p>}
    </div>
  );
  // const renderContactFields = () => {
  // 	if (isRequestAccepted) {
  // 		return (
  // 			<>
  // 				{renderField(
  // 					'Email',
  // 					acceptedRequest?.beefinder?.email || '(No email provided)'
  // 				)}
  // 				{renderField(
  // 					'Contact No.',
  // 					acceptedRequest?.contactNumber || '(No contact number provided)'
  // 				)}
  // 			</>
  // 		);
  // 	} else {
  // 		return (
  // 			<>
  // 				{renderField('Email', '(Upon Accept)')}
  // 				{renderField('Contact No.', '(Upon Accept)')}
  // 			</>
  // 		);
  // 	}
  // };
  return (
    <Modal>
      <ModalHeader
        title='Request Details'
        onClose={onClose}
      />

      {/* Content */}
      <ModalBody>
        {renderField({
          label: 'Title',
          name: 'title',
          value: formData.title,
          onChange: handleInputChange,
          isEditable: isEditable,
          error: errors.title,
          errorMessage: 'errors.title',
        })}

        {renderField({
          label: 'Location',
          name: 'location',
          value: formData.location,
          onChange: handleInputChange,
          isEditable: isEditable,
          error: errors.location,
          errorMessage: 'errors.location',
        })}

        <div>
          <span className='font-bold mr-2'>Description: </span>
          {isEditable ? (
            <textarea
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              className='w-full h-28'
            />
          ) : (
            <>
              <span>
                {isDescriptionExpanded
                  ? acceptedRequest?.description
                  : `${acceptedRequest?.description?.slice(0, 200)}${
                      acceptedRequest?.description?.length > 200 ? '...' : ''
                    }`}
              </span>
              {acceptedRequest?.description?.length > 200 && (
                <button
                  onClick={toggleDescription}
                  className='underline ml-2'
                >
                  {isDescriptionExpanded ? 'Show Less' : 'Show More'}
                </button>
              )}
            </>
          )}
        </div>

        {renderField({
          label: 'Latitude',
          name: 'latitude',
          value: formData.latitude,
          onChange: handleInputChange,
          isEditable: isEditable,
          error: errors[0],
          errorMessage: 'Enter valid latitude',
        })}

        {renderField({
          label: 'Longitude',
          name: 'longitude',
          value: formData.longitude,
          onChange: handleInputChange,
          isEditable: isEditable,
          error: errors[1],
          errorMessage: 'Enter valid longitude',
        })}

        <div className='flex gap-2'>
          <span className='font-bold'>Contact Number:</span>
          {isRequestAccepted ? (
            <>
              {isEditable ? (
                <input
                  type='text'
                  name='contactNumber'
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                />
              ) : (
                acceptedRequest?.contactNumber || '(No contact number provided)'
              )}
            </>
          ) : (
            '(Upon Accept)'
          )}
        </div>

        <div className='space-x-2'>
          <span className='font-bold'>Email:</span>
          <span>
            {isRequestAccepted ? (
              <>{acceptedRequest?.beefinder?.email || '(No email provided)'} </>
            ) : (
              '(Upon Accept)'
            )}
          </span>
        </div>
        {/* </div> */}
      </ModalBody>

      {/* Buttons */}
      <ModalFooter>
        {!acceptedRequest?.isCompleted ? (
          <>
            <AcceptRequestCall
              selectedRequest={acceptedRequest}
              onSuccess={handleAcceptSuccess}
            />
            {isCurrentUserBeekeeper && isRequestAccepted && !isEditable && (
              <CancelRequest
                request={acceptedRequest}
                onCancel={handleCancelRequest}
              />
            )}
            {isCurrentUserBeekeeper && isRequestAccepted && !isEditable && (
              <CompleteRequest
                request={acceptedRequest}
                onComplete={handleCompleteRequest}
              />
            )}
            {isRequestPostedByUser && (
              <button
                type='button'
                onClick={handleSubmit}
                className={isRequestAccepted ? '' : 'btn-outline'}
              >
                {!isEditable ? (
                  <>
                    <i className='fas fa-edit mr-1'></i> Edit
                  </>
                ) : (
                  'Save'
                )}
              </button>
            )}
          </>
        ) : (
          <>
            <div className='text-brand-secondary font-bold'>
              Completed
              <i class='fa-solid fa-square-check text-lg ml-1'></i>
            </div>
            <button
              type='button'
              onClick={onClose}
            >
              Close
            </button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
}

AcceptRequestModal.propTypes = {
  request: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AcceptRequestModal;
