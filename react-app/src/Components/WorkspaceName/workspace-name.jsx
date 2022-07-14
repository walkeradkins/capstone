import "./workspace-name.css";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { updateWorkspace } from "../../store/workspaces";
import AutoSizeInput from "react-input-autosize";
import { CSSTransition } from "react-transition-group";

const WorkspaceName = ({ workspace }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState(false);
  const [sent, setSent] = useState(true);
  const focusRef = useRef(null);
  const [contentCheck, setContentCheck] = useState("");
  const [errorCheck, setErrorCheck] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const trueEdit = (e) => {
    e.stopPropagation();
    e.target.select();
    if (edit) return;
    setEdit(true);
  };

  const errorObj = {
    err1: "Please keep board names to 50 characters or less",
    err2: "Board names cannot be empty",
  };

  useEffect(() => {
    const validationErrors = [];
    if (content.length > 49) {
      validationErrors.push("err1");
    }

    if (content.trim().length < 1) {
      validationErrors.push("err2");
    }

    setErrorCheck(validationErrors.length > 0);
    setErrors(validationErrors);
  }, [content, dispatch]);

  useEffect(() => {
    setContent(name);
  }, [dispatch]);

  useEffect(() => {
    if (content.length) {
      setContentCheck(content);
    }
    if (!content.length && contentCheck) {
      setContent(contentCheck);
    }
    if (!content.length && !contentCheck) {
      setContent(name);
    }
  }, [sent]);

  const closeEdit = async (e) => {
    if (errors.length || !content.length || content.length === 50) {
      focusRef.current.focus();
      return;
    }
    const payload = {
      name: content.trim(),
    };
    let updatedName;
    if (!errors.length) {
      const updateData = async () => {
        try {
          updatedName = await dispatch(updateWorkspace(payload, id));
        } catch (error) {
          alert(error);
        }
      };
      updateData();
      setErrors("");
      setEdit(false);
    }
    setSent(!sent);
  };

  useEffect(() => {
    if (!edit) return;
    document.addEventListener("click", closeEdit);
    return () => document.removeEventListener("click", closeEdit);
  }, [edit, content, errors]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      focusRef.current.focus();
      if (errors.length || !content.length || content.length === 50) {
        return;
      }

      if (!errors.length) {
        document.getElementById("input__workspacename").blur();
        return closeEdit(e);
      }
    }
  };

  if (!workspace) return null;
  const { name, id } = workspace;

  const inputStylesActive = {
    backgroundColor: "white",
    border: "2px solid rgb(0, 81, 255)",
    borderRadius: ".25em",
    padding: ".25em",
    textAlign: "center",
    cursor: "text",
    fontSize: "1.25em",
    fontWeight: "bold",
    resize: "none",
    outline: "none",
    userSelect: "all",
  };

  const inputStylesInactive = {
    backgroundColor: "transparent",
    color: "black",
    borderRadius: "1em",
    border: "transparent 2px solid",
    outline: "none",
    transition: "0.2s",
    cursor: "pointer",
    padding: ".25em",
    textAlign: "center",
    color: "white",
    fontSize: "1.25em",
    fontWeight: "bold",
    // margin: '.5em 1em',
  };

  return (
    <div className="workspace-input__wrapper">
      <AutoSizeInput
        id="input__workspacename"
        className={edit ? "input__active" : "input__inactive"}
        value={content}
        onClick={trueEdit}
        minLength={1}
        autoComplete={false}
        spellCheck={false}
        onKeyPress={handleKeyPress}
        maxLength={50}
        inputStyle={edit ? inputStylesActive : inputStylesInactive}
        ref={focusRef}
        onChange={(e) =>
          e.target.value.length > -1 ? setContent(e.target.value) : null
        }
      />
      <CSSTransition
        in={errorCheck}
        timeout={500}
        classNames="list-transition"
        unmountOnExit
      >
        <div className="workspace__name-error-container">
          <p className="workspace__name-error-text">
            {errors[0] == "err1" ? errorObj.err1 : errorObj.err2}
          </p>
        </div>
      </CSSTransition>
    </div>
  );
};

export default WorkspaceName;
