import PropTypes from "prop-types";

export const DetailsSummary = ({ title, description, ...attrs }) => {
  return (
    <details {...attrs}>
      <summary
        className='flex items-center justify-start'
        title='Click here to read more'
      >
        {title}
      </summary>
      <p className='text-[#4b4f57] py-4 md:max-w-[80%] lg:max-w-[95%]'>
        {description}
      </p>
    </details>
  );
};

DetailsSummary.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
