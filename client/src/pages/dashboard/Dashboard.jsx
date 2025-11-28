import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Map } from '../../components/Map';
import { UserProfileNew } from '../../components/UserProfile/UserProfileNew';
import useAuthStore from '../../stores/useAuthStore';
import useRequestStore from '../../stores/useRequestStore';
import useUserStore from '../../stores/useUserStore';
import useProfileStore from '../../stores/useProfileStore';

const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { isAuthenticated } = useAuthStore();
  const { requests, fetchRequests } = useRequestStore();
  const { fetchUserData } = useUserStore();
  const profileStore = useProfileStore();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          await Promise.all([fetchUserData(token), fetchRequests(token)]);
        } catch (error) {
          console.error('Error fetching initial data:', error);
        }
      }
    };

    fetchInitialData();
  }, [isAuthenticated, fetchUserData, fetchRequests, getAccessTokenSilently]);

  const handleUpdateUserContactNumber = async (number) => {
    try {
      const token = await getAccessTokenSilently();
      await profileStore.updateContactNumber(token, number, fetchUserData);
    } catch (error) {
      console.error('Error updating contact number:', error);
    }
  };

  const handleDeleteUserContactNumber = async () => {
    try {
      const token = await getAccessTokenSilently();
      await profileStore.deleteContactNumber(token, fetchUserData);
    } catch (error) {
      console.error('Error deleting contact number:', error);
    }
  };

  return (
    <section>
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <UserProfileNew
          showModal={showModal}
          setShowModal={setShowModal}
          sendUpdateUserContactNumber={handleUpdateUserContactNumber}
          sendDeleteRequestOfUserContactNumber={handleDeleteUserContactNumber}
        />
      </div>
      <div className='flex justify-center'>
        <Map requests={requests} />
      </div>
    </section>
  );
};

export default Dashboard;
