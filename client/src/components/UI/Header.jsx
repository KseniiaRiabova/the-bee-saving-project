import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Nav } from '../UI/Nav';
import { Container } from './Container';
import navBeeLogo from '../../assets/imgs/nav_bee_logo.png';
// import useAuthStore from '../../stores/useAuthStore';

export const Header = ({ action, onClickHandler }) => {
  // const { isAuthenticated } = useAuthStore();
  return (
    <header className='bg-brand-secondary'>
      <Container py='header'>
        <div className='flex items-center justify-between gap-6'>
          {/* <Link to={isAuthenticated ? '/dashboard' : '/home'}> */}
          <Link to='/'>
            <img
              src={navBeeLogo}
              alt='Bee Logo'
              className='h-16 md:h-20 shrink-0'
            />
          </Link>

          <Nav
            action={action}
            onClickHandler={onClickHandler}
          />
        </div>
      </Container>
    </header>
  );
};

Header.propTypes = {
  action: PropTypes.string,
  onClickHandler: PropTypes.func,
};
