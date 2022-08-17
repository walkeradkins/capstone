const ALL_WORKSPACES = 'workspaces/ALL_WORKSPACES';
const CREATE_WORKSPACE = 'workspace/CREATE_WORKSPACE';
const UPDATE_WORKSPACE = 'workspace/UPDATE_WORKSPACE';
const DELETE_WORKSPACE = 'workspace/DELETE_WORKSPACE';

export const allWorkspaces = (workspaces) => ({
  type: ALL_WORKSPACES,
  workspaces
});

export const createWorkspace = (workspace) => ({
  type: CREATE_WORKSPACE,
  workspace
});

export const updateOne = (updatedWorkspace) => ({
  type: UPDATE_WORKSPACE,
  updatedWorkspace
});

export const deleteOne = (deletedWorkspace) => ({
  type: DELETE_WORKSPACE,
  deletedWorkspace
});

export const getAllWorkspaces = (userId) => async dispatch => {
  const res = await fetch(`/api/workspaces/${userId}`);

  if (res.ok) {
    let workspaces = await res.json();
    dispatch(allWorkspaces(workspaces));
    return workspaces;
  }
}

export const createNewWorkspace = (userId, payload) => async dispatch => {
  const res = await fetch(`/api/workspaces/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const workspace = await res.json();
    dispatch(createWorkspace(workspace));
    return workspace
  }
}

export const updateWorkspace = (payload, workspaceId) => async dispatch => {
  const res = await fetch(`/api/workspaces/${workspaceId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const updatedWorkspace = await res.json();
    dispatch(updateOne(updatedWorkspace));
    return updatedWorkspace
  }
}

export const deleteWorkspace = (id) => async dispatch => {
  const res = await fetch(`/api/workspaces/${id}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const deletedWorkspace = await res.json();
    dispatch(deleteOne(deletedWorkspace));
    console.log('dekeeted workspace', deletedWorkspace)
    return deletedWorkspace;
  }
}
const initialState = {};

export default function workspaceReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_WORKSPACES:
      const workspaces = {}
      for (let workspace of action.workspaces.workspaces) {
        workspaces[workspace.id] = workspace;
        workspaces[workspace.id]['lists'] = workspace.lists.map(list => list.id)
        workspaces[workspace.id]['members'] = workspace.members.map(member => member.id)
      }
      return { ...workspaces }
    case CREATE_WORKSPACE:
      action.workspace.members = action.workspace.members.map(member => member.id)
      if (!state[action.workspace]) {
        const newState = {
          ...state,
          [action.workspace.id]: action.workspace,
        }
        return newState;
      }
    case UPDATE_WORKSPACE:
      const updatedState = {
        ...state,
        [action.updatedWorkspace.id]: {
          ...state[action.updatedWorkspace.id],
          ...action.updatedWorkspace
        }
      }
      const id = action.updatedWorkspace.id
      updatedState[id].lists = updatedState[id].lists.map(list => list.id)
      updatedState[id].members = updatedState[id].members.map(member => member.id)
      return updatedState;
    case DELETE_WORKSPACE:
      const newState = { ...state };
      delete newState[action.deletedWorkspace.id];
      return newState;
    default:
      return state;
  }
}
