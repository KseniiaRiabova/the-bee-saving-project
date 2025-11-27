import Graph from '../Graph';
import { DetailsGroup } from './DetailsGroup';
import { problems } from '../../data/detailsData';

export const ProblemContainter = () => {
  return (
    <section>
      <h2 className='mt-4 pt-4 mb-4 pb-4 text-center'>Problem</h2>

      <div className='flex flex-col gap-8 md:flex-row'>
        <div className='md:w-1/2'>
          <DetailsGroup list={problems} />
        </div>

        <div className='md:w-1/2'>
          <Graph />
        </div>
      </div>
    </section>
  );
};
