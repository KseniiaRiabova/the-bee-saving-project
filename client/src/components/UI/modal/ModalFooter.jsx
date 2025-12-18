import PropTypes from 'prop-types';

export const ModalFooter = ({ children }) => {
  return (
    <div className='flex flex-col justify-end gap-2 sm:flex-row sm:items-center sm:gap-3 p-5'>
      {children}
    </div>
  );
};

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
};
