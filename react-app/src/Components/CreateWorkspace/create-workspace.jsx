import "./create-workspace.css";
import { Modal } from "../../context/modal";
import { useState } from "react";
import { CreateWorkspaceForm } from "../../Components";

const CreateWorkspace = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="create__workspace" onClick={() => setShowModal(true)}>
        <p className='create__workspace-text'>Create new board</p>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateWorkspaceForm user={user}/>
        </Modal>
      )}
    </>
  );
};

export default CreateWorkspace;
