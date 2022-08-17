import "./member-dropdown.css";
import { useWorkspace } from "../../context/workspace-context";
import { useSelector } from "react-redux";
import { ProfileImage } from "../../Components";
import { useState } from "react";

const MemberDropdown = ({ props }) => {
  const users = useSelector((state) => state.users);
  const { currentWorkspace } = useWorkspace();
  let workspaceMembers = useSelector(
    (state) => state.workspaces[currentWorkspace].members
  );
  const { card, setShowMemberDrop, memberState, setMemberState } = props;
  let { members } = card;

  if (members) members = JSON.parse(members);

  const changeTempState = async (id) => {
    if (!memberState) setMemberState([id]);
    else {
      const newState = [...memberState];
      if (newState.includes(id)) {
        const ind = newState.indexOf(id);
        newState.splice(ind, 1);
        setMemberState(newState);
      } else setMemberState([...memberState, id]);
    }
  };

  return (
    <>
      <div className="member-select__container">
        <div className="member-select__header">
          <p className="member-select__header-text">Members</p>
          <span
            className="material-symbols-outlined exit__member"
            onClick={() => setShowMemberDrop(false)}
          >
            close
          </span>
        </div>
        <div className="underline" />
        <ul className="members__container">
          {workspaceMembers.map((id, i) => (
            <li
              className="member__span"
              key={id}
              onClick={() => changeTempState(id)}
            >
              <div className="member__select">
                <div className='member__name'>
                  <ProfileImage user={users[id]} size="2.5em" />
                  <p className="member__select-text">
                    {users[id].firstName} {users[id].lastName}
                  </p>
                </div>
                  {memberState && memberState.includes(id) && (
                    <span className="material-symbols-outlined member__check">
                      done
                    </span>
                  )}
              </div>
              <div className="underline" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MemberDropdown;
