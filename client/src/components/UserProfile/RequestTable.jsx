import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import AcceptRequestModal from './AcceptRequestModal';
import useRequestStore from '../../stores/useRequestStore';
import columns from './requestTableColumns';
import useDarkModeStore from '../../stores/useDarkModeStore';

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

  //Get Dark Mode state to update table colors in dark mode
  const { isDarkMode } = useDarkModeStore();

  //Colors for table
  const colors = {
    bg: 'var(--secondary-light)',
    font: isDarkMode ? 'var(--secondary-dark)' : 'var(--primary-dark)',
    title: 'var(--primary-dark)',
    border: 'var(--outline-color)',
    navColor: 'var(--primary)',
  };

  const tableCustomStyles = {
    table: {
      style: {
        backgroundColor: 'transparent',
        border: `1px solid ${colors.border}`,
        color: colors.font,
      },
    },

    headRow: {
      style: {
        backgroundColor: colors.bg,
        color: colors.title,
        fontSize: '1rem',
      },
    },

    rows: {
      style: {
        backgroundColor: 'transparent',
        borderColor: `${colors.border} !important`,
        color: colors.font,
        fontSize: '1rem',
      },
      //Active line hover
      highlightOnHoverStyle: {
        backgroundColor: colors.bg,
        color: colors.font,
        outline: `1px solid ${colors.border}`,
        border: 'none',
        cursor: 'pointer',
      },
    },

    pagination: {
      style: {
        backgroundColor: colors.bg,
        color: colors.title,
        fontSize: '1rem',
      },
      pageButtonsStyle: {
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.navColor,
        margin: '0.1rem',

        '&:hover': {
          cursor: 'pointer',
        },

        //Button's icon
        '& svg': {
          fill: colors.title,
        },
      },
    },
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
