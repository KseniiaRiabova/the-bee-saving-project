// CancelRequest.js
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { BACKEND_URL } from '../configs/envConfig';

const CancelRequest = ({ request, onCancel }) => {
  const { getAccessTokenSilently } = useAuth0();

  const handleCancelRequest = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${BACKEND_URL}/requests/${request.id}/cancel`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to cancel the request');
      }
      console.log('Cancelled request successfully');
      const data = await response.json();
      onCancel(data);
    } catch (error) {
      console.error('Failed to cancel the request:', error);
    }
  };

  return (
    <button
      onClick={handleCancelRequest}
      className='border border-[#F4743B] px-3 py-2 uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
    >
      Cancel
    </button>
  );
};

CancelRequest.propTypes = {
  request: PropTypes.object.isRequired,
  onCancel: PropTypes.func,
};

export default CancelRequest;
