import { useState } from 'react';
import { MainHeroLandingSurveyAnimatedNumber } from './MainHeroLandingSurveyAnimatedNumber';
import { Image } from './Image';
import { Button } from './Button';
import beeImage from '../../assets/imgs/bee.png';

export const MainHeroLandingSurvey = () => {
  const [statHighlights] = useState({
    countries: 12,
    hivesSaved: 16000,
    volunteers: 300,
  });

  return (
    <div className='flex flex-col md:flex-row items-center md:justify-between gap-9 py-6'>
      <div className='flex items-center justify-center gap-4'>
        <Image
          src={beeImage}
          alt='Bee image'
          className='border-2 rounded-full h-24 md:h-28 lg:h-32 dark:border-primary'
        />

        <div className='flex flex-wrap items-end justify-end md:justify-start gap-2 lg:gap-6 text-end md:text-start'>
          <h2 className='text-lg sm:text-xl lg:text-2xl md:max-w-60 lg:max-w-56'>
            Its Time to Save The Bees To Save Our Future Generations
          </h2>

          <Button
            type='button'
            text='Learn More'
          />
        </div>
      </div>

      <div className='flex gap-6 lg:gap-8'>
        <MainHeroLandingSurveyAnimatedNumber
          statHighlights={statHighlights.countries}
          text='Countries'
        />
        <MainHeroLandingSurveyAnimatedNumber
          statHighlights={statHighlights.hivesSaved}
          text='Beehives Saved'
        />
        <MainHeroLandingSurveyAnimatedNumber
          statHighlights={statHighlights.volunteers}
          text='Volunteers'
        />
      </div>
    </div>
  );
};
