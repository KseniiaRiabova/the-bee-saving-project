// CancelRequest.js

import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../UI/Button";
// import { BACKEND_URL } from "../configs/envConfig";
import useRequestStore from "../../stores/useRequestStore";

const DeleteRequest = ({ requestId, onDelete }) => {
  const { getAccessTokenSilently } = useAuth0();
  const { deleteRequest } = useRequestStore();

  const handleDeleteRequest = async () => {
    console.log("requestId", requestId);
    try {
      if (confirm("Are you sure you want to delete this request?")) {
        console.log("User would like to delete the request.");
        const accessToken = await getAccessTokenSilently();
        await deleteRequest(requestId, accessToken);
        console.log("Deleted request successfully:");
        onDelete(requestId);
      }
    } catch (error) {
      console.error("Failed to delete the request:", error);
    }
  };

  return (
    <Button
      className='p-1 mr-4'
      type='button'
      onClick={handleDeleteRequest}
    >
      <i className='fas fa-trash-alt'></i>
    </Button>
  );
};

DeleteRequest.propTypes = {
  requestId: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default DeleteRequest;
