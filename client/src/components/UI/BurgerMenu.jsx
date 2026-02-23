import PropTypes from 'prop-types';

export const BurgerMenu = ({ onChangeHandler, isOpen }) => {
  return (
    <>
      <button
        className='absolute right-6 p-0 space-y-1.5 bg-transparent shadow-none border-none md:hidden z-50 hover:bg-transparent hover:shadow-none focus:bg-transparent'
        aria-label='Main menu'
        onClick={onChangeHandler}
      >
        <div
          className={`w-9 h-[5px] bg-primary-dark transition-all duration-500 ${
            isOpen ? 'translate-y-[11px] -rotate-45' : ''
          }  `}
        ></div>
        <div
          className={`w-9 h-[5px] bg-primary-dark transition-all duration-500 ${
            isOpen ? 'opacity-0' : ''
          }`}
        ></div>
        <div
          className={`w-9 h-[5px] bg-primary-dark transition-all duration-500 ${
            isOpen ? '-translate-y-[11px] rotate-45' : ''
          }`}
        ></div>
      </button>
    </>
  );
};

BurgerMenu.propTypes = {
  onChangeHandler: PropTypes.func,
  isOpen: PropTypes.bool,
};
