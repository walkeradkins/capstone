import "./workspace-header.css";
import WorkspaceName from "../WorkspaceName/workspace-name";
import { useSidebar } from "../../context/sidebar-context";

const WorkspaceHeader = ({ workspace }) => {
  const { collapsed, setCollapsed } = useSidebar();

  const handleToggle = () => {
    setCollapsed(false);
  };

  return (
    <div className="workspace__header">
      {/* {collapsed && (
        <button
          onClick={handleToggle}
          className='workspace__header-toggle'
          >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      )} */}
      <WorkspaceName workspace={workspace} />
    </div>
  );
};

export default WorkspaceHeader;
