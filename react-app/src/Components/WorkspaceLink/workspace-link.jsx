import "./workspace-link.css";
import { Link } from "react-router-dom";

const WorkspaceLink = ({ workspace, user }) => {
  const { name, id } = workspace;
  let displayName;
  if (name.length > 25) {
    displayName = `${name.slice(0, 25)}...`;
  } else displayName = name;

  return (
    <div className='workspace__wrapper'>
      <Link to={`/b/${id}`}>
        <div className="workspace__link-container">
          <div className="workspace__link">
            <p>{displayName}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WorkspaceLink;
