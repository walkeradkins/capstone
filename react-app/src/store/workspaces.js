const ALL_WORKSPACES = 'workspaces/ALL_WORKSPACES';

export const allWorkspaces = (workspaces) => ({
  type: ALL_WORKSPACES,
  workspaces
})

export const getAllWorkspaces = (userId) => async dispatch => {
  const res = await fetch(`/api/workspaces/${userId}`);

  if (res.ok) {
    let workspaces = await res.json();
    dispatch(allWorkspaces(workspaces));
    return workspaces;
  }
}

const initialState = {}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ALL_WORKSPACES:
      const workspaces = {}
      for (let workspace of action.workspaces.workspaces) {
        workspaces[workspace.id] = workspace;
      }
      return { ...workspaces }
    default:
      return state;
  }
}
