import PropTypes from "prop-types";

export const SignUpNotification = ({
  isFirstTimeUser,
  userNickName,
  onClose,
}) => {
  return (
    <div className='absolute top-[10%] right-1 w-[98%] text-center bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 md:w-[25%] md:top-[10%] md:right-[35vw]'>
      {isFirstTimeUser ? (
        <p>
          Welcome to Bee Saving App! Please check your email to verify your
          account.
        </p>
      ) : (
        <p>Welcome back to Bee Saving App - {userNickName}!</p>
      )}
      <button
        className='mt-2'
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

SignUpNotification.propTypes = {
  isFirstTimeUser: PropTypes.bool.isRequired,
  userNickName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
