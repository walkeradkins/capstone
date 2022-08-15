import "./add-card-input.css";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useWorkspace } from "../../context/workspace-context";
import { createCard } from "../../store/cards";
import TextareaAutosize from "react-textarea-autosize";
import { CSSTransition } from "react-transition-group";
import { SquareLoader } from "react-spinners";
import ReactTooltip from "react-tooltip";

const AddCardInput = ({ props }) => {
  const { list, setItem, add, setAdd } = props;
  const dispatch = useDispatch();
  const { currentWorkspace } = useWorkspace();
  const focusRef = useRef(null);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [errorCheck, setErrorCheck] = useState(false);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const showInput = () => {
    if (add) return;
    setAdd(true);
  };

  useEffect(() => {
    const validationErrors = [];
    if (content.length > 249)
      validationErrors.push(
        "Please keep card titles to 250 characters or less"
      );
    setErrorCheck(content.length > 249);
    setErrors(validationErrors);
  }, [content, dispatch]);

  useEffect(() => {
    if (!add) return;

    const hideInput = () => {
      setAdd(false);
    };

    // document.addEventListener("click", hideInput);
    // return () => document.removeEventListener("click", hideInput);
  }, [add, setAdd]);

  useEffect(() => {
    if (add) {
      focusRef.current.focus();
    }
  }, [add]);

  const handleClick = (e) => {
    e.stopPropagation();
    setAdd(true);
  };

  const handleMouseEvent = (e) => {
    e.stopPropagation();
    focusRef.current.focus();
    handleSubmit();
  };

  const handleSubmit = async (e) => {
    let cardIndex;
    if (!list.cards.length) cardIndex = 0;
    else cardIndex = list.cards.length;
    if (errors.length) return;

    setImageLoading(true);
    const date = new Date().toISOString();

    const formData = new FormData();
    formData.append("list_id", list.id);
    formData.append("workspace_id", currentWorkspace);
    formData.append("name", content.trim());
    formData.append("index", cardIndex);
    formData.append("created_at", date);
    if (image) formData.append("image", image);

    let newCard;
    try {
      newCard = await dispatch(createCard(formData, list.id));
    } catch (error) {
      // alert(error);
    }
    if (newCard) {
      setAdd(true);
      setImageLoading(false);
      setContent("");
      setImage(null);
      setItem(newCard.id);
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

  const handleCancel = () => {
    setAdd(false);
    setContent("");
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setImage(file);
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
          <CSSTransition
            in={errorCheck}
            timeout={500}
            classNames="list-transition"
            unmountOnExit
          >
            <div className="error__container">
              <p className="error__text error__text-add-card">
                Please keep card titles to 250 characters or less
              </p>
            </div>
          </CSSTransition>
          <TextareaAutosize
            onClick={handleClick}
            className="addcard__input"
            placeholder="Enter a title for this card..."
            value={content}
            autoComplete="off"
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
            minRows={2}
            minLength={1}
            maxLength={250}
            ref={focusRef}
          />
          <div className="add-card__buttons">
            <div className="add-card__buttons-left">
              <button
                className={
                  errors[0] || !content.trim().length
                    ? "disabled__btn"
                    : "add-card__submit"
                }
                onClick={handleMouseEvent}
                disabled={errors[0] || !content.length}
              >
                Add Card
              </button>
              <button className="add-card__cancel" onClick={handleCancel}>
                <span className="material-symbols-outlined add-card__cancel-icon">
                  close
                </span>
              </button>
            </div>
            <div className="add-card__buttons-right">
              {imageLoading && (
                <SquareLoader color={"rgb(16, 255, 175)"} size={30} />
              )}
              {image && !imageLoading && (
                <span className="material-symbols-outlined add-card__buttons-check">
                  check_circle
                </span>
              )}
              {!imageLoading && (
                <div className="file__upload-choose">
                  <label htmlFor="file" className="file__upload-choose-text">
                    <span
                      className="material-symbols-outlined add-card__attach"
                      data-tip
                      data-for="image__tip"
                    >
                      image
                    </span>
                    <ReactTooltip
                      id="image__tip"
                      place="right"
                      effect="solid"
                      backgroundColor="rgba(48,48,48,0.9)"
                      delayShow={500}
                    >
                      Click to attach an image
                    </ReactTooltip>
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ visibility: "hidden" }}
                    accept="image/*"
                    onChange={handlePhoto}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCardInput;
