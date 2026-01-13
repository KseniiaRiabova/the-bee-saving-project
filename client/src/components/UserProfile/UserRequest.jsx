import { Button } from '../UI/Button';
import { RequestFormModal } from '../UI/RequestForm/RequestFormModal';
import { Input } from '../UI/Input';
import { RequestComponent } from './RequestTable';
import useRequestStore from '../../stores/useRequestStore';
import PropTypes from 'prop-types';

export const UserRequest = ({ showModal, setShowModal }) => {
  const { requests } = useRequestStore();

  const sortedRequests = [...requests].sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  return (
    <div className='border border-border-color rounded-lg p-6 md:p-8 dark:text-secondary-dark'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 w-full pt-4 pb-8'>
        <h3>Requests</h3>
        <Input
          type='text'
          placeholder='Search...'
          className='w-64 text-primary-dark dark:bg-secondary-dark dark:placeholder-primary-dark'
        />
        <Button
          type='button'
          text='Create New Request'
          onClick={() => setShowModal(true)}
        />
      </div>

      <RequestComponent
        requests={sortedRequests}
        fixedHeader
        fixedHeaderScrollHeight='300px'
      />

      {/* <div className='flex gap-4 md:gap-6 md:justify-around'>
         <Button className="font-normal text-white bg-[#F4743B] hover:bg-green-300 rounded-lg p-2 dark:text-black" type="button" text="Completed" /> 
      </div> */}
      {showModal && (
        <RequestFormModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

UserRequest.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};
