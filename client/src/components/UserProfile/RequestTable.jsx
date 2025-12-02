import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import AcceptRequestModal from './AcceptRequestModal';
import useRequestStore from '../../stores/useRequestStore';
import columns from './requestTableColumns';

const tableCustomStyles = {
  headRow: {
    style: {
      backgroundColor: '#f0f0f2',
      fontSize: '1rem',
    },
  },
  rows: {
    style: {
      fontSize: '1rem',
    },
  },
  pagination: {
    style: {
      fontSize: '1rem',
    },
  },
};

export const RequestComponent = ({ fixedHeader, requests }) => {
  const { user } = useAuth0();
  const { updateRequest, deleteRequest } = useRequestStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleDeleteRequest = async (requestId) => {
    await deleteRequest(requestId);
  };

  const handleDetailsClick = (row) => {
    setSelectedRequest(row);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  const handleRequestAcceptance = async () => {
    const updatedRequest = {
      ...selectedRequest,
      isAccepted: true,
      beekeeper: user.email,
    };
    await updateRequest(updatedRequest);
    handleModalClose();
  };

  return (
    <div>
      <DataTable
        columns={columns({
          handleDetailsClick,
          handleDeleteRequest,
          selectedRequest,
          user,
        })}
        data={requests}
        fixedHeader={fixedHeader}
        highlightOnHover
        customStyles={tableCustomStyles}
        pagination
      />
      {showModal && selectedRequest && (
        <AcceptRequestModal
          key={selectedRequest.id}
          request={selectedRequest}
          onClose={handleModalClose}
          onAccept={handleRequestAcceptance}
        />
      )}
    </div>
  );
};

RequestComponent.propTypes = {
  fixedHeader: PropTypes.bool,
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isAccepted: PropTypes.bool,
      isActive: PropTypes.bool,
      city: PropTypes.string,
      country: PropTypes.string,
      // beekeeper: PropTypes.string,
      beekeeper: PropTypes.object,
    })
  ).isRequired,
};
