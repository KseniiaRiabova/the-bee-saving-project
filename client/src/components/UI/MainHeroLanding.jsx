import hiveLogo from '../../assets/imgs/hive.png';
import saveTextLogo from '../../assets/imgs/save_text_logo.png';
import beesTextLogo from '../../assets/imgs/bees_text_logo.png';
import { Container } from './Container';
import { MainHeroLandingSurvey } from './MainHeroLandingSurvey';
import { SignUpNotification } from '../notifications/SignUpNotification';

function MainLandingHero() {
  return (
    <section className='bg-brand-secondary overflow-hidden'>
      <Container
        className='flex flex-col min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-128px)]'
        py='hero'
      >
        {/* Hero image */}
        <div className='max-w-4xl xl:max-w-5xl w-full px-10 py-6 md:p-8 m-auto'>
          <div className='flex flex-col'>
            <img
              src={saveTextLogo}
              alt='Save'
              className='self-start object-contain z-10 max-h-[clamp(100px,12vw,14vh)] dark:grayscale dark:invert'
            />
            <img
              src={hiveLogo}
              alt='Hive'
              className='object-contain z-20 max-h-[clamp(280px,35vw,40vh)] -mt-6 md:-mt-10 mb-12'
            />
            <img
              src={beesTextLogo}
              alt='Bees'
              className='self-end object-contain z-30 max-h-[clamp(100px,12vw,14vh)] -mt-24 md:-mt-44 lg:-mt-48 md:mb-6 dark:grayscale dark:invert'
            />
          </div>
        </div>

        <MainHeroLandingSurvey />
      </Container>
    </section>
  );
}

export default MainLandingHero;
