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

      <WorkspaceName workspace={workspace} />
    </div>
  );
};

export default WorkspaceHeader;
