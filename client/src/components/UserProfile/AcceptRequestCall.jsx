import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../configs/envConfig";

function AcceptRequestCall({ selectedRequest, onSuccess }) {
  const { getAccessTokenSilently, user } = useAuth0();

  const handleAcceptRequest = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${BACKEND_URL}/requests/${selectedRequest._id}/accept`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            beekeeperId: user.sub,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept the request");
      }
      const data = await response.json();
      console.log("Request accepted successfully:", data);
      onSuccess(data.request);
    } catch (error) {
      console.error(
        "Error accepting request:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      {selectedRequest?.isAccepted ? (
        <span className='text-green-500 font-bold'>Accepted ✅</span>
      ) : (
        <button
          type='button'
          onClick={handleAcceptRequest}
        >
          Accept
        </button>
      )}
    </div>
  );
}

AcceptRequestCall.propTypes = {
  selectedRequest: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AcceptRequestCall;
