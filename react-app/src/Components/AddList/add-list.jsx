import "./add-list.css";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createList } from "../../store/lists";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const AddList = ({ props }) => {
  const { showAdd, setShowAdd, workspaceId } = props;
  const dispatch = useDispatch();
  const focusRef = useRef(null);
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);
  const [titleLength, setTitleLength] = useState(title.length > 249);

  useEffect(() => {
    if (showAdd) focusRef.current.focus();
  }, [showAdd]);

  useEffect(() => {
    const validationErrors = [];
    if (title.length > 249)
      validationErrors.push("List titles must be 250 characters or less");
    setTitleLength(title.length > 248);
    console.log("tititle lenght", titleLength);
    setErrors(validationErrors);
  }, [title, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: title.trim(),
      workspace_id: workspaceId,
    };

    let newList;
    try {
      newList = await dispatch(createList(payload, workspaceId));
    } catch (error) {
      alert(error);
    }

    if (newList) {
      setTitle("");
      setShowAdd(false);
    }
  };

  return (
    <>
      <div className="add-list__form">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter a list title..."
            className="add-list__input"
            onChange={(e) => setTitle(e.target.value)}
            ref={focusRef}
            maxLength={250}
          />
          <div className="add-list__buttons">
            <button
              className={
                errors[0] || !title.trim().length
                  ? "disabled__btn"
                  : "add-list__submit"
              }
              disabled={errors[0] || !title.length}
            >
              Add list
            </button>
            <button
              className="add-list__cancel"
              onClick={() => setShowAdd(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <CSSTransition
              in={titleLength}
              timeout={1000}
              classNames="list-transition"
            >
              <div className="error__container-add-list">
                <p className="error__text-add_list">{errors[0]}</p>
              </div>
            </CSSTransition>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddList;
