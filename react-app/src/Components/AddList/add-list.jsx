import "./add-list.css";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createList } from "../../store/lists";

const AddList = ({ props }) => {
  const { showAdd, setShowAdd, workspaceId } = props
  const dispatch = useDispatch();
  const focusRef = useRef(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (showAdd) focusRef.current.focus();
    return focusRef.current = null;
  }, [showAdd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      workspace_id: workspaceId,
    };

    let newList;
    try {
      newList = await dispatch(createList(payload, workspaceId));
    } catch (error) {
      alert(error);
    }

    if (newList) {
      setTitle('')
      setShowAdd(false)
    }
  };

  return (
    <div className="add-list__form">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter a list title..."
          className="add-list__input"
          onChange={(e) => setTitle(e.target.value)}
          ref={focusRef}
        />
        <div className="add-list__buttons">
          <button className="add-list__submit">Add list</button>
          <button
            className="add-list__cancel"
            onClick={() => setShowAdd(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddList;
