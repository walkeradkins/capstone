import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaGem, FaHeart } from "react-icons/fa";
import "./sidebar.css";
import MoreDropdown from "../MoreDropdown/more-dropdown";
import { useSidebar } from "../../context/sidebar-context";

const Sidebar = ({ workspaces, current, user }) => {
  const { collapsed, setCollapsed } = useSidebar();

  const handleToggle = () => {
    if (collapsed) setCollapsed(false);
    else setCollapsed(true);
  };

  return (
    <div
      className={collapsed ? "sidebar__wrapper-collapsed" : "sidebar__wrapper"}
      onClick={collapsed ? handleToggle : null}
    >
      {collapsed && (
        <button onClick={handleToggle} className="sidebar__button-toggle sidebar__wrapper-collapsed">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      )}
      <ProSidebar
        collapsed={collapsed}
        collapsedWidth={"1em"}
        className={collapsed ? "sidebar__collapsed" : "sidebar__open"}
      >
        {!collapsed && (
          <SidebarHeader>
            {`${user.firstName} ${user.lastName}'s workspace`}
            <span
              className="sidebar__collapse material-symbols-outlined"
              onClick={handleToggle}
            >
              chevron_left
            </span>
          </SidebarHeader>
        )}
        {!collapsed && (
          <Menu iconShape="circle">
            <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
            <SubMenu title="Your Boards" icon={<FaHeart />}>
              {workspaces.map((board) => {
                return (
                  <div key={board.id} className="sidebar__boards">
                    <MenuItem>{board.name}</MenuItem>
                    <MoreDropdown board={board} />
                  </div>
                );
              })}
            </SubMenu>
          </Menu>
        )}
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
