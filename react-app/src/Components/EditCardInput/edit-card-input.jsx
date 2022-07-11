import "./edit-card-input.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCard, deleteCard } from "../../store/cards";

const EditCardInput = ({ props }) => {
  const { card, setEdit, setItem, setEditItem } = props;
  const dispatch = useDispatch();
  const focusRef = useRef(null);
  const [content, setContent] = useState(card.name);
  const [rowValue, setRowValue] = useState(5);
  const [spaceCheck, setSpaceCheck] = useState(content.trim().length);
  const [rows, setRows] = useState(
    content.length < 175 ? 5 : content.length / 30
  );

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

  const handleChange = (e) => {
    setContent(e.target.value);
    setSpaceCheck(e.target.value.trim().length);
    let trows;
    let value = e.target.value.length;
    if (value < 175) {
      setRows(5);
      return;
    }
    if (value > 175) {
      trows = Math.ceil(value / 28);
      if (trows > rowValue) {
        setRows(rows + 1);
        setRowValue(trows);
      }
    }
    if (trows < rowValue) {
      setRows(Math.ceil(value / 28));
      setRowValue(trows);
      if (!trows) trows = 5;
    }
  };

  return (
    <div className="edit-card__input-container">
      <textarea
        className="edit-card__input"
        value={content}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onFocus={handleFocus}
        rows={rows}
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
