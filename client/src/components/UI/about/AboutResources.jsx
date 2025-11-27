import { useState } from 'react';
import ModalResourceLink from './ModalResourceLink';

function AboutResources({ resourcesData }) {
  const [modalIndex, setModalIndex] = useState(null);
  const handleClick = (index) => {
    setModalIndex(index);
  };
  return (
    <div className='p-4 md:p-8 md:w-1/3 border border-border-color flex flex-col items-center gap-6 rounded-3xl'>
      <h3>Resources</h3>
      <ul className='text-center space-y-2'>
        {resourcesData.map((resource, index) => (
          <li key={index}>
            <a
              className='underline underline-offset-4 text-secondary-dark hover:text-brand-primary'
              onClick={() => handleClick(index)}
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

export default AboutResources;
