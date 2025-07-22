import PropTypes from 'prop-types';
import { useState } from 'react';
import { AnchorLink } from '../UI/AnchorLink';
import { Button } from '../UI/Button';
import { DarkLightModeButton } from '../UI/DarkLightModeButton';
import { BurgerMenu } from './BurgerMenu';
import { Link } from 'react-router-dom';

export const Nav = ({ action, onClickHandler }) => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const burgerMenuContainer = document.querySelector('.burger-menu-container');

  const onChangeToggleClassHandler = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
    burgerMenuContainer?.classList.toggle('change');
  };

  return (
    <>
      <BurgerMenu onChangeHandler={() => onChangeToggleClassHandler()} />
      <nav className={`${isNavMenuOpen ? '' : 'hidden md:block'}`}>
        <ul
          className={`flex items-center justify-center text-xl text-black ${
            isNavMenuOpen
              ? 'flex-col gap-6 absolute top-0 left-0 w-full h-dvh bg-neutral-500 z-40'
              : 'flex-row gap-8 lg:gap-12'
          }`}
        >
          <li>
            <AnchorLink
              href='/'
              className='underline text-[#F4743B] hover:rounded-lg focus:rounded-lg hover:bg-neutral-300 focus:bg-neutral-300 hover:text-black focus:text-black dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:hover:text-white dark:focus:text-white'
              text='Home'
            />
          </li>
          <li>
            <AnchorLink
              href='#footer'
              className='text-nowrap hover:rounded-lg focus:rounded-lg hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:text-white'
              text='About Us'
            />
          </li>
          <li>
            <Link
              to='/solutions'
              className='hover:rounded-lg focus:rounded-lg hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:text-white'
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Button
              className='bg-navSignupButton text-lg font-normal px-8 py-2 rounded-lg hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:text-white'
              type='button'
              text={action}
              onClickHandler={onClickHandler}
            />
          </li>
          <li>
            <DarkLightModeButton />
          </li>
        </ul>
      </nav>
    </>
  );
};

Nav.propTypes = {
  action: PropTypes.string,
  onClickHandler: PropTypes.func,
};
