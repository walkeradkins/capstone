
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux'
import './NavBar.css';

const NavBar = ({ loaded }) => {
  const user = useSelector(state => state.session.user);
  let sessionLinks;

  if (user) {
    sessionLinks = (
      <>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
        <LogoutButton />
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
      {loaded && sessionLinks}
      {!loaded && sessionLinks}
    </nav>
  );
}

export default NavBar;
