import "./welcome.css";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const Welcome = () => {
  const [show, setShow] = useState(true);

  return (
    <CSSTransition
      in={show}
      timeout={500}
      classNames="welcome-transition"
      unmountOnExit
    >
      <div className="home__welcome-wrapper">
        <div className="home__welcome-container">
          <p className="home__welcome">
            Welcome to the last project management app you'll ever need! Start
            using WhatNext by creating a new workspace. From there, create as
            many lists as you like. Populate the lists with specific tasks and
            move them along as they're completed.
          </p>
          <button
            className="home__welcome-btn bold"
            onClick={() => setShow(false)}
          >
            Got it!
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Welcome;
