import PropTypes from 'prop-types';

export const ModalBody = ({ children }) => {
  return (
    <div className='py-10 px-5 space-y-2 border-y border-outline-color'>
      {children}
    </div>
  );
};

ModalBody.propTypes = {
  children: PropTypes.children,
};
