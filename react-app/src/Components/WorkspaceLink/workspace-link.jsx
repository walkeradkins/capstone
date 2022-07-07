import "./workspace-link.css";
import { Link } from "react-router-dom";

const WorkspaceLink = ({ workspace, user }) => {

  const { name, id } = workspace;
  return (
    <>
      <Link to={`/b/${id}`}>
        <h3>{name}</h3>
      </Link>
    </>
  );
};

export default WorkspaceLink;
