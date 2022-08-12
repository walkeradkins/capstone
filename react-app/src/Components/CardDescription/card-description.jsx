import "./card-description.css";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { updateCard } from "../../store/cards";

const CardDescription = ({ props }) => {
  const focusRef = useRef();
  const dispatch = useDispatch();
  const { card } = props;
  const { description } = card;
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(description);

  const handleSubmit = async () => {
    const payload = {
      description: content,
    };
    await dispatch(updateCard(payload, card.id)).then((res) =>
      console.log(res)
    );
  };

  const trueEdit = (e) => {
    const idCheck = +e.target.className.split(" ")[0];
    if (card.id !== idCheck) {
      e.stopPropagation();
    }

    e.target.select();
    if (edit) return;
    setEdit(true);
  };

  return (
    <>
      <div className="card-desc__header-container">
        <span className="material-symbols-outlined card-details__icon">edit_note</span>
        <p className="card-desc__header-text">Description</p>
        {content && (
          <button className="edit-card__cancel" onClick={() => setEdit(true)}>
            Edit
          </button>
        )}
      </div>
      <TextareaAutosize
        id="listname__input"
        className={
          edit ? `input__active-desc` : `${card.id} input__inactive-desc`
        }
        value={content}
        style={
          !content && !edit
            ? { backgroundColor: "rgba(221, 221, 221, 0.6)" }
            : null
        }
        placeholder={content ? "" : "Add a more detailed description..."}
        spellCheck={false}
        onClick={trueEdit}
        maxLength={1000}
        // onKeyPress={handleKeyPress}
        minRows={edit ? 4 : 2}
        ref={focusRef}
        onChange={(e) => setContent(e.target.value)}
      />
      {edit && (
        <div className="card-details__button-container">
          <button className="edit-card__submit" onClick={handleSubmit}>
            Save
          </button>
          <button className="edit-card__cancel" onClick={() => setEdit(false)}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default CardDescription;
