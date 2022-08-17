import "./more-dropdown.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkspace, updateWorkspace } from "../../store/workspaces";
import { useHistory, useParams } from "react-router-dom";
import { ProfileImage } from "../../Components";

const MoreDropdown = ({ board, user, workspaces, setLeaveBoard }) => {
  const users = useSelector((state) => state.users);
  const { workspaceId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    if (toggleDropdown) return;
    setToggleDropdown(true);
  };

  const handleLeave = async (e) => {
    e.preventDefault();
    const payload = {
      removed: [user.id],
    };

    await dispatch(updateWorkspace(payload, board.id)).then((data) => {
      setLeaveBoard(data.id);
      if (data.id === +workspaceId) {
        history.push("/");
      }
    });
  };

  useEffect(() => {
    if (!toggleDropdown) return;

    const closeMenu = () => {
      setToggleDropdown(false);
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [toggleDropdown]);

  const handleDelete = async (e) => {
    e.preventDefault();

    await dispatch(deleteWorkspace(board.id)).then((data) => {
      if (data.id === +workspaceId) {
        history.push("/");
      }
    });
  };

  return (
    <>
      <div className="more__container" onClick={handleToggle}>
        <span className="material-symbols-outlined">more_horiz</span>
      </div>
      {toggleDropdown && user.id === board.ownerId && (
        <div className="more__dropdown" onClick={handleDelete}>
          Delete board...
        </div>
      )}
      {toggleDropdown && user.id !== board.ownerId && (
        <div className="board-owner__dropdown">
          <div className="board-owner__dropdown-header">
            <ProfileImage
              user={users[board.ownerId]}
              size={"2em"}
              circle={false}
            />
            <p className>
              This board was created by {users[board.ownerId].firstName}{" "}
              {users[board.ownerId].lastName}
            </p>
          </div>
          <div className="underline" />
          <div className="board-owner__dropdown-bottom">
            <p>Not interested in being part of this board?</p>
            <button onClick={handleLeave}>Leave board</button>
          </div>
        </div>
      )}
    </>
  );
};

export default MoreDropdown;
