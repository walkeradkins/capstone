import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './login.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className='login__background' />
      <div className='login__container'>
        <div className='login__logo-container'>
          <div className='login__logo'>💠</div>
          <h3 className='login__header-text'>WhatNext?</h3>
        </div>
        <div className='login__form-container'>
          <form className='login__form' onSubmit={onLogin}>
            <p className='login__call'>Log in to WhatNext</p>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <input
                className='login__input'
                name='email'
                type='text'
                autocomplete="off"
                placeholder='Enter email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <input
                className='login__input'
                name='password'
                autocomplete="off"
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <button className='login__button-submit' type='submit'>Log in</button>
            <p className='login__or'>OR</p>
            <div className='login__demo'>
              <p className='login__emoji'>👍</p>
              <p className='login__demo-text'>Continue as demo user</p>
            </div>
            <div className='login__underline'/>
            <NavLink className='login__signup' to='/sign-up' exact={true} activeClassName='active'>
              Sign up for an account
            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
