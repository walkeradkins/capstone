
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux'
import './NavBar.css';
import UserInfo from './UserInfo/user-info';

const NavBar = ({ loaded }) => {
  const user = useSelector(state => state.session.user);
  let sessionLinks;

  if (user) {
    sessionLinks = (
      <>
        <UserInfo user={user} />
      </>
    )
  } else {
    sessionLinks = (
      <>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </>
    )
  }
  return (
    <nav className='navbar'>
      <div className='navbar__right'>
        Whatnext?
      </div>
      <div className='navbar__left'>
        {loaded && sessionLinks}
        {!loaded && sessionLinks}
      </div>
    </nav>
  );
}

export default NavBar;
