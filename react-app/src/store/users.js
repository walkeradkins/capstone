const GET_USERS = 'session/GET_USERS';

const getAll = (users) => ({
  type: GET_USERS,
  users: users
})

export const getAllUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(getAll(data));
  }
}

const initialState = {};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      const users = {};
      for (let user of action.users.users) {
        users[user.id] = user;
      }
      return { ...users};
    default:
      return state;
  }
}