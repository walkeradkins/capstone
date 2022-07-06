const ALL_WORKSPACES = 'workspaces/ALL_WORKSPACES';
const CREATE_WORKSPACE = 'workspace/CREATE_WORKSPACE';

export const allWorkspaces = (workspaces) => ({
  type: ALL_WORKSPACES,
  workspaces
});

export const createWorkspace = (workspace) => ({
  type: CREATE_WORKSPACE,
  workspace
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

const initialState = {};

export default function reducer(state = initialState, action) {
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
    default:
      return state;
  }
}
