import "./sidebar.css";
import { FaTable } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSidebar } from "../../context/sidebar-context";
import { UserIcon, MoreDropdown } from "../../Components";
import { CSSTransition } from "react-transition-group";

const Sidebar = ({ workspaces, current, user }) => {
  const { collapsed, setCollapsed } = useSidebar();
  const { firstName, lastName } = user;

  const handleToggle = () => {
    if (collapsed) setCollapsed(false);
    else setCollapsed(true);
  };

  const getBoardName = (name) => {
    let newName;
    if (name.length > 23) {
      newName = `${name.slice(0, 23)}...`;
      return newName;
    }
    return name;
  };

  // const handleClick = (board) => {
  //   setCurrentWorkspace(board.id);
  //   history.push(`/b/${board.id}`);
  // };

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
            <UserIcon name={firstName} size={"1.5em"} />
            <p className="sidebar__username">{`${firstName} ${lastName}'s Workspace`}</p>
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
                <FaTable />
                <p className="sidebar__subheader-text">Your Boards</p>
              </div>
              {workspaces.map((board) => {
                return (
                  <div key={board.id} className="sidebar__board">
                    <div className="sidebar__board-left">
                      <p>📅</p>
                      <Link
                        to={`/b/${board.id}`}
                        className="sidebar__board-link"
                      >
                        {getBoardName(board.name)}
                      </Link>
                    </div>
                    <div className="sidebar__board-right">
                      <MoreDropdown board={board} />
                    </div>
                  </div>
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
