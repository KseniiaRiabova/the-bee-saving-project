import PropTypes from 'prop-types';
import { DetailsSummary } from './DetailsSummary';

export const DetailsGroup = ({ list }) => {
  return (
    <article className='bg-brand-secondary-light min-h-full rounded-xl px-3 py-6 flex flex-col gap-6 md:py-10 md:gap-8 dark:bg-brand-secondary-dark'>
      {list.map(({ title, description }, index) => (
        <DetailsSummary
          key={index}
          open={index === 0}
          title={title}
          description={description}
        />
      ))}
    </article>
  );
};

DetailsGroup.propTypes = {
  list: PropTypes.array,
};
