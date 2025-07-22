import PropTypes from 'prop-types';
// import { AnchorLink } from '../UI/AnchorLink';
import { Link } from 'react-router-dom';
import { Nav } from '../UI/Nav';
import navBeeLogo from '../../assets/imgs/nav_bee_logo.png';
import React from 'react';
// // import { Link } from 'react-router-dom';
// import navBeeLogo from '../../assets/imgs/nav_bee_logo.png';

export const Header = ({ action, onClickHandler, isAuthenticated }) => {
  return (
    <header>
      <div className='flex items-center justify-between gap-6 p-6'>
        <div className='logo shrink-0'>
          <Link to={isAuthenticated ? '/dashboard' : '/'}>
            <img src={navBeeLogo} alt='Bee Logo' className='h-16 md:h-24' />
          </Link>
        </div>
        <Nav action={action} onClickHandler={onClickHandler} />
      </div>
    </header>
  );
};

Header.propTypes = {
  action: PropTypes.string,
  onClickHandler: PropTypes.func,
};
