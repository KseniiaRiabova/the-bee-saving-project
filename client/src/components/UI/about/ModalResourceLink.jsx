import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';

const ModalResourceLink = ({ url, handleClick }) => {
  return (
    <Modal>
      {/* Title */}
      <div className='flex flex-col sm:flex-row items-center gap-0 sm:gap-4 p-5'>
        <svg
          className='h-11 w-11 text-brand-primary'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
          />
        </svg>
        <h3 id='modal-title'>Leaving Save Bees App</h3>
      </div>

      {/* Content */}
      <div className='py-10 px-5 space-y-2 border-y border-outline-color text-center sm:text-left'>
        <p>This link is taking you to the following website</p>
        <p className='text-border-color border rounded-lg text-wrap text-center p-2'>
          {url}
        </p>
      </div>

      {/* Buttons */}
      <div className='flex flex-col gap-2 sm:flex-row-reverse p-5'>
        <Link
          to={`${url}`}
          target='_blank'
        >
          <button
            type='button'
            className='w-full'
            onClick={() => handleClick(null)}
          >
            Visit Site
          </button>
        </Link>
        <button
          type='button'
          className='btn-outline'
          onClick={() => handleClick(null)}
        >
          Go Back
        </button>
      </div>
    </Modal>
  );
};

ModalResourceLink.propTypes = {
  url: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ModalResourceLink;
