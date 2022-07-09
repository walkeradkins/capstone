import "./card-header.css";
import { useState } from "react";
import EditCardInput from "../EditCardInput/edit-card-input";

const CardHeader = ({ card }) => {
  const [display, setDisplay] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleEdit = (e) => {
    e.stopPropagation();
    setDisplay(false);
    setEdit(true);
  };

  return (
    <div
      className="card__container"
      key={card.id}
      onMouseEnter={(e) => setDisplay(true)}
      onMouseLeave={(e) => setDisplay(false)}
    >
      <div className="card__title">{card.name}</div>
      <span
        className={
          display
            ? "material-symbols-outlined card__edit-btn"
            : "card__edit-btn-hidden"
        }
        onClick={handleEdit}
      >
        edit
      </span>
      {edit && (
        <div className="editcard__input-wrapper">
            <div className="editcard-background" onClick={() => setEdit(false)}/>
            <EditCardInput card={card} />
        </div>
      )}
    </div>
  );
};

export default CardHeader;
