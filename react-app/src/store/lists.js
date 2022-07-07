const ALL_LISTS = 'lists/ALL_LISTS';

export const allLists = (lists) => ({
  type: ALL_LISTS,
  lists
});

export const getAllLists = (id) => async dispatch => {
  const res = await fetch(`/api/lists/${id}`);

  if (res.ok) {
    let lists = await res.json();
    dispatch(allLists(lists));
    return lists;
  }
}

const initialState = {};

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_LISTS:
      const lists = {}
      for (let list of action.lists.lists) {
        lists[list.id] = list;
        lists[list.id]['cards'] = list.cards.map(card => card.id);
        // workspaces[workspace.id]['members'] = workspace.members.map(member => member.id)
      }
      return { ...lists };
    default:
      return state;
  }
}
