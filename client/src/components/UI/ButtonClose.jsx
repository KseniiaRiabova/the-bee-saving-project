export const ButtonClose = ({ onClose }) => {
  return (
    <button
      className='absolute right-8 rounded-full p-2.5 group btn-outline'
      onClick={onClose}
    >
      <div className='relative w-2 h-2 flex justify-center items-center'>
        <div className='absolute h-1 w-4 bg-primary-dark rounded-lg rotate-45 group-hover:bg-secondary-light dark:bg-primary'></div>
        <div className='absolute h-1 w-4 bg-primary-dark rounded-lg -rotate-45 group-hover:bg-secondary-light dark:bg-primary'></div>
      </div>
    </button>
  );
};
