import "./add-list.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createList } from "../../store/lists";

const AddList = ({ setShowAdd, workspaceId }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

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
      console.log("success!");
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
        />
        <div className="add-list__buttons">
          <button className="add-list__submit">Add list</button>
          <button
            className="add-list__cancel"
            onClick={() => setShowAdd(false)}
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddList;
