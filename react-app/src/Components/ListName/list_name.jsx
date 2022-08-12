import "./list-name.css";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { updateList } from "../../store/lists";
import ListDelete from "../ListDelete/list-delete";
import TextareaAutosize from "react-textarea-autosize";
import { CSSTransition } from "react-transition-group";

const ListName = ({ list }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(list.title);
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState(false);
  const focusRef = useRef(null);
  const [errorOne, setErrorOne] = useState(false);
  const [errorTwo, setErrorTwo] = useState(false);

  useEffect(() => {
    setContent(title);
  }, [dispatch]);

  useEffect(() => {
    if (content.length > 249) {
      setErrorOne(true);
      setErrors(['error1'])
    } else if (content.trim().length < 1) {
      setErrorTwo(true);
      setErrors(['error2'])
    } else {
      setErrorOne(false);
      setErrorTwo(false);
      setErrors([])
    }
  }, [content]);

  const trueEdit = (e) => {
    const idCheck = +e.target.className.split(' ')[0]
    if (list.id !== idCheck) {
      e.stopPropagation();
    }

    e.target.select();
    if (edit) return;
    setEdit(true);
  };

  const closeEdit = (e) => {
    if (errors.length || !content.length || content.length === 250) {
      setEdit(true);
      focusRef.current.focus();
      return;
    }

    const payload = {
      title: content.trim(),
    };

    if (!errors.length) {
      let updatedName;
      const updateData = async () => {
        try {
          updatedName = await dispatch(updateList(payload, id));
        } catch (error) {
          alert(error);
        }
      };
      updateData();
      setEdit(false);
    }
  };

  useEffect(() => {
    if (!edit) return;
    document.addEventListener("click", closeEdit);
    return () => document.removeEventListener("click", closeEdit);
  }, [edit, content]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      focusRef.current.focus();
      if (errors.length || !content.length || content.length === 250) {
        return;
      }

      if (!errors.length) {
        const listNames = Array.from(
          document.getElementsByClassName("input__active-list")
        );
        listNames.forEach((element) => element.blur());
        return closeEdit(e);
      }
    }
  };

  if (!list) return null;
  const { title, id } = list;

  return (
    <div className="list__header-container">
      <div className="list__header-items">
        <div className={!edit ? "tooltip bold" : null}>
          <TextareaAutosize
            id="listname__input"
            className={edit ?  `input__active-list` : `${list.id} input__inactive-list`}
            value={content}
            spellCheck={false}
            onClick={trueEdit}
            maxLength={250}
            onKeyPress={handleKeyPress}
            minRows={1}
            ref={focusRef}
            onChange={(e) => setContent(e.target.value)}
          />
          {!edit && <span className="top">Click to edit list name</span>}
        </div>
        <ListDelete list={list} />
      </div>
      <CSSTransition
        in={errorOne}
        timeout={500}
        appear={false}
        classNames="list-transition"
        unmountOnExit
      >
        <div className="error__container">
          <p className="error__text error__text-add-card">
            Please keep list titles to 250 characters or less.
          </p>
        </div>
      </CSSTransition>
      <CSSTransition
        in={errorTwo}
        timeout={500}
        classNames="list-transition"
        unmountOnExit
        appear={false}
      >
        <div className="error__container">
          <p className="error__text error__text-add-card">
            Please provide a title for your list.
          </p>
        </div>
      </CSSTransition>
    </div>
  );
};

export default ListName;
