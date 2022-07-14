import "./user-info.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/session";

const UserInfo = ({ user }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, email } = user;
  const [showMenu, setShowMenu] = useState(false);

  const onLogout = async (e) => {
    await dispatch(logout());
  };

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
          <div className="navbar__dropdown-info navbar__dropdown-info-account">
            Account
          </div>

          <div className="dropdown__menu-user-container">
            <div className="navbar__profilebutton-dropdown">{initials}</div>
            <div className="navbar__dropdown-info dropdown__username">
              <p>{`${firstName} ${lastName}`}</p>
              <p className="navbar__dropdown-info dropdown__email">{`${email}`}</p>
            </div>
          </div>

          <div className="navbar__dropdown-links">
            <Link to="/" exact={true}>
              Home
            </Link>
          </div>

          <div
            className="navbar__dropdown-links navbar__logout"
            onClick={onLogout}
          >
            Log Out
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
