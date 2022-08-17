import "./card-header.css";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCard } from "../../store/cards";
import { EditCardInput, CardDetails, ProfileImage } from "../../Components";
import { Draggable } from "react-beautiful-dnd";
import { Modal } from "../../context/modal";
import { useWorkspace } from "../../context/workspace-context";
import { useLabel } from "../../context/label-context";
import ReactTooltip from "react-tooltip";

const CardHeader = ({ props }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const { card, setItem, index, setEditItem } = props;
  const { currentWorkspace } = useWorkspace();
  const { showLabel, setShowLabel } = useLabel();
  const [labelState, setLabelState] = useState(
    card && card.labels ? JSON.parse(card.labels) : null
  );
  let workspace = useSelector((state) => state.workspaces[currentWorkspace]);
  const [memberState, setMemberState] = useState(
    card && card.members ? JSON.parse(card.members) : null
  );
  const [display, setDisplay] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showText, setShowText] = useState(true);
  const [position, setPosition] = useState({});
  const posRef = useRef();

  const handleSubmit = async () => {
    setShowModal(false);
    let data;
    let memberData;

    if (!labelState?.length) data = null;
    else data = JSON.stringify(labelState);

    if (!memberState?.length) memberData = null;
    else memberData = JSON.stringify(memberState);

    const payload = {
      labels: data,
      members: memberData,
    };
    await dispatch(updateCard(payload, card.id));
  };

  const closeEdit = (e) => {
    e.stopPropagation();
    setShowModal(false);
    setEdit(false);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setDisplay(false);
    setEdit(true);
  };

  const toggleText = (e) => {
    e.stopPropagation();
    setShowLabel((prev) => !prev);
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
  if (!workspace) return null;
  if (!Object.keys(users).length) return null;

  const { members } = workspace;
  let labelsArray;
  let membersArray;

  if (card.labels) {
    labelsArray = JSON.parse(card.labels);
  }

  if (card.members) {
    membersArray = JSON.parse(card.members);
  }

  let workspaceLabels = workspace.labels;
  workspaceLabels = JSON.parse(workspaceLabels);
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
            {card.labels && (
              <div className="small__label-container">
                {labelsArray.map((label) => (
                  <div
                    className="small__label"
                    style={{
                      backgroundColor: `${workspaceLabels[label].color}`,
                    }}
                    key={workspaceLabels[label].color}
                    onClick={toggleText}
                  >
                    {showLabel && (
                      <p className="small__label-text">
                        {workspaceLabels[label].text}
                      </p>
                    )}
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
            <div className="card__header-bottom">
              {card.description && (
                <>
                  <ReactTooltip
                    id="desc__tip"
                    place="right"
                    effect="solid"
                    backgroundColor="rgba(48,48,48,0.75)"
                    delayShow={500}
                  >
                    This card has a description
                  </ReactTooltip>
                  <span
                    className="material-symbols-outlined card-desc__icon"
                    data-tip
                    data-for="desc__tip"
                  >
                    feed
                  </span>
                </>
              )}
              {card.members && (
                <ul className="card__members" dir="rtl">
                  {membersArray.map((id) => (
                    <li key={id}>
                      <div data-tip data-for={`user__tip${id}`}>
                        <ProfileImage
                          user={users[id]}
                          size={"2.5em"}
                          circle={true}
                        />
                      </div>
                      <ReactTooltip
                        id={`user__tip${id}`}
                        place="top"
                        effect="solid"
                        backgroundColor="rgba(48,48,48)"
                        delayShow={250}
                      >
                        {users[id].firstName} {users[id].lastName}
                      </ReactTooltip>
                    </li>
                  ))}
                </ul>
              )}
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
                <div className="editcard-background" onClick={closeEdit} />
                <EditCardInput
                  props={{ card, setEdit, setItem, setEditItem, position }}
                />
              </>
            )}
            {provided.placeholder}
          </div>
        )}
      </Draggable>
      {showModal && !edit && (
        <Modal onClose={handleSubmit}>
          <CardDetails
            props={{
              card,
              setShowModal,
              labelState,
              setLabelState,
              memberState,
              setMemberState,
              members,
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default CardHeader;
