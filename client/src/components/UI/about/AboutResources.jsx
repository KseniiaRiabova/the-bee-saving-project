import { useState } from 'react';
import PropTypes from 'prop-types';
import ModalResourceLink from './ModalResourceLink';

function AboutResources({ resourcesData }) {
  const [modalIndex, setModalIndex] = useState(null);

  const handleClick = (index, event) => {
    event.preventDefault();
    setModalIndex(index);
  };

  return (
    <div className='p-4 md:p-8 md:w-1/3 border border-border-color flex flex-col items-center gap-6 rounded-3xl dark:text-secondary-dark'>
      <h3>Resources</h3>

      <ul className='text-center space-y-2'>
        {resourcesData.map((resource, index) => (
          <li key={index}>
            <a
              href={resource.url}
              className='underline underline-offset-4 text-secondary-dark hover:text-brand-primary dark:text-secondary-light dark:decoration-secondary-dark'
              onClick={(e) => handleClick(index, e)}
              aria-haspopup="dialog"
              aria-expanded={modalIndex === index}
            >
              {resource.name}
            </a>

            {modalIndex === index && (
              <ModalResourceLink
                url={resource.url}
                handleClick={handleClick}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

AboutResources.propTypes = {
  resourcesData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AboutResources;
