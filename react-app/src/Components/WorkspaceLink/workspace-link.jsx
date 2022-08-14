import "./workspace-link.css";
import { Link } from "react-router-dom";
import { backgroundObject } from '../../Assets/Images'

const WorkspaceLink = ({ workspace, user }) => {
  const { name, id, background } = workspace;
  let displayName;

  if (name.length > 25) {
    displayName = `${name.slice(0, 25)}...`;
  } else displayName = name;

  return (
    <div className='workspace__wrapper'>
      <Link to={`/b/${id}`}>
        <div
        style={{backgroundImage: `url(${backgroundObject[background]})`}}
        className="workspace__link-container"
        >
          <div className="workspace__link">
            <p>{displayName}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WorkspaceLink;
