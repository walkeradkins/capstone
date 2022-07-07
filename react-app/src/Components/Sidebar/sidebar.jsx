import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaGem, FaHeart } from "react-icons/fa";
import "./sidebar.css";
import MoreDropdown from "../MoreDropdown/more-dropdown";
import { useState } from "react";

const Sidebar = ({ workspaces, current }) => {
  return (
    <ProSidebar
    // collapsed={true}
    >
      <Menu iconShape="circle">
        <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
        <SubMenu title="Your Boards" icon={<FaHeart />}>
          {workspaces.map((board) => {
            return (
              <div className='sidebar__boards'>
                <MenuItem>{board.name}</MenuItem>
                <MoreDropdown board={board}/>
              </div>
            );
          })}
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
