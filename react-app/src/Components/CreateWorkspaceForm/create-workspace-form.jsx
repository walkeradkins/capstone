import './create-workspace-form.css'
import { useDispatch } from "react-redux"
import { useState } from 'react'
import { useHistory } from "react-router-dom"
import { createNewWorkspace } from '../../store/workspaces'


const CreateWorkspaceModal = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      owner_id: user.id
    }
    let newWorkspace;
    try {
      newWorkspace = await dispatch(createNewWorkspace(user.id, payload))
    } catch (error) {
      alert(error)
    }
    if (newWorkspace) {
      setName('')
      history.push(`/user/${user.id}/${newWorkspace.id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Board title*</label>
      <input
        className='create__workspace--input'
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className={name.length ? 'create__workspace--submit' : 'create__workspace--submit-disabled'}
        type='submit'
        disabled={!name.length}
      >
        Create
      </button>
    </form>
   );
}

export default CreateWorkspaceModal;