import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { SolutionsContainer } from './SolutionsContainer';
import { Header } from './Header';
import Footer from '../Footer/Footer';
import { useLogout } from '../../hooks/useLogout';
import useAuthStore from '../../stores/useAuthStore';

const Solutions = () => {
  const { isAuthenticated } = useAuthStore();
  const { loginWithRedirect } = useAuth0();

  const navigate = useNavigate();

  const logout = useLogout();

  const [action, setAction] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onClickHandler = () => {
    if (!isAuthenticated) {
      loginWithRedirect({});
    } else {
      logout();
    }
  };

  useEffect(() => {
    setAction(isAuthenticated ? 'Log Out' : 'Sign In / Up');
  }, [isAuthenticated]);

  return (
    <>
      <section className='relative bg-[#9BC25B] h-[100%]'>
        <section className=' bg-[#9BC25B] flex flex-col justify-between md:justify-evenly md:gap-4 md:max-w-7xl md:mx-auto'>
          <Header
            action={action}
            onClickHandler={onClickHandler}
          />
        </section>
      </section>

      <main className='flex flex-col justify-between dark:bg-black dark:text-white px-6'>
        {/* temporary section placeholder for solutions */}
        <section className='md:max-w-7xl md:mx-auto'>
          <SolutionsContainer />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Solutions;
