import "./workspace.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllWorkspaces } from "../../store/workspaces";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { WorkspaceName } from "../../Components";

const Workspace = ({ user }) => {
  const { workspaceId } = useParams();
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.workspaces);

  useEffect(() => {
    dispatch(getAllWorkspaces(user.id));
    if (workspaceId) {
      console.log(workspaceId);
    }
  }, [dispatch, user.id]);

  if (!Object.keys(workspaces).length) return null;

  const workspace = workspaces[workspaceId];

  return <WorkspaceName workspace={workspace} />;
};

export default Workspace;
