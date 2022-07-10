const ALL_LISTS = 'lists/ALL_LISTS';
const CREATE_LIST = 'lists/CREATE_LIST'
const UPDATE_LIST = 'lists/UPDATE_LIST'
const DELETE_LIST = 'lists/DELETE_LIST'

export const allLists = (lists) => ({
  type: ALL_LISTS,
  lists
});

export const createOne = (newList) => ({
  type: CREATE_LIST,
  newList
});

export const updateOne = (updatedList) => ({
  type: UPDATE_LIST,
  updatedList
});

export const deleteOne = (deletedList) => ({
  type: DELETE_LIST,
  deletedList
});

export const getAllLists = (id) => async dispatch => {
  const res = await fetch(`/api/lists/${id}`);

  if (res.ok) {
    let lists = await res.json();
    dispatch(allLists(lists));
    return lists;
  }
}

export const createList = (payload, id) => async dispatch => {
  const res = await fetch(`/api/lists/${id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (res.ok) {
    let newList = await res.json();
    dispatch(createOne(newList));
    return newList
  }
}

export const updateList = (payload, listId) => async dispatch => {
  const res = await fetch(`/api/lists/${listId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const updatedList = await res.json();
    dispatch(updateOne(updatedList));
    return updatedList
  }
}

export const deleteList = (id) => async dispatch => {
  const res = await fetch(`/api/lists/${id}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const deletedList = await res.json();
    dispatch(deleteOne(deletedList));
    return deletedList;
  }
}

const initialState = {};

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_LISTS:
      const lists = {}
      for (let list of action.lists.lists) {
        lists[list.id] = list;
        lists[list.id]['cards'] = list.cards.sort((a, b) => a.index - b.index).map(card => card.id);
      }
      console.log({...lists})
      return { ...lists };
    case CREATE_LIST:
      if (!state[action.newList.id]) {
        const newState = {
          ...state,
          [action.newList.id]: action.newList
        }
        return newState;
      };
    case UPDATE_LIST:
      const updatedState = {
        ...state,
        [action.updatedList.id]: {
          ...state[action.updatedList.id],
          ...action.updatedList['cards'].map(card => card.id)
        }
      }
      return updatedState;
    case DELETE_LIST:
      const newState = { ...state };
      delete newState[action.deletedList.id];
      return newState;
    default:
      return state;
  }
}
