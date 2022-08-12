import "./card-details.css";
import { useSelector, useDispatch } from "react-redux";
import { updateCard } from "../../store/cards";
import { useState } from "react";
import { LabelDropDown } from "../../Components";
import { useWorkspace } from "../../context/workspace-context";

const CardDetails = ({ props }) => {
  const { card, setShowModal } = props;
  const dispatch = useDispatch();
  const [labelState, setLabelState] = useState(JSON.parse(card.labels));
  const { currentWorkspace } = useWorkspace();
  let workspaceLabels = useSelector(
    (state) => state.workspaces[currentWorkspace].labels
  );

  workspaceLabels = JSON.parse(workspaceLabels);
  const { name, description, image, labels, list_id } = card;
  const listTitle = useSelector((state) => state.lists[list_id].title);
  const [showDrop, setShowDrop] = useState(false);

  const handleSubmit = async () => {
    let data;
    if (!labelState.length) data = null;
    else data = JSON.stringify(labelState);
    const payload = {
      labels: data,
    };
    await dispatch(updateCard(payload, card.id)).then((res) =>
      console.log(res)
    );
  };

  return (
    <div className="card-details__container">
      <div className="card-details__header-container">
        <p className="card-details__header">
          <span className="material-symbols-outlined">space_dashboard</span>
          {name}
        </p>
        <p className="card-details__subheader">in list {listTitle}</p>
      </div>
      <p className="card-details__label-text">Labels</p>
      <div className="card-details__label-container">
        {labelState &&
          labelState.map((label, i) => (
            <div
              key={i}
              className="label"
              style={{ backgroundColor: `${workspaceLabels[label].color}` }}
            >
              <p className="label__text">{workspaceLabels[label].text}</p>
            </div>
          ))}
        <span
          className="material-symbols-outlined add__label"
          onClick={() => setShowDrop((prev) => !prev)}
        >
          add
        </span>
        {showDrop && (
          <LabelDropDown
            props={{
              card,
              setShowDrop,
              labelState,
              setLabelState,
            }}
          />
        )}
      </div>
      <button className="edit-card__submit" onClick={handleSubmit}>
        Save Labels
      </button>
      <div className="card-details__header-container">
        <p className="card-details__header">
          <span className="material-symbols-outlined">edit_note</span>
          Description
        </p>
      </div>
    </div>
  );
};

export default CardDetails;
