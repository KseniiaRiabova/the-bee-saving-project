import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Header } from '../components/UI/Header';
import Footer from '../components/Footer/Footer';
import { useLogout } from '../hooks/useLogout';

export const BaseLayout = ({ children }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const logout = useLogout();
  const [action, setAction] = useState('');

  useEffect(() => {
    setAction(isAuthenticated ? 'Log Out' : 'Sign In / Up');
  }, [isAuthenticated]);

  const onClickHandler = useCallback(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      logout();
    }
  }, [isAuthenticated, loginWithRedirect, logout]);

  return (
    <>
      <Header
        action={action}
        onClickHandler={onClickHandler}
      />

      <main className='dark:bg-black dark:text-white'>
        {/* <main className="dark:bg-black dark:text-white border-2 border-transparent"> */}
        {children}
      </main>

      <Footer />
    </>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
