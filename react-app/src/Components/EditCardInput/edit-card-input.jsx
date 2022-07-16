import "./edit-card-input.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCard, deleteCard } from "../../store/cards";
import TextareaAutosize from "react-textarea-autosize";
import { CSSTransition } from "react-transition-group";

const EditCardInput = ({ props }) => {
  const { card, setEdit, setItem, setEditItem, position, edit } = props;
  const {top, bottom, left, right} = position;
  const dispatch = useDispatch();
  const focusRef = useRef(null);
  const [content, setContent] = useState(card.name);
  const [errors, setErrors] = useState([]);
  const [errorCheck, setErrorCheck] = useState(false);

  const errorObj = {
    err1: "Please keep card names to 250 characters or less",
    err2: "Please provide a name for your card",
  };

  useEffect(() => {
    console.log('top', top);
    console.log('left', left);
  }, [edit]);

  useEffect(() => {
    const validationErrors = [];
    if (content.length > 249) {
      validationErrors.push("err1");
    }

    if (content.trim().length < 1) {
      validationErrors.push("err2");
    }

    setErrorCheck(validationErrors.length > 0);
    setErrors(validationErrors);
  }, [content, dispatch]);

  useEffect(() => {
    if (card) focusRef.current.focus();
  }, [card]);

  const handleSubmit = async () => {
    if (errors.length) return;
    const payload = {
      name: content.trim(),
    };

    let updatedCard;
    try {
      updatedCard = await dispatch(updateCard(payload, card.id));
    } catch (error) {
      alert(error);
    }

    if (updatedCard) {
      setEdit(false);
      setEditItem(updatedCard);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (content.trim().length) {
        handleSubmit();
      }
    }
  };

  const handleDelete = async () => {
    let deletedCard;
    try {
      deletedCard = await dispatch(deleteCard(card.id));
    } catch (error) {
      alert(error);
    }
    if (deletedCard) {
      setItem(deletedCard);
      setEdit(false);
      setEditItem(deletedCard);
    }
  };

  const styles = {
    minWidth: '255px',
    maxWidth: '255px',
    height: '10em',
    backgroundColor: 'transparent',
    position: 'fixed',
    top: `${Math.floor(top) - 7}px`,
    left: `${left - 9}px`,
  }

  console.log('styles', styles)

  const handleFocus = (e) => e.target.select();
  // console.log('posotio', position)
  return (
    <div className="edit-card__input-wrapper">
      <div
      className="edit-card__input-container"
      style={styles}
      >
        <TextareaAutosize
          className="edit-card__input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          minRows={5}
          maxLength={250}
          ref={focusRef}
        />
        <div className="edit-card__error-wrapper">
          <CSSTransition
            in={errorCheck}
            timeout={500}
            classNames="list-transition"
            unmountOnExit
          >
            <div className="error__container card__name-edit">
              <p className="error__text error__text-add-card">
                {errors[0] === "err1" ? errorObj.err1 : errorObj.err2}
              </p>
            </div>
          </CSSTransition>
        </div>
        <div className="edit-card__buttons">
          <button
            className={!errors[0] ? "edit-card__submit" : "disabled__btn"}
            onClick={handleSubmit}
            disabled={
              errors[0] ||
              !content.trim().length ||
              content.trim().length === 250
            }
          >
            Save
          </button>
        </div>
        <div className="edit-card__delete" onClick={handleDelete}>
          <span className="material-symbols-outlined edit-card__delete-icon">
            delete
          </span>
          <p className="edit-card__delete-text">Delete</p>
        </div>
      </div>
    </div>
  );
};

export default EditCardInput;
