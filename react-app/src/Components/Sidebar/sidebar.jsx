import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaTable } from "react-icons/fa";
import "./sidebar.css";
import { getAllWorkspaces } from "../../store/workspaces";
import { getAllLists } from "../../store/lists";
import { getAllCards } from "../../store/cards";
import MoreDropdown from "../MoreDropdown/more-dropdown";
import { useHistory } from "react-router-dom";
import { useSidebar } from "../../context/sidebar-context";
import { useDispatch } from "react-redux";
import { UserIcon } from "../../Components";
import { useEffect, useState } from "react";
import { useWorkspace } from "../../context/workspace-context";

const Sidebar = ({ workspaces, current, user }) => {
  const history = useHistory();
  const { currentWorkspace, setCurrentWorkspace } = useWorkspace();
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
    <div
      className={collapsed ? "sidebar__wrapper-collapsed hover" : "sidebar__wrapper"}
      onClick={collapsed ? handleToggle : null}
    >
      {collapsed && (
        <button
          onClick={handleToggle}
          className="sidebar__button-toggle hover sidebar__wrapper-collapsed"
        >
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
            <div className="sidebar__header">
              <UserIcon name={firstName} size={"1.5em"} />
              <p className="sidebar__username">{`${firstName} ${lastName}'s Workspace`}</p>
              <span
                className="sidebar__collapse material-symbols-outlined"
                onClick={handleToggle}
              >
                chevron_left
              </span>
            </div>
          </SidebarHeader>
        )}
        {!collapsed && (
          <Menu iconShape="circle">
            <SubMenu title="Your Boards" icon={<FaTable />}>
              {workspaces.map((board) => {
                return (
                  <div key={board.id} className="sidebar__boards">
                    <MenuItem>
                      <a href={`/b/${board.id}`}>{getBoardName(board.name)}</a>
                    </MenuItem>
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
