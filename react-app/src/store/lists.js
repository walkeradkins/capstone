const ALL_LISTS = 'lists/ALL_LISTS';
const CREATE_LIST = 'lists/CREATE_LIST'

export const allLists = (lists) => ({
  type: ALL_LISTS,
  lists
});

export const createOne = (newList) => ({
  type: CREATE_LIST,
  newList
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

const initialState = {};

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_LISTS:
      const lists = {}
      for (let list of action.lists.lists) {
        lists[list.id] = list;
        lists[list.id]['cards'] = list.cards.map(card => card.id);
      }
      return { ...lists };
    case CREATE_LIST:
      if (!state[action.newList.id]) {
        const newState = {
          ...state,
          [action.newList.id]: action.newList
        }
        return newState;
      };
    default:
      return state;
  }
}
