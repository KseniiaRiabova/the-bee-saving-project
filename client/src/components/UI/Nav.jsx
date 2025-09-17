import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../UI/Button';
import { DarkLightModeButton } from '../UI/DarkLightModeButton';
import { BurgerMenu } from './BurgerMenu';
import { useAuthListener } from '../../components/auth/useAuthListener';

export const Nav = ({ action, onClickHandler }) => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuthListener();
  const { logout } = useAuth0();

  const burgerMenuContainer = document.querySelector('.burger-menu-container');

  const onChangeToggleClassHandler = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
    burgerMenuContainer?.classList.toggle('change');
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
    } else {
      onClickHandler?.();
    }
  };

  return (
    <>
      <BurgerMenu onChangeHandler={onChangeToggleClassHandler} />
      <nav className={`${isNavMenuOpen ? '' : 'hidden md:block'}`}>
        <ul
          className={`${isNavMenuOpen
            ? 'flex flex-col items-center justify-center gap-6 absolute top-0 left-0 w-full h-dvh bg-neutral-500 z-40'
            : 'flex flex-col space-y-6 p-4 md:p-0 mt-14 md:flex-row md:items-center md:space-x-8 md:space-y-0'
            }`}
        >
          <li>
            <Link
              to="/"
              className="text-xl text-black p-2.5 hover:rounded-lg focus:rounded-lg hover:bg-neutral-300 focus:bg-neutral-300 hover:text-black focus:text-black dark:text-white dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:hover:text-white dark:focus:text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="#footer"
              className="text-nowrap text-xl text-black p-2.5 hover:rounded-lg focus:rounded-lg hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:text-white"
            >
              About Us
            </a>
          </li>
          {/* <li>
            <Link
              to="/solutions"
              className="text-xl text-black p-2.5 hover:rounded-lg focus:rounded-lg hover:bg-neutral-300 focus:bg-neutral-300 hover:text-black focus:text-black dark:text-white dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:hover:text-white dark:focus:text-white"
            >
              Solutions
            </Link>
          </li> */}

          {isAuthenticated && (
            <li className="text-center">
              <Link
                to="/dashboard"
                className="text-xl text-black p-2.5 hover:rounded-lg focus:rounded-lg hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:text-white"
              >
                Dashboard
              </Link>
            </li>
          )}

          <li className="flex items-center">
            <Button
              className="w-40 bg-navSignupButton text-lg font-normal px-5 py-2 rounded-lg text-center text-black hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:text-white"
              type="button"
              text={isAuthenticated ? 'Log Out' : action}
              onClickHandler={handleAuthClick}
            />
          </li>

          <li className="flex items-center pt-1">
            <DarkLightModeButton />
          </li>

          {isAuthenticated && user && (
            <li className="flex items-center space-x-3 px-2">
              <img
                src={user.picture}
                alt="avatar"
                className="w-10 h-10 rounded-full border border-neutral-400"
              />
              <div className="text-sm text-left dark:text-white">
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-300">
                  {user.email}
                </div>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

Nav.propTypes = {
  action: PropTypes.string,
  onClickHandler: PropTypes.func,
};
