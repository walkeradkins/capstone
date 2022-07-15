import "./sidebar.css";
import { FaTable } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSidebar } from "../../context/sidebar-context";
import { UserIcon, MoreDropdown } from "../../Components";
import { CSSTransition } from "react-transition-group";
import { Modal } from "../../context/modal";
import { useState } from "react";
import { CreateWorkspaceForm } from "../../Components";

const Sidebar = ({ workspaces, current, user }) => {
  const [showModal, setShowModal] = useState(false);
  const { collapsed, setCollapsed } = useSidebar();
  const { firstName, lastName } = user;

  let userName;
  if (firstName.length + lastName.length > 40) {
    userName = firstName;
  } else userName = `${firstName} ${lastName}`;

  const handleToggle = () => {
    if (collapsed) setCollapsed(false);
    else setCollapsed(true);
  };

  const getBoardName = (name) => {
    let newName;
    if (name.length > 18) {
      newName = `${name.slice(0, 18)}...`;
      return newName;
    }
    return name;
  };

  return (
    <>
      <CSSTransition
        in={!collapsed}
        timeout={300}
        classNames="sidebar-collapse"
        unmountOnExit
      >
        <div className="sidebar__collapsed" onClick={handleToggle}>
          <div className="sidebar__button-open">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={collapsed}
        timeout={300}
        classNames="sidebar-enter"
        unmountOnExit
      >
        <div className="sidebar__open">
          <div className="sidebar__header">
            <div className='sidebar__username-icon-container'>
              <UserIcon name={firstName} size={"1.5em"} />
              <div className="sidebar__username-container">
                <p className="sidebar__username">{`${userName}'s`}</p>
                <p className="sidebar__username">Workspace</p>
              </div>
            </div>
            <span
              className="sidebar__button-collapse material-symbols-outlined"
              onClick={handleToggle}
            >
              chevron_left
            </span>
          </div>
          <div className="sidebar__underline" />
          <div className="sidebar__boards">
            <div className="sidebar__board-container">
              <div className="sidebar__subheader">
                <div className="sidebar__subheader-left">
                  <FaTable />
                  <p className="sidebar__subheader-text">Your Boards</p>
                </div>
                <div
                  className="sidebar__subheader-right"
                  onClick={() => setShowModal(true)}
                >
                  <span className="material-symbols-outlined">add</span>
                </div>
                {showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                    <CreateWorkspaceForm
                      user={user}
                      setShowModal={setShowModal}
                    />
                  </Modal>
                )}
              </div>
              {workspaces.map((board) => {
                return (
                  <Link to={`/b/${board.id}`} className="sidebar__board-link">
                    <div key={board.id} className="sidebar__board">
                      <div className="sidebar__board-left">
                        <p>📅</p>
                        <div className="sidebar__board-link-text">
                          {getBoardName(board.name)}
                        </div>
                      </div>
                      <div className="sidebar__board-right">
                        <MoreDropdown board={board} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Sidebar;
