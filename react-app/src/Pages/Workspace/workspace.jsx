import "./workspace.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllWorkspaces } from "../../store/workspaces";
import { getAllLists } from "../../store/lists";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import whatnext_background from '../../Assets/Images/whatnext_background.jpg'

import {
  WorkspaceName,
  Sidebar,
  ListItem,
  WorkspaceHeader,
} from "../../Components";

const Workspace = ({ user }) => {
  console.log(whatnext_background)
  const { workspaceId } = useParams();
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.workspaces);
  const lists = useSelector((state) => state.lists);
  const listArary = Object.values(lists);
  useEffect(() => {
    dispatch(getAllWorkspaces(user.id));
    dispatch(getAllLists(workspaceId));
  }, [dispatch, user.id, workspaceId]);

  if (!Object.keys(workspaces).length) return null;

  const workspace = workspaces[workspaceId];
  return (
    <div
    className="workspace__main"
    style={{ backgroundImage: `url(${whatnext_background})` }}
    >
      {/* <SidebarClose onClose={() => setShowSideBar(false)}> */}
      <Sidebar
        workspaces={Object.values(workspaces)}
        current={workspace}
        user={user}
      />
      {/* </SidebarClose> */}
      <div className="workspace">
        <WorkspaceHeader workspace={workspace} />
        <div className="list__container">
          {listArary.map((list) => {
            return (
              <div key={list.id}>
                <ListItem list={list} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
