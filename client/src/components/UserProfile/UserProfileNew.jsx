import PropTypes from "prop-types";
import { useEffect } from "react";
import { Button } from "../UI/Button";
import { Image } from "../UI/Image";
import { Input } from "../UI/Input";
import { AnchorLink } from "../UI/AnchorLink";
import { UserRequest } from "./UserRequest";
import useProfileStore from "../../stores/useProfileStore";
import useUserStore from "../../stores/useUserStore";
import useRequestStore from "../../stores/useRequestStore";

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
    setContactNumber
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
      alert("No contact number to delete.");
      return;
    }

    if (confirm(`Are you sure you want to delete your contact number - ${userContactNumber} ?`)) {
      sendDeleteRequestOfUserContactNumber(userContactNumber);
      setContactNumber("");
    }
  };

  const onClickEditUserContactNumber = () => {
    setEditable(true);
  };

  const onClickCancelUpdateContactNumber = () => {
    setContactNumber(data?.metadata?.contactNumber || "");
    setEditable(false);
  };

  const onClickUpdateUserContactNumber = () => {
    if (!userContactNumber || isNaN(userContactNumber)) {
      alert("Please enter a valid contact number.");
      setContactNumber(data?.metadata?.contactNumber || "");
      return;
    }

    sendUpdateUserContactNumber(userContactNumber);
    setEditable(false);
  };

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col gap-4 m-4 md:m-0 md:my-4">
      <section className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <h3 className="font-semibold text-xl">Dashboard</h3>

        <section className="flex items-center justify-end gap-3 md:gap-6">
          <div className="flex flex-col items-end">
            <p className="font-medium text-black dark:text-white">
              {email ? email.split('@')[0] : 'Loading...'}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              {email || 'Loading...'}
            </p>
          </div>

          <section className="relative w-20 h-20 rounded-full overflow-hidden">
            <AnchorLink onClick={() => onChangeToggleUserInfoModalHandler(true)}>
              <Image src={gravatar} alt="User's Image" className="object-cover object-center h-20" />
            </AnchorLink>
          </section>

          {isUserInfoModalOpen && (
            <section className="absolute bg-gray-300 rounded-lg top-[16rem] right-0 w-full md:max-w-lg border-2 border-[#9BC25B] md:top-[15rem] md:right-auto dark:bg-black dark:border-white z-[60]">
              <section className="relative flex flex-col justify-around items-start pl-4 h-64 md:items-start md:pl-6">
                <section className="absolute top-[2rem] right-[2rem]">
                  <Button onClickHandler={() => onChangeToggleUserInfoModalHandler(false)}>
                    <svg className="w-6 h-6 border-2 border-transparent rounded-2xl hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                  </Button>
                </section>

                <section className="self-center">
                  <h3 className="uppercase">user info</h3>
                </section>

                <section>
                  <p>Email: {email} </p>

                  {isEditable ? (
                    <Input
                      className="border-2 border-blue-300 md:w-56 pl-1"
                      type="text"
                      label="Contact number: "
                      placeholder={data?.metadata?.contactNumber || "Please enter a contact number..."}
                      value={userContactNumber}
                      onChange={onChangeUserContactNumberHandler}
                    />
                  ) : (
                    <p>Contact number: {userContactNumber || "Not provided"}</p>
                  )}
                </section>

                <section>
                  <p>Bee Hives Found - {activeRequests.length} </p>
                  <p>Bee Hives Saved - {completedRequests.length} </p>
                </section>

                <section className="flex self-center gap-4 md:gap-6 md:justify-around">
                  {!isEditable ? (
                    <>
                      <Button
                        className="font-normal text-black bg-navSignupButton md:w-56 hover:bg-green-300 focus:bg-green-300 rounded-lg p-2 -mt-4 dark:hover:bg-green-600 dark:focus:bg-green-600 dark:text-white"
                        type="button"
                        text="Edit Contact Number"
                        onClickHandler={onClickEditUserContactNumber}
                      />

                      {!isLoading && (
                        <Button
                          className={`font-normal text-white bg-red-600 md:w-56 hover:bg-red-800 focus:bg-red-800 rounded-lg p-2 -mt-4 dark:hover:bg-red-800 dark:focus:bg-red-800 dark:text-white ${!userContactNumber ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          type="button"
                          text="Delete Contact Number"
                          onClickHandler={onClickDeleteUserContactNumber}
                          disabled={!userContactNumber}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <Button
                        className="font-normal text-white bg-gray-500 md:w-56 hover:bg-gray-600 focus:bg-gray-700 rounded-lg p-2 -mt-4 dark:hover:bg-gray-700 dark:focus:bg-gray-800 dark:text-white"
                        type="button"
                        text="Cancel"
                        onClickHandler={onClickCancelUpdateContactNumber}
                      />
                      <Button
                        className="font-normal text-black bg-navSignupButton md:w-56 hover:bg-green-300 focus:bg-green-300 rounded-lg p-2 -mt-4 dark:hover:bg-green-600 dark:focus:bg-green-600 dark:text-white"
                        type="button"
                        text="Update Contact Number"
                        onClickHandler={onClickUpdateUserContactNumber}
                      />
                    </>
                  )}
                </section>
              </section>
            </section>
          )}
        </section>
      </section>

      <section className="flex flex-col gap-4 md:flex-row">
        <UserRequest
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </section>
    </section>
  );
};

UserProfileNew.propTypes = {
  sendUpdateUserContactNumber: PropTypes.func.isRequired,
  sendDeleteRequestOfUserContactNumber: PropTypes.func,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};
