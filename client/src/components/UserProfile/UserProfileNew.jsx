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
import { ButtonClose } from '../UI/ButtonClose';

export const UserProfileNew = ({
  sendUpdateUserContactNumber,
  sendDeleteRequestOfUserContactNumber,
  showModal,
  setShowModal,
}) => {
  const { userData: data } = useUserStore();
  const { email, gravatar } = data || {};
  const {
    contactNumber: userContactNumber,
    isEditable,
    isUserInfoModalOpen,
    isLoading,
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

  const onChangeToggleUserInfoModalHandler = (updateState) => {
    setUserInfoModalOpen(updateState);
  };

  const onChangeUserContactNumberHandler = (e) => {
    setContactNumber(e.target.value);
  };

  const onClickDeleteUserContactNumber = () => {
    if (!userContactNumber) {
      alert('No contact number to delete.');
      return;
    }

    if (
      confirm(
        `Are you sure you want to delete your contact number - ${userContactNumber} ?`
      )
    ) {
      sendDeleteRequestOfUserContactNumber(userContactNumber);
      setContactNumber('');
    }
  };

  const onClickEditUserContactNumber = () => {
    setEditable(true);
  };

  const onClickCancelUpdateContactNumber = () => {
    setContactNumber(data?.metadata?.contactNumber || '');
    setEditable(false);
  };

  const onClickUpdateUserContactNumber = () => {
    if (!userContactNumber || isNaN(userContactNumber)) {
      alert('Please enter a valid contact number.');
      setContactNumber(data?.metadata?.contactNumber || '');
      return;
    }

    sendUpdateUserContactNumber(userContactNumber);
    setEditable(false);
  };

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <section className='flex flex-col gap-4 m-4 md:m-0 md:my-4'>
      <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between'>
        <h2>Dashboard</h2>

        <section className='flex items-center justify-end gap-3 md:gap-6'>
          <div className='flex flex-col items-end'>
            <p className='font-medium text-black dark:text-white'>
              {email ? email.split('@')[0] : 'Loading...'}
            </p>
            <p className='text-sm text-neutral-600 dark:text-neutral-300'>
              {email || 'Loading...'}
            </p>
          </div>

          <div className='relative w-20 h-20 rounded-full overflow-hidden'>
            <AnchorLink
              onClick={() => onChangeToggleUserInfoModalHandler(true)}
            >
              <Image
                src={gravatar}
                alt="User's Image"
                className='object-cover object-center h-20'
              />
            </AnchorLink>
          </div>
          {isUserInfoModalOpen && (
            <section className='absolute top-[16rem] md:top-[15rem] right-0 md:right-auto w-full md:max-w-lg bg-secondary-light border border-brand-primary rounded-lg dark:bg-black dark:border-white z-[60]'>
              <div className='relative p-8 flex flex-col gap-5'>
                <ButtonClose
                  onClose={() => onChangeToggleUserInfoModalHandler(false)}
                />

                <h3>User info</h3>

                <div>
                  <p>Email: {email} </p>

                  {isEditable ? (
                    <Input
                      autoFocus
                      className='border border-outline-color rounded-lg px-2 py-1 w-56 focus:outline-none focus:border-brand-primary '
                      type='text'
                      label='Contact number: '
                      placeholder={
                        data?.metadata?.contactNumber ||
                        'Please enter a contact number...'
                      }
                      value={userContactNumber}
                      onChange={onChangeUserContactNumberHandler}
                    />
                  ) : (
                    <p>Contact number: {userContactNumber || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <p>Bee Hives Found - {activeRequests.length} </p>
                  <p>Bee Hives Saved - {completedRequests.length} </p>
                </div>

                <div className='flex flex-col sm:flex-row-reverse justify-start gap-2 sm:gap-3'>
                  {!isEditable ? (
                    <>
                      <Button
                        type='button'
                        text='Edit Contact Number'
                        onClickHandler={onClickEditUserContactNumber}
                      />
                      {!isLoading && (
                        <Button
                          className={`btn-outline px-6 ${
                            !userContactNumber
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          }`}
                          type='button'
                          text='Delete Contact Number'
                          onClickHandler={onClickDeleteUserContactNumber}
                          disabled={!userContactNumber}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <Button
                        type='button'
                        text='Update Contact Number'
                        onClickHandler={onClickUpdateUserContactNumber}
                      />
                      <Button
                        className='btn-outline'
                        type='button'
                        text='Cancel'
                        onClickHandler={onClickCancelUpdateContactNumber}
                      />
                    </>
                  )}
                </div>
              </div>
            </section>
          )}
        </section>
      </div>

      <div className='flex flex-col gap-4 md:flex-row'>
        <UserRequest
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </section>
  );
};

UserProfileNew.propTypes = {
  sendUpdateUserContactNumber: PropTypes.func.isRequired,
  sendDeleteRequestOfUserContactNumber: PropTypes.func,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};
