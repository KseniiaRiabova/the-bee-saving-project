import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Header } from '../components/UI/Header';
import Footer from '../components/UI/Footer';
import { useLogout } from '../hooks/useLogout';
import { Outlet } from 'react-router-dom';
import About from '../components/UI/about/About';

export const BaseLayout = () => {
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
      <main>
        <Outlet />
        <About />
      </main>
      <Footer />
    </>
  );
};

// BaseLayout.propTypes = {
//   children: PropTypes.node.isRequired,
// };
