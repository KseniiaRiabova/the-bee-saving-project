import { useEffect } from 'react';
import PropTypes from 'prop-types';

function Modal({ children }) {
  useEffect(() => {
    // Block scroll
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore scroll after closing
      document.body.style.overflow = '';
    };
  }, []);

  return (
    // Backdrop
    <div className='fixed inset-0 bg-backdrop-color flex justify-center items-center p-6 opacity-0 animate-fade-in z-50'>
      {/* Modal */}
      <div
        className='bg-primary w-full max-w-lg rounded-lg max-h-full overflow-y-auto
        scrollbar-thin scrollbar-thumb-secondary-light scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
      >
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
