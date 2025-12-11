import { useState } from 'react';
import ModalResourceLink from './ModalResourceLink';

function AboutUserProfiles({ profiles }) {
  const [modalIndex, setModalIndex] = useState(null);

  const handleClick = (e, url) => {
    e.preventDefault();
    setModalIndex(url);
  };

  return (
    <div className='p-6 lg:p-8 md:w-1/3 space-y-4 border border-border-color rounded-3xl'>
      {profiles.map((profile, index) => (
        <div
          key={index}
          className='flex justify-between items-center gap-4'
        >
          <div>
            <h3>{profile.name}</h3>
            <p className='text-sm text-secondary-dark'>{profile.role}</p>
          </div>
          <div className='flex items-center gap-3 lg:gap-3.5 text-3xl lg:text-4xl text-secondary-dark'>
            <a
              href='#'
              onClick={(e) => handleClick(e, profile.linkedin)}
            >
              <i className='fab fa-linkedin hover:text-footerLinkedinHoverColor' />
            </a>
            <a
              href='#'
              onClick={(e) => handleClick(e, profile.github)}
            >
              <i className='fab fa-github hover:text-primary-dark' />
            </a>
          </div>
        </div>
      ))}
      {modalIndex && (
        <ModalResourceLink
          url={modalIndex}
          handleClick={setModalIndex}
        />
      )}
    </div>
  );
}

export default AboutUserProfiles;
