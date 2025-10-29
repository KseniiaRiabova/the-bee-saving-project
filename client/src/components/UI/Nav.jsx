import PropTypes from "prop-types";
import { useState, useCallback, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../UI/Button";
import { DarkLightModeButton } from "../UI/DarkLightModeButton";
import { BurgerMenu } from "./BurgerMenu";
import { useAuthListener } from "../../components/auth/useAuthListener";
import { useLogout } from "../../hooks/useLogout";

export const Nav = ({ action, onClickHandler }) => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const userInfoRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuthListener();
  const logout = useLogout();

  // Determine active link based on URL (works for both /home and /dashboard)
  useEffect(() => {
    if (location.hash === "#solutions") setActiveLink("solutions");
    else if (location.hash === "#footer") setActiveLink("about");
    else if (location.pathname === "/dashboard") setActiveLink("dashboard");
    else if (location.pathname === "/home") setActiveLink("home");
  }, [location]);

  // Close user info dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (userInfoRef.current && !userInfoRef.current.contains(event.target)) {
      setShowUserInfo(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);

  const onChangeToggleClassHandler = () => {
    setIsNavMenuOpen((prev) => !prev);
  };

  const handleAuthClick = useCallback(() => {
    if (isAuthenticated) logout();
    else onClickHandler?.();
  }, [isAuthenticated, logout, onClickHandler]);

  const toggleUserInfo = () => setShowUserInfo((prev) => !prev);

  // Universal nav link handler
  const handleNavClick = (linkName, targetUrl, sectionId = null) => {
    setActiveLink(linkName);
    setIsNavMenuOpen(false);

    navigate(targetUrl, { replace: true });

    if (sectionId) {
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Determine the base path dynamically (home or dashboard)
  const currentBasePath =
    location.pathname.startsWith("/dashboard") ? "/dashboard" : "/home";

  // Tailwind helper for styling (orange + underline for hover/focus/active)
  const getLinkClass = (linkName) =>
    `p-2.5 rounded-lg transition-colors duration-150 ${activeLink === linkName
      ? "text-[#F4743B] underline"
      : "text-black dark:text-white"
    } hover:text-[#F4743B] hover:underline focus:text-[#F4743B] focus:underline`;

  return (
    <>
      <BurgerMenu onChangeHandler={onChangeToggleClassHandler} isOpen={isNavMenuOpen} />

      <nav className={`${isNavMenuOpen ? "" : "hidden md:block"}`}>
        <ul
          className={`flex items-center justify-center text-lg ${isNavMenuOpen
              ? "flex-col gap-6 absolute top-0 left-0 w-full h-dvh bg-neutral-500 z-40"
              : "flex-row gap-5 lg:gap-9"
            }`}
        >
          {/* Home */}
          <li>
            <Link
              to="/home"
              className={getLinkClass("home")}
              onClick={() => handleNavClick("home", "/home")}
            >
              Home
            </Link>
          </li>

          {/* Solutions */}
          <li>
            <a
              onClick={() =>
                handleNavClick("solutions", "/home#solutions", "solutions")
              }
              className={getLinkClass("solutions")}
            >
              Solutions
            </a>
          </li>

          {/* About Us — scrolls to footer in current page (home or dashboard) */}
          <li>
            <a
              onClick={() =>
                handleNavClick("about", `${currentBasePath}#footer`, "footer")
              }
              className={getLinkClass("about")}
            >
              About Us
            </a>
          </li>

          {/* Dashboard */}
          {isAuthenticated && (
            <li className="text-center">
              <Link
                to="/dashboard"
                className={getLinkClass("dashboard")}
                onClick={() => handleNavClick("dashboard", "/dashboard")}
              >
                Dashboard
              </Link>
            </li>
          )}

          {/* Auth button */}
          {!isAuthenticated && (
            <li>
              <Button type="button" text={action} onClickHandler={handleAuthClick} />
            </li>
          )}

          {/* Dark/Light toggle */}
          <li>
            <DarkLightModeButton />
          </li>

          {/* User profile */}
          {isAuthenticated && user && (
            <li className="relative flex items-center space-x-3" ref={userInfoRef}>
              <button
                onClick={toggleUserInfo}
                className="p-0 rounded-full border border-neutral-400 focus:outline-none"
                title="Toggle user info"
              >
                <img src={user.picture} alt="avatar" className="w-10 h-10 rounded-full" />
              </button>

              {showUserInfo && (
                <div className="absolute top-8 right-[-146px] mt-2 min-w-[340px] w-[280px] p-4 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-lg z-50 md:right-0">
                  <div className="font-medium text-black dark:text-white break-words mb-1">
                    {user.name}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-300 break-all mb-3">
                    {user.email.split("@")[0]}
                  </div>
                  <Button type="button" text="Log Out" onClickHandler={handleAuthClick} />
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

Nav.propTypes = {
  action: PropTypes.string,
  onClickHandler: PropTypes.func,
};
