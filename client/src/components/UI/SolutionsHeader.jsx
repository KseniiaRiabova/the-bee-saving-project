import { AnchorLink } from './AnchorLink';

export const SolutionsHeader = () => {
  return (
    <section className='flex flex-col mt-4 pt-4 mb-4 pb-4 text-center'>
      <h2 className='mb-2 pb-2'>Solutions</h2>
      <div className='space-y-4'>
        <p>
          Bee populations are declining rapidly, but we can help save them with
          simple actions.
        </p>
        <p className='font-bold'>
          Small changes in our daily habits can make a big impact.
        </p>
        <p>
          Create bee-friendly spaces by providing food, water, and
          shelter—whether in a garden or on a balcony.
        </p>
        <p>Let&#39;s protect these vital pollinators for future generations.</p>
      </div>
      <AnchorLink
        href='#'
        text='Login to send request'
        className='text-[#F4743B] uppercase underline ml-1 mt-3'
      />
    </section>
  );
};
