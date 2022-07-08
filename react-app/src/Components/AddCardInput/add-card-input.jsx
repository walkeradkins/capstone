import "./add-card-input.css";
import { useRef, useEffect, useState } from "react";

const AddCardInput = ({ setAdd, add, list }) => {
  const focusRef = useRef(null);
  const [content, setContent] = useState('')

  useEffect(() => {
    focusRef.current.focus();
  }, [add]);

  const handleClick = (e) => {
    e.stopPropagation();
    setAdd(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(list.id)
    const payload = {
      list_id: list.id
    }
  }

  return (
    <div className="addcard__input-container">
      <textarea
        onClick={handleClick}
        className="addcard__input"
        placeholder="Enter a title for this card..."
        dataAutosize={true}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        ref={focusRef}
      />
      <div className="add-card__buttons">
        <button className="add-card__submit" onClick={handleSubmit}>Add Card</button>
        <button className="add-card__cancel"onClick={() => setAdd(false)}>
          <span className="material-symbols-outlined add-card__cancel-icon">close</span>
        </button>
      </div>
    </div>
  );
};

export default AddCardInput;
