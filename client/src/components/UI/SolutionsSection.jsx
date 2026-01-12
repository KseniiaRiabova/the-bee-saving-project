import { AnchorLink } from './AnchorLink';
import { Container } from './Container';
import { SolutionsContainer } from './SolutionsContainer';

export const SolutionsSection = () => {
  return (
    <>
      <section
        id='solutions'
        className='text-center'
      >
        <Container>
          <h2 className='mb-5 md:mb-10'>Solutions</h2>
          <div className='space-y-4 mb-4'>
            <p>
              Bee populations are declining rapidly, but we can help save them
              with simple actions.
            </p>
            <p className='font-bold'>
              Small changes in our daily habits can make a big impact.
            </p>
            <p>
              Create bee-friendly spaces by providing food, water, and
              shelter—whether in a garden or on a balcony.
            </p>
            <p>
              Let&#39;s protect these vital pollinators for future generations.
            </p>
          </div>
          <AnchorLink
            href='#'
            text='Login to send request'
            className='text-brand-primary-bg-light uppercase underline decoration-underline-color-light '
          />
          {/* <AnchorLink
            href='#'
            text='Login to send request'
            className='text-brand-primary uppercase underline'
          /> */}

          <SolutionsContainer />
        </Container>
      </section>
    </>
  );
};
