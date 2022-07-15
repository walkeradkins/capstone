import "./more-dropdown.css";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { deleteWorkspace } from "../../store/workspaces";
import { useHistory, useParams } from 'react-router-dom'

const MoreDropdown = ({ board }) => {
  const { workspaceId } = useParams()
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    if (toggleDropdown) return
    setToggleDropdown(true)
  }

  useEffect(() => {
    if (!toggleDropdown) return

    const closeMenu = () => {
      setToggleDropdown(false);
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [toggleDropdown])

  const handleDelete = async (e) => {
    e.preventDefault()

    let deletedMessage;
    try {
      deletedMessage = await dispatch(deleteWorkspace(board.id))
      if (deletedMessage.id === +workspaceId) {
        history.push('/')
      }
    } catch(error) {
      alert(error)
    }
  }

  return (
    <>
      <div className="more__container" onClick={handleToggle}>
        <span className="material-symbols-outlined">more_horiz</span>
      </div>
      {toggleDropdown &&
      <div
        className="more__dropdown"
        onClick={handleDelete}
      >
        Delete board...
      </div>}
    </>
  );
};

export default MoreDropdown;
