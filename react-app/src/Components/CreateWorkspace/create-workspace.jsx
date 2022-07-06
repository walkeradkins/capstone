import "./create-workspace.css";
import { Modal } from "../../context/modal";
import { useState } from "react";
import { CreateWorkspaceForm } from "../../Components";

const CreateWorkspace = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="create__workspace" onClick={() => setShowModal(true)}>
        Create new board
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateWorkspaceForm user={user}/>
        </Modal>
      )}
    </>
  );
};

export default CreateWorkspace;
