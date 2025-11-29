import Graph from '../Graph';
import { DetailsGroup } from './DetailsGroup';
import { problems } from '../../data/detailsData';
import { Container } from './Container';

export const ProblemContainter = () => {
  return (
    <section>
      <Container py='firstSection'>
        <h2 className='text-center mb-5 md:mb-10'>Problem</h2>

        <div className='flex flex-col gap-8 md:flex-row'>
          <div className='md:w-1/2'>
            <DetailsGroup list={problems} />
          </div>

          <div className='md:w-1/2'>
            <Graph />
          </div>
        </div>
      </Container>
    </section>
  );
};
