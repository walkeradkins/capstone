const ALL_CARDS = 'cards/ALL_CARDS';
const CREATE_CARD = 'cards/CREATE_CARD'


export const allCards = (cards) => ({
  type: ALL_CARDS,
  cards
});

export const createOne = (newCard) => ({
  type: CREATE_CARD,
  newCard
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
    default:
      return state;
  }
}