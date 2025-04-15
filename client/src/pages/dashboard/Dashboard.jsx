import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/UI/Header';
import { Map } from '../../components/Map';
import Footer from '../../components/Footer/Footer';
import { UserProfileNew } from '../../components/UserProfile/UserProfileNew';
import { BACKEND_URL } from '../../components/configs/envConfig';

// TODO: DELETE log messages
const Dashboard = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [protectedData, setProtectedData] = useState({});
  const [updateUserContactNumber, setupdateUserContactNumber] = useState('');

  const { logout } = useAuth0();

  const [action, setAction] = useState('');

  const onClickHandler = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const {
    name,
    email,
    userId,
    gravatar
  } = protectedData || {};
  // IMP: set default value, since userName and contactNumber are null/undefined
  // const { metadata: { userName } = {} } = data;
  const { metadata: { contactNumber } = {} } = protectedData;

  function handleUpdateUserContactNumber(data) {
    setupdateUserContactNumber(data);
    console.log(
      'updateUserContactNumber:',
      updateUserContactNumber,
      typeof updateUserContactNumber, data, typeof data
    );
    handleAddOrUpdateUserContactNumber(data);
  }

  function handleRequestToDeleteUserContactNumber(data) {
    handleDeleteUserContactNumber(data);
  }

  const handleAddOrUpdateUserContactNumber = async (data) => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${BACKEND_URL}/user/metadata`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metadata: { contactNumber: data },
        }),
      });

      if (response.ok) {
        console.log('Contact number updated successfully:', data);
        const responseData = await response.json();
        console.log('Updated user data:', responseData?.user);
      } else {
        const errorData = await response.json();
        console.error('Failed to add/update contact number', errorData);
      }
    } catch (error) {
      console.error('Error updating contact number:', error);
    }
  };

  const handleDeleteUserContactNumber = async (data) => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${BACKEND_URL}/user/metadata`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metadata: { contactNumber: null },
        }),
      });

      if (response.ok) {
        console.log('Contact number deleted successfully');
      } else {
        const errorData = await response.json();
        console.error('Failed to delete contact number:', errorData);
      }
    } catch (error) {
      console.error('Error deleting contact number:', error);
    }
  };

  useEffect(() => {
    setAction(isAuthenticated ? 'Log Out' : 'Sign In/Up');
  }, [isAuthenticated]);

  useEffect(() => {
    // if (!isAuthenticated) {
    //   navigate('/');
    //   return;
    // }

    const fetchProtectedData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(
          // 'https://be-v50-tier3-team-28.onrender.com/api/dashboard',
          `${BACKEND_URL}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        console.log('DATA: ', data);
        console.log('DATA: user -  ', data?.user);
        setProtectedData(data?.user);
      } catch (e) {
        console.log(e);
      }
    };

    fetchProtectedData();
  }, [getAccessTokenSilently]);


  return (
    <section>
      <section className='bg-[#9BC25B]'>
        <section className='max-w-7xl mx-auto'>
          <Header action={action} onClickHandler={onClickHandler} />
        </section>
      </section>

      <main className='dark:bg-black dark:text-white border-2 border-transparent'>
        <section className='max-w-7xl mx-auto'>
          <UserProfileNew
            data={protectedData}
            sendUpdateUserContactNumber={handleUpdateUserContactNumber}
            sendDeleteRequestOfUserContactNumber={
              handleRequestToDeleteUserContactNumber
            }
          />
        </section>

        {/* TODO: Following section will be deleted once BE logic is fixed */}
        <section>
          <p>
            Updated user contact number from UserProfileNew COMPONENT (updateUserContactNumber):{' '}
            {updateUserContactNumber}{' '}
          </p>
          <p>
            User contactNumber from DB (contactNumber):{' '}
            {contactNumber}{' '}
          </p>
          {/* <p> {JSON.stringify(protectedData)} </p> */}
        </section>

        <section className='flex justify-center p-2'>
          <Map />
        </section>
      </main>

      <Footer />
    </section>
  );
};

export default Dashboard;
