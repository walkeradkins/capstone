import "./card-header.css";
import { useState, useEffect, useRef } from "react";
import EditCardInput from "../EditCardInput/edit-card-input";
import { Draggable } from "react-beautiful-dnd";

const CardHeader = ({ props }) => {
  const { card, setItem, index, setEditItem } = props;
  const [display, setDisplay] = useState(false);
  const [edit, setEdit] = useState(false);
  const [position, setPosition] = useState({});
  const posRef = useRef();

  const handleEdit = (e) => {
    e.stopPropagation();
    setDisplay(false);
    setEdit(true);
  };

  useEffect(() => {
    if (posRef.current) {
      const { top, bottom, left, right } =
        posRef.current.getBoundingClientRect();
      const positions = { top, bottom, left, right };
      setPosition(positions);
    }
    if (edit) {
      document.body.style.overflowX = "hidden";
      return () => (document.body.style.overflowX = "overlay");
    }
  }, [edit]);

  useEffect(() => {
    return () => setItem("");
  }, []);

  if (!card) return null;

  return (
    <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={
            snapshot.isDragging
              ? "card__container drag__over"
              : "card__container"
          }
          onMouseEnter={(e) => setDisplay(true)}
          onMouseLeave={(e) => setDisplay(false)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.image && (
            <figure
              className="card__image"
              style={{ backgroundImage: `url(${card.image})` }}
            />
          )}
          <div className="card__title" ref={posRef}>
            {card.name}
          </div>
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
            <>
              <div
                className="editcard-background"
                onClick={() => setEdit(false)}
              />
              <EditCardInput
                props={{ card, setEdit, setItem, setEditItem, position }}
              />
            </>
          )}
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default CardHeader;
