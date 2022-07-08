import { bindActionCreators } from "redux";

const ALL_CARDS = 'cards/ALL_CARDS';

export const allCards = (cards) => ({
  type: ALL_CARDS,
  cards
});

export const getAllCards = (id) => async dispatch => {
  const res = await fetch(`/api/cards/${id}`);

  if (res.ok) {
    let cards = await res.json();
    dispatch(allCards(cards));
    return cards;
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
    default:
      return state;
  }
}