import ModalResourceLink from './ModalResourceLink';
import { useState } from 'react';
import TechIcon from './TechIcon';

function FooterTechStack({ techstack }) {
  const [modalIndex, setModalIndex] = useState(null);
  const handleClick = (e, url) => {
    e.preventDefault();
    setModalIndex(url);
  };
  return (
    <div className='box2 p-4 md:p-8 w-full md:w-1/3 border border-footerBoxColor flex flex-col items-center gap-6 rounded-3xl'>
      <h2 className='text-xl font-bold text-footerProfileNameColor dark:text-white'>
        Tech Stack
      </h2>

      <div className='grid grid-cols-2 gap-x-8 gap-y-10 md:w-full'>
        {techstack.map((tech, index) => (
          <div
            key={index}
            className={`flex justify-center items-center ${
              tech.name === 'tailwindcss' ? 'col-span-2' : ''
            }`}
          >
            <a
              href='#'
              onClick={(e) => handleClick(e, tech.url)}
            >
              <TechIcon
                id={tech.image}
                className={`w-full duration-300 hover:scale-105 ${
                  tech.name === 'tailwindcss'
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

export default FooterTechStack;
