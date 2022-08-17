import "./card-details.css";
import { useSelector, useDispatch } from "react-redux";
import { updateCard } from "../../store/cards";
import { useState } from "react";
import { getAllUsers } from "../../store/users";
import { LabelDropDown, CardDescription, MemberDropdown, ProfileImage } from "../../Components";
import { useWorkspace } from "../../context/workspace-context";
import { useEffect } from "react";

const CardDetails = ({ props }) => {
  const users = useSelector((state) => state.users);
  const {
    card,
    setShowModal,
    labelState,
    setLabelState,
    memberState,
    setMemberState,
    members,
  } = props;

  const { currentWorkspace } = useWorkspace();
  let workspaceLabels = useSelector(
    (state) => state.workspaces[currentWorkspace].labels
  );
  workspaceLabels = JSON.parse(workspaceLabels);
  const { name, description, image, labels, list_id } = card;
  const listTitle = useSelector((state) => state.lists[list_id].title);
  const [showDrop, setShowDrop] = useState(false);
  const [showMemberDrop, setShowMemberDrop] = useState(false);

  return (
    <div className="card-details__container">
      <div className="card-details__header-container">
        <div className="card-details__header">
          <span className="material-symbols-outlined card-details__icon">
            space_dashboard
          </span>
          <p className="card-details__header-text">{name}</p>
        </div>
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
          edit_note
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
      <p className="card-details__label-text">Members</p>
      <div className="card-details__label-container">
        {memberState &&
          memberState.map((member, i) => (
            <div key={member.id} className="member">
              <ProfileImage user={users[member]} size={'2em'} />
              <p className="member__text">{users[member].firstName}</p>
            </div>
          ))}
        <span
          className="material-symbols-outlined add__label"
          onClick={() => setShowMemberDrop((prev) => !prev)}
        >
          edit_note
        </span>
        {showMemberDrop && (
          <MemberDropdown
            props={{
              card,
              setShowMemberDrop,
              memberState,
              setMemberState,
            }}
          />
        )}
      </div>
      <CardDescription props={{ card }} />
    </div>
  );
};

export default CardDetails;
