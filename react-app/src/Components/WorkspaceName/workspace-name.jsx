import "./workspace-name.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateWorkspace } from "../../store/workspaces";
import AutoSizeInput from 'react-input-autosize'

const WorkspaceName = ({ workspace }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState(false);

  const trueEdit = (e) => {
    e.stopPropagation();
    e.target.select();
    if (edit) return;
    setEdit(true);
  };

  useEffect(() => {
    setContent(name)
  }, [dispatch])

  useEffect(() => {
    if (!edit) return;

    const closeEdit = (e) => {
      const errors = [];
      if (content.length > 49) {
        errors.push("Please keep board name to under 50 characters");
      }
      setErrors(errors);

      const payload = {
        name: content.trim(),
      };

      if (!errors.length) {
        let updatedName;
        const updateData = async () => {
          try {
            updatedName = await dispatch(updateWorkspace(payload, id));
          } catch (error) {
            alert(error);
          }
        };

        updateData();
        setEdit(false);
      }
    };

    document.addEventListener("click", closeEdit);
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        document.getElementById('input__workspacename').blur();
        return closeEdit(e);
      }
    });
    return () => document.removeEventListener("click", closeEdit);
  }, [edit, content]);

  if (!workspace) return null;
  const { name, id } = workspace;

  const inputStylesActive = {
    // margin: '.5em 2em',
    backgroundColor: 'white',
    border: '2px solid rgb(0, 81, 255)',
    borderRadius: '.25em',
    padding: '.25em',
    textAlign: 'center',
    cursor: 'text',
    fontSize: '1.25em',
    fontWeight: 'bold',
    resize: 'none',
    userSelect: 'all'
  }

  const inputStylesInactive = {
    backgroundColor: 'transparent',
    color: 'black',
    borderRadius: '1em',
    border: 'transparent 2px solid',
    outline: 'none',
    transition: '0.2s',
    cursor: 'pointer',
    padding: '.25em',
    textAlign: 'center',
    color: 'white',
    fontSize: '1.25em',
    fontWeight: 'bold',
    // margin: '.5em 1em',
  }

  return (
    <div className='workspace-input__wrapper'>
      <p>{errors[0]}</p>
      <AutoSizeInput
        id='input__workspacename'
        className={edit ? "input__active" : "input__inactive"}
        value={content}
        onClick={trueEdit}
        maxLength={50}
        inputStyle={edit ? inputStylesActive : inputStylesInactive}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

export default WorkspaceName;
