import PropTypes from 'prop-types';

export const ButtonClose = ({ onClose }) => {
  return (
    <button
      className='btn-outline rounded-full p-2.5 group'
      onClick={onClose}
      aria-label="Close"
    >
      <div className='relative w-2 h-2 flex justify-center items-center'>
        <div className='absolute h-1 w-4 bg-primary-dark rounded-lg rotate-45 group-hover:bg-secondary-dark group-focus:bg-secondary-dark dark:group-hover:bg-primary-dark dark:group-focus:bg-primary-dark'></div>
        <div className='absolute h-1 w-4 bg-primary-dark rounded-lg -rotate-45 group-hover:bg-secondary-dark  group-focus:bg-secondary-dark dark:group-hover:bg-primary-dark dark:group-focus:bg-primary-dark'></div>
      </div>
    </button>
  );
};

ButtonClose.propTypes = {
  onClose: PropTypes.func.isRequired,
};
