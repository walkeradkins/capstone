import "./add-card-input.css";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useWorkspace } from "../../context/workspace-context";
import { createCard } from "../../store/cards";

const AddCardInput = ({ props }) => {
  const { list, setItem } = props;
  const dispatch = useDispatch();
  const { currentWorkspace } = useWorkspace();
  const focusRef = useRef(null);
  const [content, setContent] = useState("");
  const [add, setAdd] = useState(false);
  const [rows, setRows] = useState(2);
  const [rowValue, setRowValue] = useState(2);
  const [spaceCheck, setSpaceCheck] = useState(content.trim().length);
  const [errors, setErrors] = useState([]);

  const showInput = () => {
    if (add) return;
    setAdd(true);
  };

  useEffect(() => {
    const validationErrors = [];
    if (content.length > 248)
      validationErrors.push("Card title cannot exceed 250 characters");
    setErrors(validationErrors);
  }, [content, dispatch]);

  useEffect(() => {
    if (!add) return;

    const hideInput = () => {
      setAdd(false);
    };
    document.addEventListener("click", hideInput);
    return () => document.removeEventListener("click", hideInput);
  }, [add]);

  useEffect(() => {
    if (add) focusRef.current.focus();
  }, [add]);

  const handleClick = (e) => {
    e.stopPropagation();
    setAdd(true);
  };

  const handleSubmit = async (e) => {
    let cardIndex;
    if (!list.cards.length) cardIndex = 0;
    else cardIndex = list.cards.length;

    if (errors.length) return;

    const payload = {
      list_id: list.id,
      workspace_id: currentWorkspace,
      name: content,
      index: cardIndex,
      created_at: new Date(),
    };

    let newCard;
    try {
      newCard = await dispatch(createCard(payload, list.id));
    } catch (error) {
      alert(error);
    }
    if (newCard) {
      setAdd(true);
      setContent("");
      setItem(newCard.id);
      setRows(2);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
    setSpaceCheck(e.target.value.trim().length);
    let trows;
    let value = e.target.value.length;
    if (value < 60) {
      setRows(2);
      return;
    }
    if (value > 50) {
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

  const handleCancel = () => {
    setAdd(false);
    setContent("");
    setRows(2);
  };

  return (
    <>
      {!add && (
        <div className="list__add-card-container" onClick={showInput}>
          <span className="material-symbols-outlined">add</span>
          <div className="list__new-card">Add a card</div>
        </div>
      )}
      {add && (
        <div className="addcard__input-container">
          {errors[0] && (
            <div className="error__container">
              <p className="error__text error__text-add-card">{errors[0]}</p>
            </div>
          )}
          <textarea
            onClick={handleClick}
            className="addcard__input"
            placeholder="Enter a title for this card..."
            value={content}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            rows={rows}
            minLength={1}
            maxLength={250}
            ref={focusRef}
          />
          <div className="add-card__buttons">
            <button
              className={errors[0] || !content.length ? "disabled__btn" : "add-card__submit"}
              onClick={handleSubmit}
              disabled={errors[0] || !content.length}
            >
              {console.log(errors[0])}
              Add Card
            </button>
            <button className="add-card__cancel" onClick={handleCancel}>
              <span className="material-symbols-outlined add-card__cancel-icon">
                close
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCardInput;
