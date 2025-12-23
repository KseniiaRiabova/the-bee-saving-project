import PropTypes from 'prop-types';

export const ModalBody = ({ children }) => {
  return (
    <div className='p-10 space-y-2 border-y border-outline-color'>
      {children}
    </div>
  );
};

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};
