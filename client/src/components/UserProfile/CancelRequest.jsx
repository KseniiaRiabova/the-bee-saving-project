// CancelRequest.js

import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import useRequestStore from "../../stores/useRequestStore";
// import { BACKEND_URL } from "../configs/envConfig";

const CancelRequest = ({ request }) => {
  const { getAccessTokenSilently } = useAuth0();
  const { cancelRequest } = useRequestStore();
  const handleCancelRequest = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      await cancelRequest(request.id, accessToken);
    } catch (error) {
      console.error("Failed to cancel the request:", error);
    }
  };

  return (
    <button
      className='btn-outline'
      onClick={handleCancelRequest}
    >
      Cancel
    </button>
  );
};

CancelRequest.propTypes = {
  request: PropTypes.object.isRequired,
};

export default CancelRequest;
