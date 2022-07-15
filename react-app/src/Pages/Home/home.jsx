import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllWorkspaces } from "../../store/workspaces";
import { WorkspaceLink, CreateWorkspace } from "../../Components";
import { UserIcon } from "../../Components";

const Home = ({ user }) => {
  const { firstName, lastName, members } = user;
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.workspaces);
  const workspaceArray = Object.values(workspaces);

  useEffect(() => {
    dispatch(getAllWorkspaces(user.id));
  }, []);

  return (
    <div className="home__main">
      <div className="home__header">
        <div className="home__header-inner">
          <div className="home__user">
            <UserIcon name={firstName} size={"2em"} />
            <div className="home__user-name">
              <p>{`${firstName} ${lastName}'s Workspaces`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="workspace__boards">
        <CreateWorkspace user={user} />
        {workspaceArray.map((workspace) => (
          <div key={workspace.id}>
            <WorkspaceLink workspace={workspace} user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
