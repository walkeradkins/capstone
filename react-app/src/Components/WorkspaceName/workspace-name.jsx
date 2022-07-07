import "./workspace-name.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateWorkspace } from "../../store/workspaces";

const WorkspaceName = ({ workspace }) => {
  const dispatch = useDispatch();
  const { name, id } = workspace;
  const [content, setContent] = useState(name);
  const [edit, setEdit] = useState(false);

  const trueEdit = (e) => {
    e.stopPropagation();
    e.target.select();
    if (edit) return;
    setEdit(true);
  };

  useEffect(() => {
    if (!edit) return;

    const closeEdit = (e) => {

      const payload = {
        name: content.trim(),
      };

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
    };

    document.addEventListener("click", closeEdit);
    document.addEventListener("keypress", (e) => {
      if (e.key === 'Enter') return closeEdit(e);
    });
    return () => document.removeEventListener("click", closeEdit);

  }, [edit, content]);

  return (
    <input
      className={edit ? "input__active" : "input__inactive"}
      value={content}
      onClick={trueEdit}
      onChange={(e) => setContent(e.target.value)}
    />
  );
};

export default WorkspaceName;
