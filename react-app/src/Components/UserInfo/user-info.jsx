import "./user-info.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/session";
import { ProfileImage } from "../../Components";

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

  return (
    <>
      <div className='navbar__icon-user'onClick={openMenu}>
        <ProfileImage user={user} size={'2.5em'}/>
      </div>
      {showMenu && (
        <div className="navbar__profile-dropdown">
          <div className="navbar__dropdown-info navbar__dropdown-info-account">
            Account
          </div>

          <div className="dropdown__menu-user-container">
            <ProfileImage user={user} size={'4.5em'}/>
            <div className="navbar__dropdown-info dropdown__username">
              <p>{`${firstName} ${lastName}`}</p>
              <p className="navbar__dropdown-info dropdown__email">{`${email}`}</p>
            </div>
          </div>

          <div className="navbar__dropdown-links">
            <Link to="/" exact className="navbar__dropdown-link">
              <div>Home</div>
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
