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
  const [showUserInfo, setShowUserInfo] = useState(false);

  const { isAuthenticated, user } = useAuthListener();
  const { logout } = useAuth0();

  const burgerMenuContainer = document.querySelector('.burger-menu-container');

  const onChangeToggleClassHandler = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
    burgerMenuContainer?.classList.toggle('change');
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      console.log('Logging out to:', window.location.origin);
      logout({ returnTo: window.location.origin });
    } else {
      onClickHandler?.();
    }
  };

  const toggleUserInfo = () => {
    setShowUserInfo(prev => !prev);
  };

  return (
    <>
      <BurgerMenu onChangeHandler={onChangeToggleClassHandler} />
      <nav className={`${isNavMenuOpen ? '' : 'hidden md:block'}`}>
        <ul
          className={`flex items-center justify-center text-xl text-black ${isNavMenuOpen
            ? 'flex-col gap-6 absolute top-0 left-0 w-full h-dvh bg-neutral-500 z-40'
            : 'flex-row gap-5 lg:gap-9'
            }`}
        >
          <li>
            <Link
              to="/"
              className="underline text-[#F4743B] p-2.5 hover:rounded-lg focus:rounded-lg hover:bg-neutral-300 focus:bg-neutral-300 hover:text-black focus:text-black dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:hover:text-white dark:focus:text-white"
            >
              Home
            </Link>
          </li>

          <li>
            <a
              href="#footer"
              className="text-nowrap p-2.5 hover:rounded-lg focus:rounded-lg hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:text-white"
            >
              About Us
            </a>
          </li>

          {isAuthenticated && (
            <li className="text-center">
              <Link
                to="/dashboard"
                className="p-2.5 hover:rounded-lg focus:rounded-lg hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:text-white"
              >
                Dashboard
              </Link>
            </li>
          )}

          {!isAuthenticated && (
            <li>
              <Button
                className="bg-navSignupButton text-lg font-normal px-8 py-2 rounded-lg hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:text-white"
                type="button"
                text={action}
                onClickHandler={handleAuthClick}
              />
            </li>
          )}

          <li>
            <DarkLightModeButton />
          </li>

          {isAuthenticated && user && (
            <li className="relative flex items-center space-x-3 px-2">
              <button
                onClick={toggleUserInfo}
                className="focus:outline-none"
                title="Toggle user info"
              >
                <img
                  src={user.picture}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border border-neutral-400"
                />
              </button>

              {showUserInfo && (
                <div className="absolute top-8 right-0 mt-2 w-56 p-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded shadow-md z-50">
                  <div className="font-medium text-black dark:text-white">
                    {user.name}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-300 break-words mb-3">
                    {user.email}
                  </div>

                  <Button
                    className="bg-navSignupButton text-lg font-normal px-8 py-2 rounded-lg hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:text-white"
                    type="button"
                    text={isAuthenticated ? 'Log Out' : action}
                    onClickHandler={handleAuthClick}
                  />
                </div>
              )}
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
