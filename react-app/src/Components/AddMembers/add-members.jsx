import "./add-members.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { ProfileImage } from "../../Components";
import { updateWorkspace } from "../../store/workspaces";

const AddMembers = ({ props }) => {
  const { users, workspace, setShowModal, user } = props;
  const dispatch = useDispatch();
  const usersCopy = { ...users };
  const { members } = workspace;
  const [memberList, setMemberList] = useState([]);
  const [membersCopy, setMembersCopy] = useState([...members]);
  const [removed, setRemoved] = useState([]);
  const animatedComponents = makeAnimated();

  for (let i in members) {
    delete usersCopy[members[i]];
  }

  const handleSubmit = async () => {

    const payload = {
      members: memberList,
      removed
    };

    await dispatch(updateWorkspace(payload, workspace.id)).then(data => {
      if (data) return setShowModal(false)
    })
  };

  const handleRemove = (id) => {
    // add to removed array
    const removedArr = [...removed];
    removedArr.push(id);
    setRemoved(removedArr);

    // change state to reflect removed
    const copy = [...membersCopy];
    const index = copy.indexOf(id);
    copy.splice(index, 1);
    setMembersCopy(copy)
  };

  const otherUsersArray = Object.values(usersCopy).map((user) => {
    return {
      value: user.id,
      label: (
        <div className="current_member-user">
          <ProfileImage user={user} size={"2em"} />
          <p className="current__member-name">
            {user.firstName} {user.lastName}
          </p>
        </div>
      ),
    };
  });

  // if (!Object.keys(users).length) return null;
  // if (!user) return null;

  return (
    <div className="add-members__container">
      <div className="add-members__header">
        <p>Manage members</p>
        <span
          className="material-symbols-outlined remove__member"
          onClick={() => setShowModal(false)}
        >
          close
        </span>
      </div>
      <div className="underline" />
      <ul className="add-members__current">
        {membersCopy.map((i) => (
          <li key={i}>
            <div className="current__member">
              <div className="current_member-user">
                <ProfileImage user={users[i]} size={"2em"} />
                {users[i].id === user.id && (
                  <p className="current__member-name">
                    {users[i].firstName} {users[i].lastName} (you)
                  </p>
                )}
                {users[i].id !== user.id && (
                  <p className="current__member-name">
                    {users[i].firstName} {users[i].lastName}
                  </p>
                )}
              </div>
              {users[i].id !== user.id && (
                <span
                  className="material-symbols-outlined remove__member"
                  onClick={() => handleRemove(users[i].id)}
                >
                  close
                </span>
              )}
            </div>
            <div className="underline" />
          </li>
        ))}
      </ul>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        onChange={(choice) => setMemberList(choice.map((ele) => ele.value))}
        isMulti
        options={otherUsersArray}
      />
      <button className="add-card__submit" onClick={handleSubmit}>
        Save Changes
      </button>
    </div>
  );
};

export default AddMembers;
