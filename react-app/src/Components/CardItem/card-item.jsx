import "./card-item.css";
import CardHeader from "../CardHeader/card-header";
import { useState, useCallback } from "react";

const CardItem = ({ cards, setItem }) => {
  const [allCards, setAllCards] = useState(cards);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = cards[dragIndex];
      const hoverItem = cards[hoverIndex];
      // Swap places of dragItem and hoverItem in the pets array
      setAllCards((cards) => {
        const updatedCards = [...cards];
        updatedCards[dragIndex] = hoverItem;
        updatedCards[hoverIndex] = dragItem;
        return updatedCards;
      });
    },
    [cards]
  );


  if (cards[0] === undefined) return null;

  return (
    <div className="card__wrapper">
      {cards.map((card, index) => (
        <CardHeader props={{ card, setItem, index, moveCard }} key={index} />
      ))}
    </div>
  );
};

export default CardItem;
