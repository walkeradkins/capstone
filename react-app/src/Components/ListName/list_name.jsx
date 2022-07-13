import "./list-name.css";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { updateList } from "../../store/lists";
import ListDelete from "../ListDelete/list-delete";
import TextareaAutosize from "react-textarea-autosize";
import { CSSTransition } from "react-transition-group";

const ListName = ({ list }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState(false);
  const focusRef = useRef(null);
  const [errorCheck, setErrorCheck] = useState(false);

  const errorObj = {
    err1: "Please keep list titles to 250 characters or less",
    err2: "Please provide a title for your list",
  };

  useEffect(() => {
    const validationErrors = [];
    if (content.length > 249) {
      validationErrors.push("err1");
    }

    if (content.trim().length < 1) {
      validationErrors.push("err2");
    }

    setErrorCheck(validationErrors.length > 0);
    setErrors(validationErrors);
  }, [content, dispatch]);

  const trueEdit = (e) => {
    e.stopPropagation();
    e.target.select();
    if (edit) return;
    setEdit(true);
  };

  useEffect(() => {
    setContent(title);
  }, [dispatch]);

  const closeEdit = (e) => {
    console.log("lengtth", content.length);
    if (errors.length || !content.length || content.length === 250) {
      console.log("errrors");
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
      <CSSTransition
        in={errorCheck}
        timeout={500}
        classNames="list-transition"
        unmountOnExit
      >
        <div className="error__container">
          <p className="error__text error__text-add-card">
            {errors[0] === "err1" ? errorObj.err1 : errorObj.err2}
          </p>
        </div>
      </CSSTransition>
      <div className="list__header-items">
        <TextareaAutosize
          id="listname__input"
          className={edit ? "input__active-list" : "input__inactive-list"}
          value={content}
          spellCheck={false}
          onClick={trueEdit}
          maxLength={250}
          onKeyPress={handleKeyPress}
          minRows={1}
          ref={focusRef}
          onChange={(e) => setContent(e.target.value)}
        />
        <ListDelete list={list} />
      </div>
    </div>
  );
};

export default ListName;
