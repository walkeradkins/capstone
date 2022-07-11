const ALL_CARDS = 'cards/ALL_CARDS';
const CREATE_CARD = 'cards/CREATE_CARD'
const UPDATE_CARD = 'cards/UPDATE_CARD'
const DELETE_CARD = 'cards/DELETE_CARD'

export const allCards = (cards) => ({
  type: ALL_CARDS,
  cards
});

export const createOne = (newCard) => ({
  type: CREATE_CARD,
  newCard
});

export const updateOne = (updatedCard) => ({
  type: UPDATE_CARD,
  updatedCard
});

export const deleteOne = (deletedCard) => ({
  type: DELETE_CARD,
  deletedCard
});

export const getAllCards = (id) => async dispatch => {
  const res = await fetch(`/api/cards/${id}`);

  if (res.ok) {
    let cards = await res.json();
    dispatch(allCards(cards));
    return cards;
  }
}

export const createCard = (payload, id) => async dispatch => {
  const res = await fetch(`/api/cards/${id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (res.ok) {
    let newCard = await res.json();
    dispatch(createOne(newCard));
    return newCard
  }
}

export const updateCard = (payload, cardId) => async dispatch => {
  const res = await fetch(`/api/cards/${cardId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const updatedCard = await res.json();
    dispatch(updateOne(updatedCard));
    return updatedCard
  }
}


export const deleteCard = (id) => async dispatch => {
  const res = await fetch(`/api/cards/${id}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const deletedCard = await res.json();
    dispatch(deleteOne(deletedCard));
    return deletedCard;
  }
}

const initialState = {};

export default function cardReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_CARDS:
      const cards = {};
      for (let card of action.cards.cards) {
        cards[card.id] = card;
      }
      return { ...cards };
    case CREATE_CARD:
      if (!state[action.newCard.id]) {
        const newState = {
          ...state,
          [action.newCard.id]: action.newCard
        }
        return newState;
      };
    case UPDATE_CARD:
      const updatedState = {
        ...state,
        [action.updatedCard.id]: {
          ...state[action.updatedCard.id],
          ...action.updatedCard
        }
      }
      return updatedState;
    case DELETE_CARD:
      const newState = { ...state };
      delete newState[action.deletedCard.id];
      return newState;
    default:
      return state;
  }
}