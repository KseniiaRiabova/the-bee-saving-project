import PropTypes from 'prop-types';

export const ButtonClose = ({ onClose }) => {
  return (
    <button
      className='btn-outline rounded-full p-2.5 group'
      onClick={onClose}
      aria-label="Close"
    >
      <div className='relative w-2 h-2 flex justify-center items-center'>
        <div className='absolute h-1 w-4 bg-primary-dark rounded-lg rotate-45 group-hover:bg-primary'></div>
        <div className='absolute h-1 w-4 bg-primary-dark rounded-lg -rotate-45 group-hover:bg-primary'></div>
      </div>
    </button>
  );
};

ButtonClose.propTypes = {
  onClose: PropTypes.func.isRequired,
};
