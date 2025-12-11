import PropTypes from 'prop-types';

export const DetailsSummary = ({ title, description, ...attrs }) => {
  return (
    <details
      {...attrs}
      className='group pb-4 border-border-color/60 border-b-[1px] last:border-b-0 last:pb-0'
    >
      <summary
        className='flex items-center justify-start'
        title='Click here to read more'
      >
        {title}
      </summary>
      <p className='text-secondary-dark pt-2 md:max-w-[80%] lg:max-w-[95%]'>
        {description}
      </p>
    </details>
  );
};

DetailsSummary.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
