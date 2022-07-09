import "./card-item.css";
import CardHeader from "../CardHeader/card-header";

const CardItem = ({ cards, setItem }) => {
  if (cards[0] === undefined) return null;
  return (
    <div className="card__wrapper">
      {cards.map((card, i) => (
        <CardHeader props={{card, setItem}} key={i}/>
      ))}
    </div>
  );
};

export default CardItem;
