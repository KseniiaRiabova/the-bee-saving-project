import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';

const NavLinks = ({ isNavMenuOpen }) => {
  const location = useLocation();
  const { hash } = useLocation();
  const { isAuthenticated, user } = useAuthStore();
  const [activeLink, setActiveLink] = useState('');
  //const navigate = useNavigate();

  // Determine active link based on URL (works for both /home and /dashboard)
  useEffect(() => {
    if (location.hash === '#solutions') setActiveLink('solutions');
    else if (location.hash === '#footer') setActiveLink('footer');
    else if (location.pathname === '/dashboard') setActiveLink('dashboard');
    else setActiveLink('home');

    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  // Universal nav link handler
  // const handleNavClick = (linkName, targetUrl, sectionId = null) => {
  //   setActiveLink(linkName);
  //   //setIsNavMenuOpen(false);

  //   navigate(targetUrl, { replace: true });

  //   if (sectionId) {
  //     setTimeout(() => {
  //       const section = document.getElementById(sectionId);
  //       if (section) section.scrollIntoView({ behavior: 'smooth' });
  //     }, 100);
  //   }
  // };

  // Tailwind helper for styling (orange + underline for hover/focus/active)
  const getLinkClass = (linkName) =>
    `p-2.5 rounded-lg ${
      activeLink === linkName
        ? 'text-brand-primary underline underline-offset-4'
        : 'dark:text-white'
    } hover:text-primary-dark hover:bg-neutral-300`;

  // Determine the base path dynamically (home or dashboard)
  const currentBasePath = location.pathname.startsWith('/dashboard')
    ? '/dashboard'
    : '/';

  const links = [
    { label: 'home', path: '/', sectionId: 'home' },
    { label: 'solutions', path: '/#solutions', sectionId: 'solutions' },
    {
      label: 'about us',
      path: currentBasePath + '#footer',
      sectionId: 'footer',
    },
    {
      label: 'dashboard',
      path: '/dashboard',
      sectionId: 'dashboard',
      auth: true,
    },
  ];

  return (
    <ul
      className={`flex items-center gap-5 lg:gap-8 text-lg capitalize${
        isNavMenuOpen ? ' flex-col' : ''
      }`}
    >
      {links.map(({ label, path, sectionId, auth }) => {
        if (auth && !isAuthenticated) return null;
        return (
          <li key={label}>
            <Link
              to={path}
              className={getLinkClass(sectionId)}
              // onClick={() => handleNavClick(sectionId, path, sectionId)}
              onClick={() => setActiveLink(sectionId)}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
