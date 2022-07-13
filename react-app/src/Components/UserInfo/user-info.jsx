import "./user-info.css";
import LogoutButton from "../auth/LogoutButton";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserInfo = ({ user }) => {
  const { firstName, lastName, email } = user;
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const initials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;

  return (
    <>
      <div className="navbar__profilebutton" onClick={openMenu}>
        <p className="navbar__initials">{initials}</p>
      </div>
      {showMenu && (
        <div className="navbar__profile-dropdown">
          <div className="navbar__dropdown-info navbar__dropdown-info-account">Account</div>

          <div className="navbar__dropdown-info">
            <div className='navbar__profilebutton'>{initials}</div>
            <p>{`${firstName} ${lastName}`}</p>
          </div>

          <div className="navbar__dropdown-info">
            {`${email}`}
          </div>

          <div className="navbar__dropdown-links">
            <Link to="/" exact={true} activeClassName="active">
              Home
            </Link>
          </div>

          <div className="navbar__dropdown-links">
            <LogoutButton />
          </div>

        </div>
      )}
    </>
  );
};

export default UserInfo;
