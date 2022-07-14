import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import { CSSTransition } from "react-transition-group";

// import './login.css'


const SignUpForm = () => {
  const [backendErrors, setBackendErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    const valErrors = [];
    e.preventDefault();
    const emailCheck = validateEmail(email);
    const passwordCheck = (password === repeatPassword)
    if (passwordCheck && emailCheck) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setBackendErrors(data)
        setSubmitted(!submitted)
      }
    }
    if (!emailCheck) {
      valErrors.push('Please provide a valid email address.')
      setErrors([...valErrors])
      return
    }
    if (!passwordCheck) valErrors.push('Passwords do not match.');
    setErrors([...valErrors])
  };

  useEffect(() => {
    const valErrors = [];
    if (backendErrors[0]) valErrors.push('There is already an account associated with this email.');
    setErrors(valErrors)
  }, [submitted])

  useEffect(() => {
    setErrors([]);
  }, [email, password, repeatPassword])

  const validateEmail = (elementValue) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  }

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
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
          <form className='login__form' onSubmit={onSignUp}>
            <p className='login__call'>Sign up for your account</p>
            <CSSTransition
              in={errors[0]}
              timeout={500}
              classNames="error-transition"
              unmountOnExit
            >
              <div className='error__container-login'>
                {errors.map((error, ind) => (
                  <div className='error__text-login' key={ind}>{error}</div>
                ))}
              </div>
            </CSSTransition>
            <div>
              <input
                type='text'
                className='login__input login__input-top'
                name='firstName'
                autoComplete='off'
                required
                placeholder='Enter first name'
                onChange={updateFirstName}
                value={firstName}
              ></input>
            </div>
            <div>
              <input
                type='text'
                className='login__input'
                name='lastName'
                required
                autoComplete='off'
                placeholder='Enter last name'
                onChange={updateLastName}
                value={lastName}
              ></input>
            </div>
            <div>
              <input
                type='text'
                name='email'
                required
                className='login__input'
                placeholder='Enter email'
                autoComplete='off'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div>
              <input
                type='password'
                className='login__input'
                name='password'
                required
                placeholder='Enter password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <input
                type='password'
                name='repeat_password'
                className='login__input'
                placeholder='Confirm password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button className='login__button-submit' type='submit'>Sign Up</button>
            <div className='login__underline' />
            <NavLink className='login__signup' to='/login' exact={true} activeClassName='active'>
              Already have an account? Log in
            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
