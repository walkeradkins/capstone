import "./add-members.css";
import Select from 'react-select';
import { ProfileImage } from "../../Components";

const AddMembers = ({ props }) => {
  const { users, workspace, setShowModal, user } = props;
  const { members } = workspace;

  return (
    <div className="add-members__container">
      <div className="add-members__header">
        <p>Add members</p>
        <span
          className="material-symbols-outlined"
          onClick={() => setShowModal(false)}
        >
          close
        </span>
      </div>
      <div className="underline" />
      <ul className="add-members__current">
        {members.map((i) => (
          <li key={i}>
            <div className="current__member">
              <div className='current_member-user'>
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
                <span className="material-symbols-outlined">close</span>
              )}
            </div>
            <div className="underline" />
          </li>
        ))}
      </ul>
      <Select />
    </div>
  );
};

export default AddMembers;
