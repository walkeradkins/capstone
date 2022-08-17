import "./workspace-header.css";
import WorkspaceName from "../WorkspaceName/workspace-name";
import { useSidebar } from "../../context/sidebar-context";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../context/modal";
import { getAllUsers } from "../../store/users";
import { AddMembers } from '../../Components'

const WorkspaceHeader = ({ workspace, user }) => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { collapsed, setCollapsed } = useSidebar();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleToggle = () => {
    setCollapsed(false);
  };

  return (
    <>
      <div className="workspace__header">
        <WorkspaceName workspace={workspace} />
        <div className="header__members" onClick={() => setShowModal(true)}>
          <span className="material-symbols-outlined">person_add</span>
          <p>members</p>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddMembers props={{workspace, users, user, setShowModal}}/>
        </Modal>
      )}
    </>
  );
};

export default WorkspaceHeader;
