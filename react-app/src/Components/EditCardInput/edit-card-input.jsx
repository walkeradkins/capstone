import "./edit-card-input.css";
import { useState, useRef, useEffect } from "react";

const EditCardInput = ({ card }) => {
  const focusRef = useRef(null);
  const [content, setContent] = useState(card.name);
  const [rowValue, setRowValue] = useState(5);
  const [spaceCheck, setSpaceCheck] = useState(content.trim().length);
  const [rows, setRows] = useState(
    content.length < 175 ? 5 : content.length / 35
  );

  useEffect(() => {
    if (card) focusRef.current.focus();
  }, [card]);

  const setAdd = () => {};
  const handleSubmit = () => {};
  const handleKeyPress = () => {};
  const handleClick = () => {};
  const handleFocus = (e) => e.target.select();

  const handleChange = (e) => {
    setContent(e.target.value);

    setSpaceCheck(e.target.value.trim().length);
    let trows;
    let value = e.target.value.length;
    if (value < 175) {
      setRows(5)
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
        onClick={handleClick}
        className="edit-card__input"
        placeholder="Enter a title for this card..."
        value={content}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onFocus={handleFocus}
        rows={rows}
        ref={focusRef}
      />
      <div className="add-card__buttons">
        <button className="add-card__submit" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditCardInput;
