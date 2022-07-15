import "./workspace-link.css";
import { Link } from "react-router-dom";

const WorkspaceLink = ({ workspace, user }) => {
  const { name, id } = workspace;
  let displayName;

  if (name.length > 25) {
    displayName = `${name.slice(0, 25)}...`;
  } else displayName = name;

  const backgrounds = {
    0: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
    1: 'linear-gradient(to right, #fffbd5, #b20a2c)',
    2: 'linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)',
    3: 'linear-gradient(to right, #00b4db, #0083b0)',
    4: 'radial-gradient(circle farthest-side, #fceabb, #f8b500)',
    5: 'linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114))',
    6: 'linear-gradient( 109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% )',
    7: 'linear-gradient(to right, #ff6e7f, #bfe9ff)',
    8: 'linear-gradient(to right, #ff512f, #f09819',
    9: 'linear-gradient(to right, #0099f7, #f11712)',
    10: 'linear-gradient(to right, #ff9966, #ff5e62)',
  }

  const pickBackground = () => {
    const selection = Math.floor(Math.random() * 10)
    return(backgrounds[selection])
  }

  return (
    <div className='workspace__wrapper' onClick={pickBackground}>
      <Link to={`/b/${id}`}>
        <div
        style={{background: `${pickBackground()}`}}
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
