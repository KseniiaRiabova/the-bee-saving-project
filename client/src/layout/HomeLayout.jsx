import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BaseLayout } from './BaseLayout';
import MainHeroLanding from '../components/UI/MainHeroLanding';
import { MainHeroLandingSurvey } from '../components/UI/MainHeroLandingSurvey';
import { ProblemContainter } from '../components/UI/ProblemContainer';
import { SolutionsSection } from '../components/UI/SolutionsSection';
// import { SolutionsContainer } from "../components/UI/SolutionsContainer";
import { SignUpNotification } from '../components/notifications/SignUpNotification';
import { useLocation } from 'react-router-dom';

const HomeLayout = () => {
  const { isAuthenticated, user } = useAuth0();
  const [showNotification, setShowNotification] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);

  const location = useLocation();

  // useEffect(() => {
  //   let timeout;

  //   if (isAuthenticated && user) {
  //     setIsFirstTimeUser(!user.email_verified);
  //     setShowNotification(true);

  //     timeout = setTimeout(() => {
  //       setShowNotification(false);
  //     }, 4000); // Show notification for 4 seconds
  //   }

  //   return () => clearTimeout(timeout);
  // }, [isAuthenticated, user]);

  useEffect(() => {
    let timeout;

    if (isAuthenticated && user) {
      // Check if notification has already been shown in this session
      const hasSeenNotification = sessionStorage.getItem(
        'signupNotificationShown'
      );

      if (!hasSeenNotification) {
        // Determine if user is first-time (unverified)
        setIsFirstTimeUser(!user.email_verified);

        // Show the notification
        setShowNotification(true);

        // Mark notification as shown for this session
        sessionStorage.setItem('signupNotificationShown', 'true');

        // Auto-hide after 4 seconds
        timeout = setTimeout(() => {
          setShowNotification(false);
        }, 4000);
      }
    }

    return () => clearTimeout(timeout);
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (location.hash === '#solutions') {
      const solutionsSection = document.getElementById('solutions');
      if (solutionsSection) {
        setTimeout(() => {
          solutionsSection.scrollIntoView({ behavior: 'smooth' });
        }, 200); // wait for render
      }
    }
  }, [location]);

  const handleOnCloseNotification = () => setShowNotification(false);

  return (
    <BaseLayout>
      <div className='relative bg-[#9BC25B] overflow-hidden'>
        {/* <section className="relative bg-[#9BC25B] min-h-screen overflow-hidden"> */}
        {showNotification && (
          <SignUpNotification
            isFirstTimeUser={isFirstTimeUser}
            userNickName={user?.nickname}
            onClose={handleOnCloseNotification}
          />
        )}

        <section className='bg-[#9BC25B] flex flex-col justify-between md:gap-4 md:max-w-7xl md:mx-auto'>
          {/* <section className="bg-[#9BC25B] flex flex-col justify-between md:gap-4 md:max-w-7xl md:mx-auto min-h-screen"> */}
          <MainHeroLanding />
          <MainHeroLandingSurvey />
        </section>
      </div>

      <div className='flex flex-col justify-between dark:bg-black dark:text-white px-6'>
        <div className='md:max-w-7xl md:mx-auto'>
          <ProblemContainter />
          <SolutionsSection />
          {/* <SolutionsContainer /> */}
        </div>

        {/* <section className="md:max-w-7xl md:mx-auto">
          <SolutionsContainer />
        </section> */}
      </div>
    </BaseLayout>
  );
};

export default HomeLayout;
