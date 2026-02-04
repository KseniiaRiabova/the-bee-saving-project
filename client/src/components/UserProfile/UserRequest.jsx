import { useEffect, useState } from 'react';
import { Button } from '../UI/Button';
import { RequestFormModal } from '../UI/RequestForm/RequestFormModal';
import { Input } from '../UI/Input';
import { RequestComponent } from './RequestTable';
import useRequestStore from '../../stores/useRequestStore';
import PropTypes from 'prop-types';

export const UserRequest = ({ showModal: showModalProp, setShowModal: setShowModalProp }) => {
  const { requests } = useRequestStore();

  // Modal state: open by default unless user intentionally closed it
  const [showModal, setShowModal] = useState(() => {
    const closed = localStorage.getItem('userRequestModalClosed');
    const stored = localStorage.getItem('userRequestModalOpen');

    if (closed === 'true') return false; // user intentionally closed
    if (stored === 'true') return true;   // user had it open previously
    if (showModalProp !== undefined) return showModalProp;

    return true; // default for first-time users
  });

  // Optional: sync with parent if props are provided
  useEffect(() => {
    if (setShowModalProp) setShowModalProp(showModal);
  }, [showModal, setShowModalProp]);

  const sortedRequests = [...requests].sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  return (
    <div className='border border-border-color rounded-lg p-6 md:p-8'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 w-full pt-4 pb-8'>
        <h3>Requests</h3>
        <Input
          id="search"
          type='text'
          label="Search Requests"
          placeholder="Search..."
          hideLabel
          className='w-64 text-primary-dark'
        />
        <Button
          type='button'
          text='Create New Request'
          onClick={() => {
            setShowModal(true);
            localStorage.setItem('userRequestModalClosed', 'false'); // reset intentional close
          }}
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
