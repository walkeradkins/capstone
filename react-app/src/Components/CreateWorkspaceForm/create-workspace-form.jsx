import "./create-workspace-form.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createNewWorkspace } from "../../store/workspaces";
import { CSSTransition } from "react-transition-group";
import { labels } from "../utils";
import Select from "react-select";
import {
  bookshelf,
  gradient,
  jungle,
  plants,
  watercolor,
  whatnext_background,
  wood,
} from "../../Assets/Images";

import { backgroundArray, backgroundObject } from "../../Assets/Images/index";

const CreateWorkspaceModal = ({ user, setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState(false);
  const [index, setIndex] = useState(0);
  const [name, setName] = useState("");
  const [background, setBackground] = useState(backgroundArray[0].index);
  const errorString = "Board titles must be under 50 characters.";

  useEffect(() => {
    if (name.length === 50) {
      setErrors(true);
    } else setErrors(false);
  }, [name]);

  // const handleCheck = (i) => {
  //   setBackground(i);
  //   setIndex(i);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: name.trim(),
      owner_id: user.id,
      labels: JSON.stringify(labels),
      background
    };
    let newWorkspace;
    try {
      newWorkspace = await dispatch(createNewWorkspace(user.id, payload));
    } catch (error) {
      alert(error);
    }
    if (newWorkspace) {
      setName("");
      history.push(`/b/${newWorkspace.id}`);
      setShowModal(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (errors || !name.length || name.length === 50) {
        return;
      }
      if (!errors.length) {
        return handleSubmit(e);
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="create__board-container">
      <div className="create__board-header">
        <p className="create__board-header-text create__board-text">
          Create board
        </p>
        <span
          className="material-symbols-outlined create__board-close"
          onClick={handleClose}
        >
          close
        </span>
      </div>
      <div className="create__underline" />
      <form className="create__board-form" onSubmit={handleSubmit}>
        <CSSTransition
          in={errors}
          timeout={500}
          classNames="error-transition"
          unmountOnExit
        >
          <div className="error__container-workspace">
            <div className="error__text-workspace">{errorString}</div>
          </div>
        </CSSTransition>
        <span className="create__board-text bold">
          Board title<span className="create__board-asterisk">*</span>
        </span>
        <input
          className="create__board-input"
          required
          value={name}
          autoFocus={true}
          onKeyPress={handleKeyPress}
          maxLength={50}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="create__board-text">
          <span className="create__board-emoji">👋</span> Don't forget to choose a background
        </span>
        <div className="color__container">
          {backgroundArray.map((item, i) => {
            return (
              <figure
                className={
                  i === index
                    ? "background__container background__container-picked"
                    : "background__container"
                }
                style={{ backgroundImage: `url( ${item.type} )` }}
                value={item.index}
                key={i}
                onClick={() => {setBackground(i); setIndex(i)}}
              />
            );
          })}
        </div>
        <button
          className={
            name.trim().length && name.trim().length < 50
              ? "create__workspace--submit"
              : "create__workspace--submit-disabled"
          }
          type="submit"
          disabled={!name.trim().length || errors}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateWorkspaceModal;
