import { DetailsGroup } from './DetailsGroup';
import { solution1, solution2 } from '../../data/detailsData';
import beekeepersImage from '../../assets/imgs/beekeepers.png';
import beekeepersImage2x from '../../assets/imgs/beekeepers@2x.png';

export const SolutionsContainer = () => {
  return (
    <div className='flex flex-col justify-between gap-4 md:flex-row text-left pt-5 md:pt-10'>
      <div className='md:w-2/5'>
        <DetailsGroup list={solution1} />
      </div>
      <div className='md:w-2/5'>
        <DetailsGroup list={solution2} />
      </div>

      <div className='md:w-3/12'>
        <img
          src={beekeepersImage}
          srcSet={` ${beekeepersImage2x} 2x`}
          className='w-full h-full object-cover object-[30%] rounded-tr-[80px]'
          alt='beekeepers'
        />
      </div>
    </div>
  );
};
