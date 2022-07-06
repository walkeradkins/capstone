import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllWorkspaces } from "../../store/workspaces";
import { WorkspaceLink, CreateWorkspace } from "../../Components";

const Home = ({ user }) => {
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.workspaces);
  const workspaceArray = Object.values(workspaces);

  useEffect(() => {
    dispatch(getAllWorkspaces(user.id));
  }, [dispatch, user.id]);

  return (
    <>
      <h2>Home View</h2>
      <CreateWorkspace user={user}/>
      <ul>
        {workspaceArray.map((workspace) => (
          <li key={workspace.id}>
            <WorkspaceLink workspace={workspace} user={user}/>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
