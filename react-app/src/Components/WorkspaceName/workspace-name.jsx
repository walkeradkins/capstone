import "./workspace-name.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateWorkspace } from "../../store/workspaces";
import AutoSizeInput from "react-input-autosize";

const WorkspaceName = ({ workspace }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState(false);
  const [sent, setSent] = useState(true);
  const [contentCheck, setContentCheck] = useState("");

  const trueEdit = (e) => {
    e.stopPropagation();
    e.target.select();
    if (edit) return;
    setEdit(true);
  };

  useEffect(() => {
    const errors = [];
    if (content.length >= 49) {
      errors.push("Please keep board names to 50 characters or less");
      setErrors(errors);
    } else if (content.length < 1) {
      errors.push("Board names cannot be empty");
      setErrors(errors);
    }
    else {
      setErrors("");
    }
  }, [content]);

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
    if (!content.length) return;
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
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        document.getElementById("input__workspacename").blur();
        return closeEdit(e);
      }
    });

    return () => document.removeEventListener("click", closeEdit);
  }, [edit, content, errors]);

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
        maxLength={49}
        inputStyle={edit ? inputStylesActive : inputStylesInactive}
        onChange={(e) =>
          e.target.value.length > -1 ? setContent(e.target.value) : null
        }
      />
      <p className="error__text-workspace-edit">{errors[0]}</p>
    </div>
  );
};

export default WorkspaceName;
