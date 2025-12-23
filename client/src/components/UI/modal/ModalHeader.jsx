import PropTypes from 'prop-types';
import { ButtonClose } from '../ButtonClose';

export const ModalHeader = ({ title, onClose }) => {
  return (
    <div className='flex items-center justify-between gap-4 p-5'>
      <h3 id='modal-title'>{title}</h3>
      <ButtonClose onClose={onClose} />
    </div>
  );
};

ModalHeader.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};
