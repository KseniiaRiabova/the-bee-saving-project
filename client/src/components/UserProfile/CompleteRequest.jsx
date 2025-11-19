// CancelRequest.js

import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
// import { BACKEND_URL } from "../configs/envConfig";
import useRequestStore from "../../stores/useRequestStore";

const CompleteRequest = ({ request, onComplete }) => {
  const { getAccessTokenSilently } = useAuth0();
  const { completeRequest } = useRequestStore();

  const handleCompleteRequest = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const completed = await completeRequest(request.id, accessToken);
      onComplete(completed);
    } catch (error) {
      console.error("Failed to complete the request:", error);
    }
  };

  return (
    <>
      <button
        className='px-6'
        onClick={handleCompleteRequest}
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
