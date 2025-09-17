import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Header } from '../components/UI/Header';
import MainHeroLanding from '../components/UI/MainHeroLanding';
import { MainHeroLandingSurvey } from '../components/UI/MainHeroLandingSurvey';
import Footer from '../components/Footer/Footer';
import { ProblemContainter } from '../components/UI/ProblemContainer';
import { SolutionsHeader } from '../components/UI/SolutionsHeader';
import { SolutionsContainer } from '../components/UI/SolutionsContainer';
import { SignUpNotification } from '../components/notifications/SignUpNotification';

const HomeLayout = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const [action, setAction] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const timeout = setTimeout(() => {
        setShowNotification(true);
        setIsFirstTimeUser(!user?.email_verified);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, user]);

  const handleOnCloseNotification = () => {
    setShowNotification(false);
  };

  const onClickHandler = () => {
    isAuthenticated
      ? logout({ returnTo: window.location.origin })
      : loginWithRedirect();
  };


  useEffect(() => {
    setAction(isAuthenticated ? 'Log Out' : 'Sign In / Up');
  }, [isAuthenticated]);

  return (
    <>
      <section className='relative bg-[#9BC25B] h-[100%]'>
        {showNotification && (
          <SignUpNotification
            isFirstTimeUser={isFirstTimeUser}
            userNickName={user?.nickname}
            onClose={handleOnCloseNotification}
          />
        )}
        <section className=' bg-[#9BC25B] flex flex-col justify-between md:justify-evenly md:gap-4 md:max-w-7xl md:mx-auto'>
          <Header action={action} onClickHandler={onClickHandler} />
          <MainHeroLanding />
          <MainHeroLandingSurvey />
        </section>
      </section>

      <main className='flex flex-col justify-between dark:bg-black dark:text-white'>
        <section className='md:max-w-7xl md:mx-auto'>
          <ProblemContainter />
          <SolutionsHeader />
        </section>
        <section className='md:max-w-7xl md:mx-auto'>
          <SolutionsContainer />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomeLayout;
