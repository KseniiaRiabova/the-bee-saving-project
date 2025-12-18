import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Button } from '../UI/Button';
import { Image } from '../UI/Image';
import { Input } from '../UI/Input';
import { AnchorLink } from '../UI/AnchorLink';
import { UserRequest } from './UserRequest';
import useProfileStore from '../../stores/useProfileStore';
import useUserStore from '../../stores/useUserStore';
import useRequestStore from '../../stores/useRequestStore';

import { ModalHeader } from '../UI/modal/ModalHeader';
import { ModalBody } from '../UI/modal/ModalBody';
import { ModalFooter } from '../UI/modal/ModalFooter';

export const UserProfileNew = ({
  sendUpdateUserContactNumber,
  sendDeleteRequestOfUserContactNumber,
  showModal,
  setShowModal,
}) => {
  const { userData: data, isLoading: userLoading } = useUserStore();
  const {
    email,
    gravatar,
    contactNumber: userContactNumber,
    isEditable,
    isUserInfoModalOpen,
    isLoading: profileLoading,
    setEditable,
    setUserInfoModalOpen,
    setProfileData,
    setContactNumber,
  } = useProfileStore();

  const { activeRequests, completedRequests } = useRequestStore();

  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, [data, setProfileData]);

  const toggleUserInfoModal = (open) => setUserInfoModalOpen(open);

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleDeleteContactNumber = () => {
    if (!userContactNumber) {
      alert('No contact number to delete.');
      return;
    }

    if (
      confirm(
        `Are you sure you want to delete your contact number - ${userContactNumber}?`
      )
    ) {
      sendDeleteRequestOfUserContactNumber();
      setContactNumber('');
    }
  };

  const handleEditContactNumber = () => setEditable(true);

  const handleCancelUpdate = () => {
    setContactNumber(data?.metadata?.contactNumber || '');
    setEditable(false);
  };

  const handleUpdateContactNumber = () => {
    if (!userContactNumber || isNaN(userContactNumber)) {
      alert('Please enter a valid contact number (digits only).');
      setContactNumber(data?.metadata?.contactNumber || '');
      return;
    }

    sendUpdateUserContactNumber(userContactNumber);
    setEditable(false);
  };

  if (userLoading || profileLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between mb-5 md:mb-10'>
        <h2>Dashboard</h2>

        <div className='flex items-center justify-end gap-3 md:gap-6'>
          <div className='text-right'>
            <p className='font-medium'>
              {email ? email.split('@')[0] : 'Loading...'}
            </p>
            <p className='text-sm text-secondary-dark dark:text-neutral-300'>
              {email || 'Loading...'}
            </p>
          </div>

          {/* Avatar */}
          <div className='relative w-20 h-20 rounded-full overflow-hidden'>
            <AnchorLink onClick={() => toggleUserInfoModal(true)}>
              <Image
                src={gravatar || '/default-user.png'}
                alt="User's avatar"
                className='object-cover object-center h-20 w-20'
              />
            </AnchorLink>
          </div>

          {/* Modal */}
          {isUserInfoModalOpen && (
            <div className='absolute top-[19rem] right-0 md:right-auto w-full md:max-w-lg bg-primary border border-brand-primary rounded-lg dark:border-border-color z-[60]'>
              <ModalHeader
                title='User info'
                onClose={() => toggleUserInfoModal(false)}
              />

              <ModalBody>
                <p>Email: {email} </p>

                {isEditable ? (
                  <Input
                    autoFocus
                    className='border border-outline-color rounded-lg px-2 py-1 w-56 focus:outline-none focus:border-brand-primary '
                    type='text'
                    label='Contact number:'
                    placeholder={
                      data?.metadata?.contactNumber ||
                      'Please enter a contact number...'
                    }
                    value={userContactNumber}
                    onChange={handleContactNumberChange}
                  />
                ) : (
                  <p>Contact number: {userContactNumber || 'Not provided'}</p>
                )}

                <p>Bee Hives Found - {activeRequests.length} </p>
                <p>Bee Hives Saved - {completedRequests.length} </p>
              </ModalBody>

              {/* Action Buttons */}
              <ModalFooter>
                {/* <div className='flex flex-col sm:flex-row-reverse justify-start gap-2 sm:gap-3'> */}
                {!isEditable ? (
                  <>
                    <Button
                      type='button'
                      text='Edit Contact Number'
                      onClickHandler={handleEditContactNumber}
                    />
                    {!(userLoading || profileLoading) && (
                      <Button
                        className={`btn-outline px-6 ${
                          !userContactNumber
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                        type='button'
                        text='Delete Contact Number'
                        onClickHandler={handleDeleteContactNumber}
                        disabled={!userContactNumber}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      type='button'
                      text='Update Contact Number'
                      onClickHandler={handleUpdateContactNumber}
                    />
                    <Button
                      className='btn-outline'
                      type='button'
                      text='Cancel'
                      onClickHandler={handleCancelUpdate}
                    />
                  </>
                )}
                {/* </div> */}
              </ModalFooter>
            </div>
            // </div>
          )}
        </div>
      </div>

      <UserRequest
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

UserProfileNew.propTypes = {
  sendUpdateUserContactNumber: PropTypes.func.isRequired,
  sendDeleteRequestOfUserContactNumber: PropTypes.func.isRequired,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};
