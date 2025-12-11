import PropTypes from 'prop-types';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '../UI/Button';
import { DarkLightModeButton } from '../UI/DarkLightModeButton';
import { BurgerMenu } from './BurgerMenu';
import useAuthStore from '../../stores/useAuthStore';
import { useLogout } from '../../hooks/useLogout';
import { NavLinks } from './NavLinks';

export const Nav = ({ action, onClickHandler }) => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const userInfoRef = useRef(null);

  const { isAuthenticated, user } = useAuthStore();
  const logout = useLogout();

  const onChangeToggleClassHandler = () => {
    setIsNavMenuOpen((prev) => !prev);
  };

  const toggleUserInfo = () => setShowUserInfo((prev) => !prev);

  // Close user info dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (userInfoRef.current && !userInfoRef.current.contains(event.target)) {
      setShowUserInfo(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // document.addEventListener('mousedown', handleClickOutside);

  const handleAuthClick = useCallback(() => {
    if (isAuthenticated) {
      logout();
    } else {
      onClickHandler?.(); // open login modal or trigger login
    }
  }, [isAuthenticated, logout, onClickHandler]);

  return (
    <>
      <BurgerMenu
        onChangeHandler={onChangeToggleClassHandler}
        isOpen={isNavMenuOpen}
      />

      <nav
        className={`flex items-center justify-center gap-6 lg:gap-9 ${
          isNavMenuOpen
            ? 'fixed inset-0 flex-col bg-secondary-dark z-40'
            : 'hidden md:flex'
        }`}
      >
        <NavLinks
          isNavMenuOpen={isNavMenuOpen}
          onLinkClick={() => setIsNavMenuOpen(false)}
        />

        {/* Auth button */}
        {!isAuthenticated && (
          <Button
            type='button'
            text={action}
            onClickHandler={handleAuthClick}
          />
        )}

        {/* Dark/Light toggle */}
        <DarkLightModeButton />

        {/* User profile */}
        {isAuthenticated && user && (
          <div
            className='relative flex items-center space-x-3'
            ref={userInfoRef}
          >
            <button
              onClick={toggleUserInfo}
              className='p-0 rounded-full border border-neutral-400 focus:outline-none'
              title='Toggle user info'
            >
              <img
                src={user.picture}
                alt='avatar'
                className='w-10 h-10 rounded-full'
              />
            </button>

            {showUserInfo && (
              <div className='absolute top-8 right-[-146px] mt-2 min-w-[340px] w-[280px] p-4 bg-primary dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-lg z-50 md:right-0'>
                <div className='font-medium break-words mb-1'>{user.name}</div>
                <div className='text-sm text-neutral-600 dark:text-neutral-300 break-all mb-3'>
                  {user.email.split('@')[0]}
                </div>
                <Button
                  type='button'
                  text='Log Out'
                  onClickHandler={handleAuthClick}
                />
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

Nav.propTypes = {
  action: PropTypes.string,
  onClickHandler: PropTypes.func,
};
