// import PropTypes from 'prop-types';

import { ButtonClose } from './ButtonClose';

export const Backdrop = ({ children }) => {
  return (
    <div className='fixed inset-0 bg-backdrop-color flex justify-center items-center p-6 opacity-0 animate-fade-in z-50'>
      <div
        className='bg-primary w-full max-w-lg rounded-lg'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
      >
        {children}
      </div>
    </div>
  );
};

// Backdrop.propTypes = {
//   onChangeHandler: PropTypes.func,
//   isOpen: PropTypes.bool,
// };

{
  /* <div
        className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
        aria-hidden='true'
      ></div> */
}
