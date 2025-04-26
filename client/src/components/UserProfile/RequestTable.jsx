import DataTable from 'react-data-table-component';
// import tempRequestdata  from './tempRequestdata';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
import AcceptRequestModal from './AcceptRequestModal';

import columns from './requestTableColumns';
import { BACKEND_URL } from '../configs/envConfig';

const tableCustomStyles = {
  headRow: {
    style: {
      backgroundColor: '#f0f0f2',
    },
  },
};

export const RequestComponent = ({ fixedHeader ,requests}) => {
   
  // export const RequestComponent = ({ fixedHeader, fixedHeaderScrollHeight }) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchUserData = useCallback(async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${BACKEND_URL}/requests`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });


      if (!response.ok) {
        throw new Error('Failed to cancel the request');
      }

      if (response.ok) {
        const parsedResponse=await response.json()
        
        
       
       
        const data = parsedResponse.requests
         
        setRequestData(data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to cancel the request:', error);
      console.error(error);
      setLoading(false);
    }
  }, [getAccessTokenSilently, BACKEND_URL]);
   

   



  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);


  const handleDetailsClick = (row) => {
    setSelectedRequest(row);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedRequest(null);
    fetchUserData();
  };
  const handleDeleteRequest = () => {
    fetchUserData(); //temorarily added for testing
  };

  const handleRequestAcceptance = (id) => {
    setRequestData((prevData) =>
      prevData.map((request) =>
        request.id === id
          ? { ...request, isAccepted: true, beekeeper: user.email }
          : request
      )
    );
  };

  return (
    <>
      <DataTable
        columns={columns({
          handleDetailsClick,
          handleDeleteRequest,
          selectedRequest,
          user,
        })}
        data={requests}
        fixedHeader={fixedHeader}
        // fixedHeaderScrollHeight={fixedHeaderScrollHeight}
        highlightOnHover
        customStyles={tableCustomStyles}
        pagination
        progressPending={loading}
      />
      {showModal && selectedRequest && (
        <AcceptRequestModal
          key={selectedRequest._id}
          request={selectedRequest}
          onClose={handleModalClose}
          onAccept={() => handleRequestAcceptance(selectedRequest.id)}
        />
      )}
    </>
  );
};
RequestComponent.propTypes = {
  fixedHeader: PropTypes.bool,
  // fixedHeaderScrollHeight: PropTypes.string,
};
