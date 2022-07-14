import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
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
        <NavLink to='/login' exact={true}>
          Login
        </NavLink>
        <NavLink to='/sign-up' exact={true}>
          Sign Up
        </NavLink>
      </>
    )
  }
  return (
    <nav className='navbar'>
      <div className='navbar__right'>
      <Link to='/' className='navbar__link' exact={true} >
        <div className='navbar__logo-container'>
          <p className='navbar__logo'>💠</p>
          <p className='navbar__logo-text'>WhatNext?</p>
        </div>
      </Link>
      </div>
      <div className='navbar__left'>
        {loaded && sessionLinks}
        {!loaded && sessionLinks}
      </div>
    </nav>
  );
}

export default NavBar;
