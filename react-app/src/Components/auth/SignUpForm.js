import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import { CSSTransition } from "react-transition-group";
import { trello_left, trello_right } from '../../Assets/Images';
import { LoginFooter } from '../../Components'


const SignUpForm = () => {
  const [backendErrors, setBackendErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false);
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
    const firstNameCheck = firstName.trim().length !== 0;
    const lastNameCheck = lastName.trim().length !== 0;

    if (passwordCheck && emailCheck && firstNameCheck && lastNameCheck) {
      setLoading(true);
      const formData = new FormData();

      formData.append("firstName", firstName.trim());
      formData.append("lastName", lastName.trim());
      formData.append("email", email);
      formData.append("password", password);
      if (image) formData.append("profile_image", image)
      const data = await dispatch(signUp(formData));

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

    if (!firstNameCheck) {
      valErrors.push('Please provide a first name')
    }
    if (!lastNameCheck) {
      valErrors.push('Please provide a last name')
    }
    setErrors([...valErrors])
  };

  useEffect(() => {
    const valErrors = [];
    if (backendErrors[0]) valErrors.push('There is already an account associated with this email.');
    setErrors(valErrors)
  }, [submitted])

  useEffect(() => {
    const lengthErrors = []
    if (email.length === 50) {
      lengthErrors.push('Please keep email to under 50 characters')
    }
    if (firstName.length === 40) {
      lengthErrors.push('Please keep first name to under 40 characters')
    }
    if (lastName.length === 40) {
      lengthErrors.push('Please keep last name to under 40 characters')
    }
    if (password.length === 40) {
      lengthErrors.push('Please keep password to under 40 characters')
    }
    if (lengthErrors.length) setErrors(lengthErrors)
    else setErrors([]);
  }, [email, firstName, lastName, password, repeatPassword])

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

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
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
        <div className='login__form-wrapper'>

          <div className='login__form-container'>
            <form className='login__form' onSubmit={onSignUp}>
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
              <p className='login__call'>Sign up for your account</p>
              <div>
                <input
                  type='text'
                  className='login__input login__input-top'
                  name='firstName'
                  maxLength={40}
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
                  maxLength={40}
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
                  maxLength={50}
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
                  maxLength={40}
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
                  maxLength={40}
                  placeholder='Confirm password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
              <div className='login__input'>
                <label className=''>
                  <div className='photo__upload-login'>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={updateImage}
                      hidden
                    />
                    {!image && <span className='upload-profile-img'>Upload profile image (optional)</span>}
                    {image && <span className='upload-profile-img'>Change profile image</span>}
                  </div>
                </label>
              </div>
              {image &&
                <div className='file__name-container'>
                  <span className='file__name'>{image.name} 👍
                  </span>
                  <span
                    className="material-symbols-outlined file__trashcan"
                    onClick={() => setImage('')}
                  >
                    delete
                  </span>
                </div>}
              <button
                className={!errors.length ? 'login__button-submit' : 'signup__btn-disabled'}
                type='submit'
                disabled={errors.length}
              >
                Sign Up
              </button>
              <div className='login__underline' />
              <NavLink className='login__signup' to='/login' exact>
                Already have an account? Log in
              </NavLink>
            </form>
          </div>
          <LoginFooter />
        </div>
      </div>
      <div className='landing__photo-container'>
        <figure className='landing__image landing__image-left' style={{ backgroundImage: `url(${trello_left})` }} />
        <figure className='landing__image image landing__image-left' style={{ backgroundImage: `url(${trello_right})` }} />
      </div>
    </>
  );
};

export default SignUpForm;
