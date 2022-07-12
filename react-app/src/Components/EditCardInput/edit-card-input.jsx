import "./edit-card-input.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCard, deleteCard } from "../../store/cards";
import TextareaAutosize from 'react-textarea-autosize'

const EditCardInput = ({ props }) => {
  const { card, setEdit, setItem, setEditItem } = props;
  const dispatch = useDispatch();
  const focusRef = useRef(null);
  const [content, setContent] = useState(card.name);

  useEffect(() => {
    if (card) focusRef.current.focus();
  }, [card]);

  const handleSubmit = async () => {
    const payload = {
      name: content.trim(),
    };

    let updatedCard;
    console.log("card id", card.id);
    try {
      updatedCard = await dispatch(updateCard(payload, card.id));
    } catch (error) {
      alert(error);
    }

    if (updatedCard) {
      setEdit(false);
      setEditItem(updatedCard)
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit();
    }
  };

  const handleDelete = async () => {
    let deletedCard;
    try {
      deletedCard = await dispatch(deleteCard(card.id))
    } catch(error) {
      alert(error)
    }
    if (deletedCard) {
      setItem(deletedCard)
      setEdit(false);
      setEditItem(deletedCard);
    }
  };

  const handleFocus = (e) => e.target.select();

  return (
    <div className="edit-card__input-container">
      <TextareaAutosize
        className="edit-card__input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={handleFocus}
        minRows={5}
        ref={focusRef}
      />
      <div className="edit-card__buttons">
        <button className="edit-card__submit" onClick={handleSubmit}>
          Save
        </button>
        <div className="edit-card__delete" onClick={handleDelete}>
          <span className="material-symbols-outlined edit-card__delete-icon">delete</span>
          <p className='edit-card__delete-text'>Delete</p>
        </div>
      </div>
    </div>
  );
};

export default EditCardInput;
