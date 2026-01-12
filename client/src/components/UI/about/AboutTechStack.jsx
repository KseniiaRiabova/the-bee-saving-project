import ModalResourceLink from './ModalResourceLink';
import { useState } from 'react';
import PropTypes from 'prop-types';
import TechIcon from './TechIcon';

function AboutTechStack({ techstack }) {
  const [modalIndex, setModalIndex] = useState(null);

  const handleClick = (e, url) => {
    e.preventDefault();
    setModalIndex(url);
  };

  return (
    <div className='p-4 md:p-8 md:w-1/3 border border-border-color flex flex-col items-center gap-6 rounded-3xl'>
      <h3>Tech Stack</h3>

      <div className='grid grid-cols-2 gap-x-8 gap-y-9 md:w-full'>
        {techstack.map((tech, index) => (
          <div
            key={index}
            className={`flex justify-center items-center ${tech.name === 'tailwindcss' ? 'col-span-2' : ''
              }`}
          >
            <a
              href="#"
              onClick={(e) => handleClick(e, tech.url)}
              aria-label={`Open ${tech.name} resource`}
            >
              <TechIcon
                id={tech.image}
                className={`w-full duration-300 hover:scale-105 ${tech.name === 'tailwindcss'
                    ? 'max-w-60 max-h-16'
                    : 'max-w-20 xl:max-w-28 max-h-20 xl:max-h-24'
                  }`}
              />
            </a>
          </div>
        ))}
      </div>

      {modalIndex && (
        <ModalResourceLink
          url={modalIndex}
          handleClick={setModalIndex}
        />
      )}
    </div>
  );
}

AboutTechStack.propTypes = {
  techstack: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AboutTechStack;
