import { useState } from "react";
import ModalResourceLink from "./ModalResourceLink";

function FooterUserProfiles({ profiles }) {
  const [modalIndex, setModalIndex] = useState(null);

  const handleClick = (e, url) => {
    e.preventDefault();
    setModalIndex(url);
  };

  return (
    <div className='box1 p-6 lg:p-8 w-full md:w-1/3 space-y-4 border border-footerBoxColor rounded-3xl dark:bg-black dark:text-white'>
      {profiles.map((profile, index) => (
        <div
          key={index}
          className='profile-info flex justify-between items-center gap-4'
        >
          <div className='firstNameContainer'>
            <h2 className='text-2xl text-footerProfileNameColor dark:text-white'>
              {profile.name}
            </h2>
            <p className='text-sm text-footerBoxColor'>{profile.role}</p>
          </div>
          <div className='icon-containers flex items-center'>
            <a
              href='#'
              onClick={(e) => handleClick(e, profile.linkedin)}
              className='group'
            >
              <i className='fab flex-shrink-0 fa-linkedin text-3xl lg:text-4xl h-8 mr-3 lg:mr-4  group-hover:text-footerLinkedinHoverColor' />
            </a>
            <a
              href='#'
              onClick={(e) => handleClick(e, profile.github)}
              className='group'
            >
              <i className='fab fa-github  text-3xl lg:text-4xl h-8 group-hover:text-footerProfileNameColor' />
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

export default FooterUserProfiles;
