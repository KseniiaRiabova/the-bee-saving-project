// CancelRequest.js
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { BACKEND_URL } from '../configs/envConfig';

const CompleteRequest = ({ request, onComplete }) => {
  const { getAccessTokenSilently } = useAuth0();

  const handleCompleteRequest = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${BACKEND_URL}/requests/${request.id}/complete`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to complete the request');
      }
      console.log('Completed request successfully:');
      const data = await response.json();
      onComplete(data);
    } catch (error) {
      console.error('Failed to complete the request:', error);
    }
  };

  return (
    <>
      <button
        onClick={handleCompleteRequest}
        className='border border-[#F4743B] px-3 py-2 uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
      >
        Complete
      </button>
    </>
  );
};

CompleteRequest.propTypes = {
  request: PropTypes.object.isRequired,
  onComplete: PropTypes.func,
};

export default CompleteRequest;
