import PropTypes from 'prop-types';

export const BurgerMenu = ({ onChangeHandler, isOpen }) => {
  return (
    <>
      <section
        className='absolute right-6 text-[40px] cursor-pointer md:hidden z-50 burger-menu-container'
        onClick={onChangeHandler}
      >
        <section className={`bar1 ${isOpen ? "change-bar1" : ""}`}></section>
        <section className={`bar2 ${isOpen ? "change-bar2" : ""}`}></section>
        <section className={`bar3 ${isOpen ? "change-bar3" : ""}`}></section>
      </section>
    </>
  );
};

BurgerMenu.propTypes = {
  onChangeHandler: PropTypes.func,
  isOpen: PropTypes.bool,
};
