import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button } from "../UI/Button";
import { Image } from "../UI/Image";
import { Input } from "../UI/Input";
import { AnchorLink } from "../UI/AnchorLink";
import { UserRequest } from "./UserRequest";

export const UserProfileNew = ({ data, sendUpdateUserContactNumber, sendDeleteRequestOfUserContactNumber }) => {
  const {
    name,
    email,
    userId,
    gravatar
  } = data || {};
  // IMP: set default value, since userName and contactNumber are null/undefined
  // const { metadata: { userName } = {} } = data;
  const { metadata: { contactNumber } = {} } = data;

  const [isEditable, setIsEditable] = useState(false);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [userContactNumber, setUserContactNumber] = useState(contactNumber);
  const [updateUserContactNumber, setUpdateUserContactNumber] = useState("");

  const onChangeToggleUserInfoModalHandler = (updateState) => {
    setIsUserInfoModalOpen(updateState);
    setUserContactNumber(userContactNumber);
  };

  const onChangeUserContactNumberHandler = (e) => {
    setUpdateUserContactNumber(e.target.value);
  };

  const onClickDeleteUserContactNumber = () => {
    // Check if there is a contact number to delete
    if (!userContactNumber) {
      alert("No contact number to delete.");
      return;
    }

    if (confirm("Are you sure you want to delete your contact number?")) {
      console.log(
        "User confirmed deletion of contact number.",
        contactNumber,
        userContactNumber,
        updateUserContactNumber
      );

      // Notify the backend to delete the contact number
      sendDeleteRequestOfUserContactNumber(userContactNumber);

      // Clear the local state
      setUserContactNumber("");
      setUpdateUserContactNumber("");
    } else {
      console.log(
        "User canceled deletion of contact number.",
        contactNumber,
        userContactNumber,
        updateUserContactNumber
      );
    }
  };

  const onClickEditUserContactNumber = () => {
    setIsEditable(true);
  };

  const onClickCancelUpdateContactNumber = () => {
    setUpdateUserContactNumber(userContactNumber);
    setIsEditable(false);
  };

  const onClickUpdateUserContactNumber = () => {
    if (!updateUserContactNumber || isNaN(updateUserContactNumber)) {
      alert("Please enter a valid contact number.");
      setUpdateUserContactNumber("");
      return;
    }

    sendUpdateUserContactNumber(updateUserContactNumber);
    setUserContactNumber(updateUserContactNumber);
    setIsEditable(false);
  };

  useEffect(() => {
  }, [data]);

  return (
    <section className="flex flex-col gap-4 m-4 md:m-0 md:my-4">
      <section className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <h3 className="font-semibold text-xl">Dashboard</h3>

        <section className="flex items-center justify-end gap-3 md:gap-6">
          <section>
            <p>{email}</p>
          </section>

          <section className="relative w-20 h-20 rounded-full overflow-hidden">
            <AnchorLink className="" onClick={() => onChangeToggleUserInfoModalHandler(true)}>
              <Image src={gravatar} alt="User's Image" className="object-cover object-center h-20" />
            </AnchorLink>
          </section>

          {isUserInfoModalOpen && <section className={`${isUserInfoModalOpen ? "absolute bg-gray-300 rounded-lg top-[19rem] right-0 w-full md:max-w-lg border-2 border-[#9BC25B] md:top-[17rem] md:right-auto dark:bg-black dark:border-white z-[60]" : "hidden"}`}>
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
                <p>Previously Registered Contact number: {contactNumber}</p>

                {isEditable ? (
                  <Input
                    className="border-2 border-blue-300 md:w-56 pl-1"
                    type="text"
                    label="Contact number: "
                    placeholder={contactNumber || "Please enter a contact number..."}
                    value={updateUserContactNumber}
                    onChange={onChangeUserContactNumberHandler}
                  />
                ) : (
                  <p>Edited/updated Contact number: {userContactNumber || "Not provided"}</p>
                )}
              </section>

              <section>
                {/* TODO: Fix with endpoint to display dynamic data (stastical data) */}
                <p>Bee Hives Found - 500</p>
                <p>Bee Hives Saved - 500</p>
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
                    <Button
                      className="font-normal text-white bg-red-600 md:w-56 hover:bg-red-800 focus:bg-red-800 rounded-lg p-2 -mt-4 dark:hover:bg-red-800 dark:focus:bg-red-800 dark:text-white"
                      type="button"
                      text="Delete Contact Number"
                      onClickHandler={onClickDeleteUserContactNumber}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      className="font-normal text-black bg-navSignupButton md:w-56 hover:bg-green-300 focus:bg-green-300 rounded-lg p-2 -mt-4 dark:hover:bg-green-600 dark:focus:bg-green-600 dark:text-white"
                      type="button"
                      text="Update Contact Number"
                      onClickHandler={onClickUpdateUserContactNumber}
                    />
                    <Button
                      className="font-normal text-white bg-gray-500 md:w-56 hover:bg-gray-600 focus:bg-gray-700 rounded-lg p-2 -mt-4 dark:hover:bg-gray-700 dark:focus:bg-gray-800 dark:text-white"
                      type="button"
                      text="Cancel"
                      onClickHandler={onClickCancelUpdateContactNumber}
                    />
                  </>
                )}
              </section>
            </section>
          </section>}
        </section>
      </section>

      <section className="flex flex-col gap-4 md:flex-row">
        <UserRequest />
      </section>
    </section>
  );
};

UserProfileNew.propTypes = {
  data: PropTypes.object,
  sendUpdateUserContactNumber: PropTypes.func.isRequired,
  sendDeleteRequestOfUserContactNumber: PropTypes.func,
};
