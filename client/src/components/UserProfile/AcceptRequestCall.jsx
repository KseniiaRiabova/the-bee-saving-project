import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
// import { BACKEND_URL } from "../configs/envConfig";
import useRequestStore from '../../stores/useRequestStore';

function AcceptRequestCall({ selectedRequest, onSuccess }) {
  const { getAccessTokenSilently, user } = useAuth0();
  const { acceptRequest } = useRequestStore();

  const handleAcceptRequest = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const accepted = await acceptRequest(
        selectedRequest._id,
        user.sub,
        accessToken
      );
      onSuccess(accepted);
    } catch (error) {
      console.error(
        'Error accepting request:',
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      {selectedRequest?.isAccepted ? (
        <div className='text-brand-secondary font-bold'>
          Accepted <i class='fa-solid fa-square-check text-lg'></i>
        </div>
      ) : (
        <button
          type='button'
          onClick={handleAcceptRequest}
        >
          Accept
        </button>
      )}
    </>
  );
}

AcceptRequestCall.propTypes = {
  selectedRequest: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AcceptRequestCall;
