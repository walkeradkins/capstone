import "./card-header.css";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { EditCardInput, CardDetails } from "../../Components";
import { Draggable } from "react-beautiful-dnd";
import { Modal } from "../../context/modal";
import { useWorkspace } from "../../context/workspace-context";
import { useLabel } from "../../context/label-context";

const CardHeader = ({ props }) => {
  const { card, setItem, index, setEditItem } = props;
  const { labels } = card;
  const { currentWorkspace } = useWorkspace();
  const { showLabel, setShowLabel } = useLabel();
  let workspaceLabels = useSelector(
    (state) => state.workspaces[currentWorkspace]
  )["labels"];
  workspaceLabels = JSON.parse(workspaceLabels);
  const [display, setDisplay] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showText, setShowText] = useState(true);
  const [position, setPosition] = useState({});
  const posRef = useRef();

  let labelsArray;
  if (labels) {
    labelsArray = JSON.parse(labels);
  }

  const handleEdit = (e) => {
    e.stopPropagation();
    setDisplay(false);
    setEdit(true);
  };

  const toggleText = (e) => {
    e.stopPropagation();
    setShowLabel(prev => !prev);
  }

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
    <>
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
            onClick={() => setShowModal(true)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {labels && (
              <div className='small__label-container'>
                {labelsArray.map((label) => (
                  <div
                    className="small__label"
                    style={{
                      backgroundColor: `${workspaceLabels[label].color}`,
                    }}
                    key={workspaceLabels[label].color}
                    onClick={toggleText}
                  >
                    {showLabel && <p className="small__label-text">
                      {workspaceLabels[label].text}
                    </p>}
                  </div>
                ))}
              </div>
            )}
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
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CardDetails props={{ card, setShowModal }} />
        </Modal>
      )}
    </>
  );
};

export default CardHeader;
